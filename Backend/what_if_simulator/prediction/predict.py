import os
import json
import random
import time
import requests
import joblib
import pandas as pd
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Global variables for Gemini API failure cool-down caching
_last_gemini_error_time = 0.0
_GEMINI_ERROR_COOLDOWN_SEC = 300.0  # 5 minutes cooldown to bypass API calls on quota/rate-limits


# Load local environment variables from .env file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(dotenv_path=os.path.join(BASE_DIR, '.env'))

# File paths for the saved models
MODEL_PATHS = {
    'crane': os.path.join(BASE_DIR, 'crane_model.pkl'),
    'vessel': os.path.join(BASE_DIR, 'vessel_model.pkl'),
    'rail': os.path.join(BASE_DIR, 'rail_model.pkl'),
    'eta': os.path.join(BASE_DIR, 'eta_model.pkl'),
}

# Demo vessel fleet for ETA predictions
DEMO_VESSELS = [
    {"id": "VSL-101", "name": "MV-Geneva", "route": "Rotterdam → Mundra", "vessel_type": 0, "cargo_teu": 2800, "route_nm": 5500, "scheduled_offset_hours": 3.5},
    {"id": "VSL-102", "name": "MV-Oceanic-Bravo", "route": "Singapore → Mundra", "vessel_type": 0, "cargo_teu": 3200, "route_nm": 3200, "scheduled_offset_hours": 5.75},
    {"id": "VSL-103", "name": "MV-Horizon-Asia", "route": "Shanghai → Mundra", "vessel_type": 1, "cargo_teu": 1800, "route_nm": 5800, "scheduled_offset_hours": 8.0},
    {"id": "VSL-104", "name": "MV-Centaurus", "route": "Jebel Ali → Mundra", "vessel_type": 2, "cargo_teu": 950, "route_nm": 350, "scheduled_offset_hours": 10.25},
    {"id": "VSL-105", "name": "MV-Northern-Star", "route": "Durban → Mundra", "vessel_type": 0, "cargo_teu": 2100, "route_nm": 3800, "scheduled_offset_hours": 13.5},
]


def load_models():
    """Load the trained models from disk."""
    models = {}
    for name, path in MODEL_PATHS.items():
        if os.path.exists(path):
            models[name] = joblib.load(path)
        else:
            if name == 'eta':
                print(f"Warning: ETA model '{path}' not found. ETA predictions will use fallback estimates.")
                models[name] = None
            else:
                raise FileNotFoundError(f"Model file '{path}' not found. Please run train_model.py first to train models.")
    return models


def predict_scenario(wind_speed, visibility, precipitation, temperature,
                     vessel_queue, yard_occupancy, is_holiday,
                     vessel_type=0, cargo_volume_teu=1500,
                     route_distance_nm=3000, port_congestion_level=0.5):
    """
    Predict operational performance metrics based on input scenario parameters.
    Supports both 7-feature (legacy/simulator) and 11-feature (full prediction) calls.
    """
    models = load_models()

    # Format features as a DataFrame matching the 11 training columns
    features = pd.DataFrame([{
        'wind_speed': float(wind_speed),
        'visibility': float(visibility),
        'precipitation': float(precipitation),
        'temperature': float(temperature),
        'vessel_queue': int(vessel_queue),
        'yard_occupancy': float(yard_occupancy),
        'is_holiday': int(is_holiday),
        'vessel_type': int(vessel_type),
        'cargo_volume_teu': int(cargo_volume_teu),
        'route_distance_nm': float(route_distance_nm),
        'port_congestion_level': float(port_congestion_level),
    }])

    # Execute model predictions
    crane_teu_hour = float(models['crane'].predict(features)[0])
    vessel_turnaround_hours = float(models['vessel'].predict(features)[0])
    rail_delay_mins = float(models['rail'].predict(features)[0])

    # Post-process outputs to handle causal logic boundaries (like lockouts)
    if float(wind_speed) > 22.0:
        crane_teu_hour = 0.0  # Lockout safety override

    result = {
        'crane_efficiency_teu_hour': round(max(0.0, crane_teu_hour), 2),
        'vessel_turnaround_hours': round(max(0.0, vessel_turnaround_hours), 2),
        'rail_dispatch_delay_mins': round(max(0.0, rail_delay_mins), 2),
    }

    # ETA prediction (if model exists)
    if models.get('eta') is not None:
        eta_delay = float(models['eta'].predict(features)[0])
        result['eta_delay_minutes'] = round(eta_delay, 2)
    else:
        result['eta_delay_minutes'] = 0.0

    return result


def predict_vessel_etas(wind_speed, visibility, precipitation, temperature,
                        vessel_queue, yard_occupancy, is_holiday):
    """
    Predict ETA delays for the demo vessel fleet.
    Each vessel has unique characteristics that affect its predicted delay.
    """
    models = load_models()
    now = datetime.now()
    vessels_out = []

    # Compute port congestion from inputs
    port_congestion = min(1.0, (int(vessel_queue) / 15.0) * 0.5 + (float(yard_occupancy) / 95.0) * 0.4)

    for v in DEMO_VESSELS:
        features = pd.DataFrame([{
            'wind_speed': float(wind_speed),
            'visibility': float(visibility),
            'precipitation': float(precipitation),
            'temperature': float(temperature),
            'vessel_queue': int(vessel_queue),
            'yard_occupancy': float(yard_occupancy),
            'is_holiday': int(is_holiday),
            'vessel_type': v['vessel_type'],
            'cargo_volume_teu': v['cargo_teu'],
            'route_distance_nm': v['route_nm'],
            'port_congestion_level': port_congestion,
        }])

        # Predict ETA delay
        if models.get('eta') is not None:
            delay_mins = float(models['eta'].predict(features)[0])
        else:
            # Fallback: heuristic-based estimate
            delay_mins = float((float(wind_speed) * 1.5) + (int(vessel_queue) * 2.0) - 5.0)

        delay_mins = round(delay_mins, 1)

        # Calculate scheduled and predicted ETAs
        scheduled_eta = now + timedelta(hours=float(v['scheduled_offset_hours']))
        predicted_eta = scheduled_eta + timedelta(minutes=float(delay_mins))

        # Determine status
        if delay_mins > 15:
            status = "delayed"
        elif delay_mins < -5:
            status = "early"
        else:
            status = "on-time"

        # Determine causal factor (most impactful condition)
        causal_factor = _determine_causal_factor(wind_speed, visibility, precipitation,
                                                  vessel_queue, yard_occupancy, v)

        # Confidence score (higher for shorter routes, better weather)
        base_confidence = 96
        if v['route_nm'] > 5000:
            base_confidence -= 5
        if float(wind_speed) > 12:
            base_confidence -= 4
        if float(visibility) < 3000:
            base_confidence -= 3
        confidence = max(72, min(98, base_confidence + random.randint(-2, 2)))

        vessels_out.append({
            'id': v['id'],
            'name': v['name'],
            'route': v['route'],
            'vessel_type': ['Container', 'Bulk', 'Tanker', 'RoRo'][v['vessel_type']],
            'cargo_teu': v['cargo_teu'],
            'scheduled_eta': scheduled_eta.strftime('%H:%M'),
            'predicted_eta': predicted_eta.strftime('%H:%M') + (' (+1d)' if predicted_eta.day > scheduled_eta.day else ''),
            'delay_minutes': delay_mins,
            'confidence': confidence,
            'status': status,
            'causal_factor': causal_factor,
        })

    return vessels_out


def _determine_causal_factor(wind_speed, visibility, precipitation,
                              vessel_queue, yard_occupancy, vessel_info):
    """Determine the primary causal factor for a vessel's delay."""
    factors = []

    ws = float(wind_speed)
    vis = float(visibility)
    precip = float(precipitation)
    vq = int(vessel_queue)
    yard = float(yard_occupancy)

    if ws > 18:
        factors.append(f"Severe wind ({ws:.1f} m/s) causing channel speed restrictions and tug delays.")
    elif ws > 12:
        factors.append(f"Moderate wind ({ws:.1f} m/s) affecting approach maneuvers.")

    if vis < 1500:
        factors.append(f"Poor visibility ({vis:.0f}m) requiring reduced channel transit speed.")
    elif vis < 3000:
        factors.append(f"Reduced visibility ({vis:.0f}m) affecting pilot navigation.")

    if precip > 4:
        factors.append(f"Heavy precipitation ({precip:.1f}mm/hr) causing cargo handling slowdowns.")

    if vq > 6:
        factors.append(f"Port congestion ({vq} vessels queued) causing pilot/tug unavailability.")
    elif vq > 3:
        factors.append(f"Moderate vessel queue ({vq} ships) affecting berth assignment timing.")

    if yard > 85:
        factors.append(f"High yard occupancy ({yard:.0f}%) delaying container positioning.")

    if vessel_info['vessel_type'] == 2:
        factors.append("Tanker class vessel requiring specialized berth approach protocols.")

    if not factors:
        factors.append("Normal weather and port conditions. Vessel on standard approach trajectory.")

    return factors[0]


def generate_groq_report(prompt: str, api_key: str, model: str = "llama-3.3-70b-versatile"):
    """Call Groq API using standard library urllib for fast, reliable inference."""
    try:
        import urllib.request
        import json

        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "PortMind-AI/1.0",
        }
        payload = {
            "model": model,
            "messages": [
                {
                    "role": "system",
                    "content": "You are LogiMind AI, a senior maritime port operations intelligence analyst. Never mention underlying AI models or providers (Groq, Llama, OpenAI, Gemini, etc.). Always identify as LogiMind AI.",
                },
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.3,
            "max_tokens": 1024,
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers=headers,
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            if resp.status == 200:
                result = json.loads(resp.read().decode("utf-8"))
                return result["choices"][0]["message"]["content"]
    except Exception as e:
        print(f"Groq API call error: {e}")
    return None


def generate_ai_report(predictions, weather_params, vessels):
    """
    Generate an AI analysis report using Groq (Llama-3.3-70B) or Google Gemini 2.0 Flash.
    Falls back to template-based report if APIs are unavailable or rate-limited.
    """
    global _last_gemini_error_time
    groq_key = os.getenv("GROQ_API_KEY")
    gemini_key = os.getenv("GEMINI_API_KEY")
    groq_model = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

    # Build vessel summary for prompt
    vessel_lines = []
    for v in vessels:
        vessel_lines.append(
            f"  - {v['name']} ({v['vessel_type']}): {v['route']}, "
            f"Scheduled ETA: {v['scheduled_eta']}, Predicted ETA: {v['predicted_eta']}, "
            f"Delay: {v['delay_minutes']} min, Status: {v['status']}, "
            f"Cause: {v['causal_factor']}"
        )
    vessel_text = "\n".join(vessel_lines)

    prompt = f"""You are PortMind AI, a senior maritime port operations intelligence analyst. 
Based on real-time ML model predictions for current port conditions, generate a concise professional operational analysis report.

**Current Weather Conditions:**
- Wind Speed: {weather_params.get('wind_speed', 'N/A')} m/s
- Visibility: {weather_params.get('visibility', 'N/A')} m
- Precipitation: {weather_params.get('precipitation', 'N/A')} mm/hr
- Temperature: {weather_params.get('temperature', 'N/A')}°C

**ML Model Predicted Operations:**
- Crane Efficiency: {predictions['crane_efficiency_teu_hour']} TEU/hr (baseline: 42 TEU/hr)
- Vessel Turnaround: {predictions['vessel_turnaround_hours']} hours (baseline: 14 hrs)
- Rail Dispatch Delay: {predictions['rail_dispatch_delay_mins']} min (baseline: 15 min)

**Active Vessel Fleet:**
{vessel_text}

Generate a professional, data-driven operational analysis report with exactly these 4 sections:

## 🔴 Risk Assessment
One-line overall risk level (Critical/High/Moderate/Low) with data-backed justification referencing actual numbers.

## 🌦️ Weather Impact Analysis
How current weather conditions specifically affect port operations. Reference the actual wind/visibility/rain values and their impact on crane efficiency and vessel navigation.

## 🚢 Vessel Delay Cascade
Which vessels are most affected, the downstream cascade effects (berth queue, crane reallocation, truck wait increases), and total operational time lost.

## 💡 Recommended Actions
3-4 specific, actionable mitigation steps that port operations can implement immediately. Be concrete and reference specific metrics.

IMPORTANT: Keep total response under 350 words. Use markdown formatting. Be data-driven — reference actual numbers from the data above. Do not use generic advice."""

    # 1. Try Groq first (Ultra-fast, reliable, high rate-limit)
    if groq_key:
        groq_report = generate_groq_report(prompt, groq_key, groq_model)
        if groq_report:
            return groq_report

    # 2. Try Gemini if configured and not in cooldown
    if gemini_key:
        current_time = time.time()
        if current_time - _last_gemini_error_time >= _GEMINI_ERROR_COOLDOWN_SEC:
            try:
                from google import genai
                client = genai.Client(api_key=gemini_key)
                response = client.models.generate_content(
                    model="gemini-2.0-flash",
                    contents=prompt,
                )
                if response.text:
                    return response.text
            except Exception as e:
                _last_gemini_error_time = time.time()
                print(f"Gemini API exception: {e}. Cooldown initiated.")

    # 3. Fallback template report
    return generate_fallback_report(predictions, weather_params, vessels)


def generate_fallback_report(predictions, weather_params, vessels):
    """Template-based report when Gemini API is unavailable."""
    crane = predictions['crane_efficiency_teu_hour']
    turnaround = predictions['vessel_turnaround_hours']
    rail_delay = predictions['rail_dispatch_delay_mins']

    # Determine risk level
    if crane == 0:
        risk = "CRITICAL"
        risk_reason = "Quay crane operations fully suspended due to storm/high-wind lockout thresholds (>22 m/s)."
    elif crane < 20:
        risk = "HIGH"
        risk_reason = f"Severe crane operations degradation measured at {crane} TEU/hr (baseline: 42)."
    elif crane < 35:
        risk = "MODERATE"
        risk_reason = f"Minor operational slowdowns detected. Crane efficiency is currently {crane} TEU/hr."
    else:
        risk = "LOW"
        risk_reason = f"Normal operations baseline. Crane efficiency is nominal at {crane} TEU/hr."

    delayed_vessels = [v for v in vessels if v['status'] == 'delayed']
    delayed_names = ", ".join([v['name'] for v in delayed_vessels]) if delayed_vessels else "None"
    total_delay = sum(max(0, v['delay_minutes']) for v in vessels)

    ws = weather_params.get('wind_speed', 'N/A')
    vis = weather_params.get('visibility', 'N/A')
    precip = weather_params.get('precipitation', 'N/A')
    temp = weather_params.get('temperature', 'N/A')

    report = f"""## 🔴 Risk Assessment
**{risk}** — {risk_reason}

## 🌦️ Weather Impact Analysis
Under current meteorological conditions (Wind: **{ws} m/s**, Visibility: **{vis} m**, Precipitation: **{precip} mm/hr**, Temp: **{temp}°C**):
* {"High winds exceed safety margins, triggering automatic gantry crane locks. Operations are suspended." if crane == 0 else f"Wind friction and safety margins have capped crane handling efficiency to **{crane} TEU/hr**."}
* {"Low visibility forces channel transit speeds to be reduced under pilot guidance." if float(vis) < 3000 else "Visibility conditions are clear, allowing standard vessel approach schedules."}
* {"Precipitation is causing cargo handling slowdowns on open decks." if float(precip) > 2.0 else "Dry conditions allow optimal dry cargo handling operations."}

## 🚢 Vessel Delay Cascade
* **Vessels affected by delays:** {delayed_names}
* **Downstream impacts:** Total cascading delay has reached **{round(total_delay)} minutes** across the active fleet.
* **Vessel Turnaround Time:** Projected to escalate to **{turnaround} hours** (nominal baseline is 14.0 hrs).
* **Inland Intermodal Connection:** Rail dispatch delay is **{rail_delay} minutes**, creating buffer pressure on container yards.

## 💡 Recommended Actions
1. {"Initiate immediate crane storm-lockout safety protocols and secure container stacks." if crane == 0 else f"Optimize crane dispatch sequencing to raise handling efficiency above {crane} TEU/hr."}
2. {"Advise incoming vessels to adjust speed (slow-steam) to prevent channel queues." if len(delayed_vessels) > 1 else "Proceed with scheduled vessel arrival sequence."}
3. Adjust rail scheduling to absorb the **{rail_delay} minute** delay and prevent outbound buffer starvation.
4. Pre-position high-priority containers in yard segments closest to crane loading positions to maximize turnaround speed once conditions clear."""

    return report


def compute_kpis(predictions, vessels):
    """Compute dashboard KPI metrics from prediction results."""
    # Load model metadata for accuracy info
    meta_path = os.path.join(BASE_DIR, 'model_metadata.json')
    avg_r2 = 0.94  # default
    if os.path.exists(meta_path):
        try:
            with open(meta_path, 'r') as f:
                meta = json.load(f)
            r2_scores = [m.get('r2_score', 0.94) for m in meta.get('models', {}).values()]
            avg_r2 = sum(r2_scores) / len(r2_scores) if r2_scores else 0.94
        except Exception:
            pass

    model_accuracy = round(avg_r2 * 100, 1)

    # Count delay warnings (vessels with delay > 30 min)
    delay_warnings = sum(1 for v in vessels if v['delay_minutes'] > 30)

    # Compute mitigated cost impact
    # Industry average: ~$800/hour of vessel delay mitigated through early prediction
    total_delay_hours = sum(max(0, v['delay_minutes']) for v in vessels) / 60.0
    cost_impact = round(total_delay_hours * 800 * (model_accuracy / 100), 0)

    return {
        'model_accuracy': model_accuracy,
        'delay_warnings': delay_warnings,
        'cost_impact_usd': int(cost_impact),
    }


def fetch_weather_and_predict(city_name="Rotterdam", vessel_queue=3, yard_occupancy=65.0, is_holiday=0):
    """
    Fetch current weather from OpenWeather API and predict port operational metrics.
    """
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        print("Warning: OPENWEATHER_API_KEY not found in environment. Using default baseline weather metrics.")
        # Default Rotterdam weather
        return predict_scenario(4.2, 10000, 0.0, 16.5, vessel_queue, yard_occupancy, is_holiday)

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={api_key}&units=metric"

    try:
        r = requests.get(url, timeout=5)
        r.raise_for_status()
        data = r.json()

        # Parse weather variables
        wind_speed = data['wind']['speed']  # m/s
        visibility = data.get('visibility', 10000)  # meters
        precipitation = data.get('rain', {}).get('1h', 0.0)  # mm
        temperature = data['main']['temp']  # Celsius

        print(f"\nFetched current weather for {city_name}:")
        print(f"- Temp: {temperature}°C | Wind: {wind_speed} m/s | Vis: {visibility}m | Rain: {precipitation}mm")

        # Predict scenario
        predictions = predict_scenario(wind_speed, visibility, precipitation, temperature, vessel_queue, yard_occupancy, is_holiday)
        return predictions

    except Exception as e:
        print(f"Error fetching weather from OpenWeather API: {e}. Falling back to default predictions.")
        return predict_scenario(4.2, 10000, 0.0, 16.5, vessel_queue, yard_occupancy, is_holiday)


if __name__ == '__main__':
    # Make sure we run in the correct folder
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # 1. Run a sample manual scenario prediction (Wind Storm)
    print("Simulating Storm Scenario (Wind = 24 m/s, Visibility = 1200m, Congestion = 8 ships):")
    storm_result = predict_scenario(
        wind_speed=24.0,
        visibility=1200.0,
        precipitation=3.5,
        temperature=8.0,
        vessel_queue=8,
        yard_occupancy=85.0,
        is_holiday=0
    )
    print(storm_result)

    # 2. Test vessel ETAs
    print("\nPredicting Vessel ETAs:")
    vessels = predict_vessel_etas(
        wind_speed=12.0, visibility=3000, precipitation=1.5,
        temperature=14.0, vessel_queue=5, yard_occupancy=72.0, is_holiday=0
    )
    for v in vessels:
        print(f"  {v['name']}: {v['status']} ({v['delay_minutes']} min) | {v['causal_factor']}")

    # 3. Run API check
    print("\nSimulating Real-Time Weather Scenario using OpenWeather API:")
    api_result = fetch_weather_and_predict("Rotterdam")
    print(api_result)
