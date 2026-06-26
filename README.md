<div align="center">

<img src="Frontend/public/LogiMind Logo.png" alt="LogiMind AI Logo" width="200"/>

# LogiMind AI

### 🚢 Real-Time Maritime & Logistics Intelligence Operating System

`🏆 Built by Team Hacknomics`

**An ultra-responsive, AI-powered command, control, and multi-agent coordination system for modern maritime terminals, port operations, and container logistics hubs.**

<br/>

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![TanStack](https://img.shields.io/badge/TanStack_Start-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![YOLOv11](https://img.shields.io/badge/YOLOv11-00FFFF?style=for-the-badge&logo=opencv&logoColor=black)](https://docs.ultralytics.com/)
[![XGBoost](https://img.shields.io/badge/XGBoost-FF6600?style=for-the-badge&logo=xgboost&logoColor=white)](https://xgboost.readthedocs.io/)
[![LangGraph](https://img.shields.io/badge/LangGraph-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)](https://langchain-ai.github.io/langgraph/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

[🚀 Features](#-key-features--system-modules) · [📸 Screenshots](#-ui-screenshots) · [🏗️ Architecture](#%EF%B8%8F-architecture--working-pipeline) · [⚙️ Setup](#%EF%B8%8F-installation--setup) · [🔌 API](#-api-endpoints)

<br/>

---

</div>

## ❓ The Problem Statement

### India's Ports & Logistics — A Industry Running on Manual Oversight

India handles **~1,500 million tonnes** of cargo annually across **200+ ports**, with **95% of the country's trade by volume** moving through maritime channels. Yet, the operational backbone of these critical hubs still relies heavily on **manual inspections, fragmented communication, and reactive decision-making**.

<br/>

### 🔴 The Real Challenges

| Challenge | Impact |
|:----------|:-------|
| **Manual Safety Inspections** | PPE compliance checks are done visually by patrol officers — slow, error-prone, and impossible to scale across sprawling terminals |
| **Zero Predictive Maintenance** | Crane failures, conveyor breakdowns, and equipment malfunctions are detected *after* they happen — costing millions in downtime |
| **Fragmented Communication** | Marine traffic, yard management, crane dispatch, and gate coordination operate in silos with no unified decision layer |
| **Railway Wagon Bottlenecks** | Indian Railways moves **1,200+ million tonnes** of freight annually, yet wagon inspections are still done manually with pen and paper |
| **No Real-Time Fire/Hazard Detection** | Port terminals store flammable cargo, chemicals, and fuels — but hazard detection is reactive, not proactive |
| **Document Overload** | Operators must reference SOLAS, MARPOL, IMDG, and hundreds of SOPs manually — no intelligent search or retrieval system exists |

<br/>

### 💡 Why We Chose This Problem

> **Ports are the heartbeat of global trade, yet they operate with the intelligence of the 1990s.**

We chose this problem because the **gap between available AI technology and its adoption in maritime logistics is massive**. The tools exist — real-time computer vision, predictive ML, multi-agent AI systems, RAG-based retrieval — but **nobody has unified them into a single, operator-friendly platform** for Indian ports.

**Our vision**: What if a single AI-powered platform could:
- 👁️ **See** everything happening across a port in real-time (cameras, IoT, AIS)
- 🧠 **Think** autonomously using multi-agent AI coordination
- ⚡ **Act** instantly — flagging PPE violations, predicting crane failures, optimizing berth allocation
- 💬 **Speak** the operator's language through a natural-language AI copilot

That's exactly what **LogiMind AI** does.

<br/>

---

## 🎯 System Overview

> **LogiMind AI** bridges the gap between raw physical telemetry and structured operator consensus. By integrating **computer vision (YOLOv11)**, **predictive modeling (XGBoost)**, **multi-agent coordination (LangGraph)**, and **semantic retrieval (ChromaDB RAG)**, LogiMind converts real-time camera feeds, AIS telemetry, and crane IoT vibrations into **millisecond-level decision flows**.

Whether preventing high-risk **PPE violations**, scheduling berth arrivals for massive cargo vessels, or resolving crane duty cycles through dynamic load sharing — LogiMind AI provides operators with a unified, state-of-the-art **terminal operating panel**.

<br/>

### 🔑 What LogiMind AI Does

| Capability | Description |
|:---|:---|
| 🎯 **Command Center** | Global Port Risk Score, live metrics for 217+ vessels, 12,000+ daily container throughput monitoring |
| 🗺️ **Digital Twin** | Interactive 2D/3D spatial layouts with smart heatmaps and inspectable entities |
| 🤖 **Multi-Agent War Room** | Autonomous Marine, Yard, Crane & Gate coordination agents in a dynamic consensus loop |
| 📦 **Container Intelligence** | OCR identification, structural scanning, and yard coordinate matrix optimization |
| 🔧 **Predictive Maintenance** | XGBoost-powered Remaining Useful Life (RUL) prediction from live crane vibration sensors |
| 🛰️ **Vessel Intelligence** | Real-time AIS telemetry, dynamic ETA forecasting, and algorithmic berth allocation |
| 🛡️ **Safety & PPE** | YOLOv11 PPE detection — helmet/vest compliance, zone breaches, intrusion mitigation |
| 🔥 **Fire Detection** | Real-time fire and smoke detection with instant alert dispatching |
| 🚂 **Wagon AI** | Railway wagon number detection & OCR, fault inspection, anomaly detection |
| 🧠 **AI Copilot** | RAG-powered natural language assistant for maritime protocols and port operations |
| 📊 **What-If Simulator** | Monte Carlo simulation with weather integration for scenario analysis |

<br/>

---

## 🏗️ Architecture & Working Pipeline

<div align="center">

<img src="Frontend/public/Working Pipeline Logimind AI.png" alt="LogiMind AI - Working Pipeline Architecture" width="100%"/>

<br/>

*Real-time Data → AI Intelligence → Autonomous Decisions → Operational Excellence*

</div>

<br/>

### 🧩 System Component Breakdown

```
┌──────────────────────────────────────────────────────────────────────┐
│                     Frontend (React 19 + Vite 7)                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │  Command   │  │  AI        │  │  War Room  │  │  Digital   │    │
│  │  Center    │  │  Copilot   │  │  (Agents)  │  │  Twin Map  │    │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘    │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │  Simulator │  │  Wagon AI  │  │  Safety    │  │  Analytics │    │
│  │  (What-If) │  │  Detection │  │  PPE/Fire  │  │  Dashboard │    │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
                          ↕ HTTP / WebSocket
┌──────────────────────────────────────────────────────────────────────┐
│                   Backend (FastAPI + Python)                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │  RAG API   │  │  Simulator │  │  Wagon     │  │  Document  │    │
│  │ (Port 8001)│  │ (Port 8000)│  │  Detection │  │  Parser    │    │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
                              ↕
┌──────────────────────────────────────────────────────────────────────┐
│                      AI Model Pipeline                                │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │  YOLOv11   │  │  XGBoost   │  │  LangGraph │  │  ChromaDB  │    │
│  │  (Vision)  │  │  (RUL/ML)  │  │  (Agents)  │  │  (RAG)     │    │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

<br/>

---

## 📸 UI Screenshots

<div align="center">

### 1. 🖥️ Command Center & Live Dashboard

<img src="Frontend/public/Main Dash.jpeg" alt="LogiMind AI - Command Center Dashboard" width="100%"/>

> *Global Port Risk Score • 217 Active Vessels • 12,408 Containers Today • 94% Crane Health*
> 
> *Real-time container throughput charts, risk distribution analysis, and live operational metrics — all in one unified command panel.*

<br/>

---

### 2. 🧠 AI Copilot (RAG-Powered)

<img src="Frontend/public/RAG COPILOT.jpeg" alt="LogiMind AI - RAG Copilot" width="100%"/>

> *Multi-agent reasoning • RAG • Citations*
>
> *Natural language queries grounded in your port's official documents — SOLAS, MARPOL, IMDG Code. Answers with full citation trails.*

<br/>

---

### 3. 🔮 What-If Simulator

<img src="Frontend/public/What If Simulator.jpeg" alt="LogiMind AI - What-If Simulator" width="100%"/>

> *Typhoon Approach • Peak Cargo Season • Winter Blizzard Outage — preset scenarios*
>
> *93% simulation confidence using trained Random Forest Regressor models. Adjust weather parameters in real-time and see ML-powered operational forecasts.*

<br/>

---

### 4. 🚂 Wagon Number Detection & OCR

<img src="Frontend/public/Wagon.png" alt="LogiMind AI - Wagon Number Detection" width="100%"/>

> *YOLOv11-powered wagon detection with real-time OCR extraction of 11-digit Indian Railways wagon numbers.*

</div>

<br/>

---

## 📦 Key Features & System Modules

### 📺 Command Center
- **Live Operational Metrics**: Continuous monitoring of Active Vessels, Daily Container Throughput, active Safety Alerts, and Fleet Crane Health
- **Risk Score Matrix**: Auto-calculates Global Port Risk Score using a composite index of 47 live signals (Equipment health, safety rules, weather hazards)
- **Dynamic Event Streams**: Real-time auto-updating logs signaling yard OCR detection, berth arrivals, and maintenance warnings

### 🗺️ Live 2D/3D Digital Twin Map
- **Interactive Spatial Layout**: Live tracking and coordinates of container blocks, gate lanes, berths, quay walls, and equipment
- **Smart Heatmaps**: Toggleable visual layers showing yard fill percentage, queue congestions, and operational density
- **Inspectable Entities**: Click to detail mechanical status, current cargo load, speed, and positioning details for cranes, vessels, and trucks

### ⚔️ Multi-Agent Collaborative War Room
- **Autonomous Agent Mesh**: Features Marine Traffic, Yard Allocation, Crane Dispatch, and Gate Coordination agents communicating in a dynamic consensus loop
- **Consensus DAG Visualizer**: Flow animations depicting active message passes and token coordination between micro-agents
- **Conflict Arbitration Board**: Lists resolving/resolved operational bottlenecks

### 📦 Container Intelligence
- **OCR Shipping Identification**: Alphanumeric scanning and registration of container IDs in real time
- **Structural Scanning**: Structural integrity scanning for side impacts, container corrosion, or top-flange damage
- **Yard Matrices**: Coordinates positioning maps to optimize crane stack allocation

### 🏗️ Predictive Asset Maintenance
- **Remaining Useful Life (RUL)**: Live vibration sensors feed XGBoost models to evaluate mechanical wear
- **Early Failure Alarms**: Automatically flags abnormal telemetry (e.g., crane vibration spike exceeding 4g threshold) and schedules service runs

### 🛰️ Vessel Intelligence
- **Real-time AIS Telemetry**: Forecasts vessel ETA dynamically based on channel congestion and weather parameters
- **Berth Optimization**: Algorithmic berthing allocation based on vessel size and crane dispatch workload

### 🛡️ Safety & PPE Compliance
- **Vision Guardrails**: PPE detection scanning for helmet/vest compliance, hazardous zone breaches, and unauthorized entries
- **Intrusion Mitigation**: Instantly alerts safety dispatchers and maps physical coordinates of infractions

### 🔥 Fire Detection System
- **Real-time Fire & Smoke Detection**: Instant identification of fire incidents at port terminals using computer vision
- **Alert Dispatching**: Automated safety notifications to operators with precise location mapping

### 🚂 Wagon AI & Railway Operations
- **Wagon Number Detection**: YOLOv11-powered wagon identification with real-time OCR extraction
- **11-Digit Number Parsing**: Indian Railways format validation and automatic checksum verification
- **Fault & Anomaly Detection**: Comprehensive structural defect identification with severity classification
- **Night-Time Enhancement**: Deep learning-based low-light image enhancement for 24/7 operations

### 🧠 AI Copilot & Docs AI
- **Natural Language Operator**: RAG query hub parsing port rules, harbor operations handbook, and shipping protocols (SOLAS, MARPOL, IMDG Code)
- **Action Automation**: Multi-agent orchestration maps operator questions to operational APIs
- **Citation-Grounded Responses**: Every answer is backed by source document references

### 🔮 What-If Simulator
- **Monte Carlo Simulation**: Full ML-based scenario analysis with weather integration
- **Preset Scenarios**: Typhoon Approach, Peak Cargo Season, Winter Blizzard Outage
- **Real-time Parameter Tuning**: Adjust wind speed, visibility, precipitation, temperature and see instant ML forecasts

<br/>

---

## 🤖 AI Models & Technologies

### Computer Vision & ML Models

| Model | Purpose | Framework | Performance |
|:------|:--------|:----------|:------------|
| **YOLOv11** | PPE Detection & Wagon OCR | PyTorch / Ultralytics | Real-time inference |
| **XGBoost** | Crane RUL & Predictive Maintenance | Scikit-learn / XGBoost | High-accuracy regression |
| **ChromaDB** | Semantic Document Retrieval | Vector Database | Sub-second retrieval |
| **Groq API** | AI Copilot LLM | Cloud API | Ultra-fast generation |
| **LangGraph** | Multi-Agent Coordination | LangChain Framework | Consensus-based routing |
| **Random Forest** | Operational Forecasting | Scikit-learn | 93% simulation confidence |

### Backend Technologies

| Technology | Purpose |
|:-----------|:--------|
| **FastAPI** | Modern Python web framework with async support |
| **Uvicorn** | ASGI server for high-performance API serving |
| **OpenCV** | Image and video processing pipeline |
| **PyTorch** | Deep learning inference engine |
| **ChromaDB** | Vector database for RAG embeddings |
| **OpenWeatherMap** | Real-time weather data integration |

### Frontend Technologies

| Technology | Purpose |
|:-----------|:--------|
| **React 19** | Modern UI framework with concurrent features |
| **Vite 7** | Lightning-fast build tool and dev server |
| **TanStack Start** | Full-stack SSR framework with file-based routing |
| **Tailwind CSS v4** | Utility-first CSS styling |
| **Recharts** | Data visualization and interactive charts |
| **Framer Motion** | Smooth animations and transitions |
| **Lucide React** | Beautiful icon library |
| **Leaflet** | Interactive 2D/3D mapping |

<br/>

---

## ⚙️ Installation & Setup

### Prerequisites

| Requirement | Minimum Version |
|:------------|:----------------|
| **Node.js** | `v20.0.0+` |
| **Python** | `3.8+` |
| **NPM** | Package manager |
| **Git** | Version control |

### 1. Clone the Repository

```bash
git clone https://github.com/Aryanbuha890/LogiMind-AI-Hacknomics.git
cd LogiMind-AI-Hacknomics
```

### 2. Backend Setup

The backend consists of two primary services: the **Main API / Simulator** and the **RAG API**.

**Start the Main Simulator (Port 8000):**
```bash
cd Backend/what_if_simulator
pip install -r requirements.txt
python main.py
```

> The server starts on `http://localhost:8000` with:
> - Automatic model loading
> - Hot reload for development
> - API documentation at `/docs`

**Start the RAG API (Port 8001):**
Open a new terminal window:
```bash
cd Backend/RAG
pip install -r requirements.txt
python -m src.main serve
```

### 3. Frontend Setup

Open a new terminal window:
```bash
cd Frontend
npm install
npm run dev
```

> The frontend launches at `http://localhost:5173` with:
> - ⚡ HMR (Hot Module Replacement)
> - 🔄 TanStack Router auto-generation
> - 🎨 Tailwind CSS v4 JIT compilation

<br/>

---

## 🔌 API Endpoints

### Core Analytics & Simulation (`localhost:8000`)

```http
POST /api/simulate         # Run full ML Monte Carlo simulation
POST /api/predict          # Fast ML prediction for scenario analysis
POST /api/weather          # Fetch real-time weather & run predictions
POST /api/docs-ai/parse    # Parse uploaded manifest PDFs/TXTs
```

### Video & AI Inspections (`localhost:8000`)

```http
POST /upload                                # Upload video for inspection
GET  /inspections/{inspection_id}/status    # Check processing status
GET  /history                               # Get all inspection records
GET  /history/{inspection_id}               # Get detailed wagon data
GET  /history/{inspection_id}/report        # Download HTML/PDF report
```

### RAG Assistant (`localhost:8001`)

```http
POST /ask                  # Query the RAG knowledge base for maritime protocols
```

<br/>

---

## 📁 Project Structure

```text
LogiMind-AI-Hacknomics/
├── 📂 Backend/
│   ├── 📂 RAG/                          # Semantic search & document retrieval service
│   │   ├── src/
│   │   │   ├── main.py                  # RAG API entry point
│   │   │   └── ...                      # Embedding & retrieval logic
│   │   └── requirements.txt
│   ├── 📂 what_if_simulator/            # Main FastAPI backend & simulation engine
│   │   ├── main.py                      # API entry point
│   │   ├── prediction/                  # ML models (XGBoost, Random Forest)
│   │   └── requirements.txt
│   └── 📂 wagon number detection/       # YOLO-based OCR computer vision models
│
├── 📂 Frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/               # Reusable UI components & Sidebars
│   │   ├── 📂 routes/                   # File-based routing
│   │   │   ├── index.lazy.tsx           # Landing page
│   │   │   ├── app/                     # Protected app routes
│   │   │   └── auth/                    # Authentication routes
│   │   ├── 📂 lib/                      # Utilities & API bindings
│   │   └── styles.css                   # Tailwind CSS styling
│   ├── 📂 public/                       # Static assets, images & videos
│   └── vite.config.ts                   # Vite + TanStack Start config
│
└── README.md                            # You are here! 📍
```

<br/>

---

## 🏢 Built For The Maritime Industry

> *The following logos represent major industry players in the maritime and logistics sector. They are shown here for **reference and contextual understanding** of the domain LogiMind AI is designed to serve — they do not imply endorsement or partnership.*

<div align="center">

<table>
<tr>
<td align="center" width="150"><img src="Frontend/public/Adani Ports.png" alt="Adani Ports" width="80"/><br/><b>Adani Ports</b></td>
<td align="center" width="150"><img src="Frontend/public/DP World.png" alt="DP World" width="80"/><br/><b>DP World</b></td>
<td align="center" width="150"><img src="Frontend/public/Maersk.png" alt="Maersk" width="80"/><br/><b>Maersk</b></td>
<td align="center" width="150"><img src="Frontend/public/CMA CGM.png" alt="CMA CGM" width="80"/><br/><b>CMA CGM</b></td>
<td align="center" width="150"><img src="Frontend/public/MSC.png" alt="MSC" width="80"/><br/><b>MSC</b></td>
</tr>
<tr>
<td align="center" width="150"><img src="Frontend/public/PSA.png" alt="PSA International" width="80"/><br/><b>PSA</b></td>
<td align="center" width="150"><img src="Frontend/public/JNPT.png" alt="JNPT" width="80"/><br/><b>JNPT</b></td>
<td align="center" width="150"><img src="Frontend/public/CONCOR.png" alt="CONCOR" width="80"/><br/><b>CONCOR</b></td>
<td align="center" width="150"><img src="Frontend/public/Evergreen.png" alt="Evergreen" width="80"/><br/><b>Evergreen</b></td>
<td align="center" width="150"></td>
</tr>
</table>

</div>

<br/>

---

## 📜 License & Contribution

This project is open-source. For contribution guidelines, please refer to the issues and pull requests tab on GitHub.

> **Note**: First run of the AI modules (YOLO, Embeddings) may download models (~1-3GB) and could take a few minutes. Subsequent runs will be much faster as models are cached locally.

> **Important**: The AI/ML models used in this project are **not deployed on any external server, cloud platform, or Hugging Face**. All models run entirely on your local machine for full privacy and control.

<br/>

---

<div align="center">

<img src="Frontend/public/LogiMind Logo.png" alt="LogiMind AI" width="80"/>

**Built with ❤️ by Team Hacknomics**

*Transforming maritime operations through artificial intelligence*

<br/>

[![GitHub Stars](https://img.shields.io/github/stars/Aryanbuha890/LogiMind-AI-Hacknomics?style=social)](https://github.com/Aryanbuha890/LogiMind-AI-Hacknomics)
[![GitHub Forks](https://img.shields.io/github/forks/Aryanbuha890/LogiMind-AI-Hacknomics?style=social)](https://github.com/Aryanbuha890/LogiMind-AI-Hacknomics/fork)

</div>
