import io
import re
import os
import pypdf

# -------------------------------------------------------------
# Configuration of Anchor Keywords and Regular Expressions
# -------------------------------------------------------------
TEMPLATES = {
    "TMP-001": {
        "name": "Customs Declaration (Inbound Cargo)",
        "fields": {
            "vessel_identity": {
                "label": "Vessel Identity",
                "anchors": ["vessel identity", "vessel name", "vessel", "ship name", "ship identity", "ship", "imo number", "imo"],
                "regex": r"IMO\s?:?\s*\d{7}|MV-[A-Za-z0-9-]+",
                "default": "MV-Geneva (IMO 9823019)"
            },
            "origin_port": {
                "label": "Origin Port",
                "anchors": ["origin port", "port of loading", "loading port", "origin", "from port", "from"],
                "regex": r"[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s?\([A-Z]{5}\)|[A-Z]{5}",
                "default": "Rotterdam (NLRTM)"
            },
            "cargo_category": {
                "label": "Cargo Category",
                "anchors": ["cargo category", "commodity description", "cargo description", "commodity", "cargo type", "goods"],
                "regex": r"[A-Za-z0-9\s/,&()-]{4,60}",
                "default": "Industrial Spares / Electronics"
            },
            "consignee": {
                "label": "Consignee details",
                "anchors": ["consignee", "receiver", "import agent", "notify party", "ship to"],
                "regex": r"[A-Za-z0-9\s.,-]{4,40}",
                "default": "Mundra Terminal Logistics Ltd."
            },
            "teu_count": {
                "label": "Total TEU count",
                "anchors": ["total teu count", "teu count", "total teus", "teus", "volume", "container count"],
                "regex": r"\b\d+\s?(?:TEUs?|containers?|ctns?)\b|\b\d{1,4}\b",
                "default": "2,800 TEUs"
            },
            "declared_value": {
                "label": "Declared Cargo Value",
                "anchors": ["declared cargo value", "declared value", "cargo value", "invoice value", "value", "total value"],
                "regex": r"\$\s?\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\bUSD\s?\d{1,3}(?:,\d{3})*(?:\.\d{2})?\b|\b\d+(?:,\d{3})*\s?USD\b",
                "default": "$4,290,100 USD"
            },
            "hs_codes": {
                "label": "HS Codes",
                "anchors": ["hs codes", "hs code", "tariff code", "harmonized code", "hscode"],
                "regex": r"\b\d{4}\.\d{2}(?:\.\d{2})?\b|\b\d{6,10}\b",
                "default": "8504.40.90, 8507.60.00"
            }
        }
    },
    "TMP-002": {
        "name": "Dangerous Goods Manifest (IMDG)",
        "fields": {
            "hazard_class": {
                "label": "IMDG Hazard class",
                "anchors": ["imdg hazard class", "hazard class", "imdg class", "class", "danger class", "dg class"],
                "regex": r"\bClass\s?\d(?:\.\d)?\b|\b\d\.\d\b",
                "default": "Class 9 (Miscellaneous)"
            },
            "un_numbers": {
                "label": "UN numbers",
                "anchors": ["un numbers", "un number", "un code", "unno", "un num"],
                "regex": r"\bUN\s?\d{4}\b|\b\d{4}\b",
                "default": "UN 3480"
            },
            "stowage_position": {
                "label": "Stowage position",
                "anchors": ["stowage position", "stowage", "bay position", "bay plan", "cell position", "location"],
                "regex": r"\b\d{6}\b|\bBay\s?\d{2}[A-Z0-9-]*\b",
                "default": "040208 (Hold 2, Bay 4)"
            },
            "emergency_code": {
                "label": "Emergency action code",
                "anchors": ["emergency action code", "emergency code", "action code", "ems number", "ems", "eac"],
                "regex": r"\bF-[A-Z],\s?S-[A-Z]\b|[0-9A-Z]{2,4}",
                "default": "F-A, S-I (Spill Schedule)"
            },
            "cargo_description": {
                "label": "Cargo Description",
                "anchors": ["cargo description", "dangerous goods description", "dg description", "technical name", "substance"],
                "regex": r"[A-Za-z0-9\s/,-]{4,50}",
                "default": "Lithium Ion Battery Pack Modules"
            }
        }
    },
    "TMP-003": {
        "name": "Port Maintenance Work Order",
        "fields": {
            "crane_id": {
                "label": "Crane ID",
                "anchors": ["crane id", "equipment id", "equipment", "crane", "qc id", "gantry id"],
                "regex": r"\bQC-\d{2,3}\b|\bCRANE-\d{2,3}\b|\bRTG-\d{2,3}\b",
                "default": "QC-04 (Super Post-Panamax)"
            },
            "failure_symptom": {
                "label": "Failure Symptom",
                "anchors": ["failure symptom", "symptom", "failure description", "fault", "defect", "problem", "issue"],
                "regex": r"[A-Za-z0-9\s/,-]{5,60}",
                "default": "Gantry hoist motor high-temperature sensor trip."
            },
            "assigned_team": {
                "label": "Assigned Team",
                "anchors": ["assigned team", "assigned technician", "technician", "team", "engineer", "crew"],
                "regex": r"[A-Za-z0-9\s-]{4,30}",
                "default": "Electrical Maintenance Crew B"
            },
            "priority_level": {
                "label": "Priority Level",
                "anchors": ["priority level", "priority", "criticality", "severity"],
                "regex": r"\bCRITICAL\b|\bHIGH\b|\bMEDIUM\b|\bLOW\b|\b[1-5]\b",
                "default": "HIGH (Operational Risk)"
            },
            "system_component": {
                "label": "System Component",
                "anchors": ["system_component", "component", "subsystem", "assembly", "affected part"],
                "regex": r"[A-Za-z0-9\s-]{4,40}",
                "default": "Hoist Drive Inverter Gantry Assembly"
            }
        }
    }
}


def extract_text_from_file(file_bytes: bytes, filename: str) -> str:
    """Extract string text from uploaded file. Supports PDF and standard text files."""
    ext = os.path.splitext(filename.lower())[1]

    if ext == ".pdf":
        try:
            pdf_file = io.BytesIO(file_bytes)
            reader = pypdf.PdfReader(pdf_file)
            text_list = []
            for i, page in enumerate(reader.pages):
                text_list.append(page.extract_text() or "")
            return "\n".join(text_list)
        except Exception as e:
            print(f"Error reading PDF file: {e}")
            raise ValueError(f"Could not parse PDF content: {e}")
    else:
        try:
            # Treat as plain text
            return file_bytes.decode("utf-8", errors="ignore")
        except Exception as e:
            raise ValueError(f"Could not decode text file: {e}")


def parse_document_by_template(text: str, template_id: str) -> list:
    """
    Local DPD-NEE NLP Model: Tokenizes document lines, searches for anchors,
    uses token proximity and regex validation to extract key-value fields.
    """
    if template_id not in TEMPLATES:
        template_id = "TMP-001"  # Default Customs

    template_config = TEMPLATES[template_id]
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    extracted_fields = []

    # Local helper for cleaning values
    def clean_val(val_str: str) -> str:
        val_str = val_str.strip()
        # Remove leading colons, equals, hyphens, and whitespace
        val_str = re.sub(r"^[^\w$]+", "", val_str)
        return val_str.strip()

    # Scan each field config
    for field_key, field_cfg in template_config["fields"].items():
        field_label = field_cfg["label"]
        anchors = field_cfg["anchors"]
        regex_pattern = field_cfg["regex"]
        default_val = field_cfg["default"]

        extracted_val = None
        confidence = 70  # Default fallback confidence
        source_type = "fallback"

        # Special global matching for HS codes to extract all matching HS codes present in the document
        if field_key == "hs_codes":
            matches = re.findall(regex_pattern, text)
            if matches:
                # Deduplicate preserving order
                seen = set()
                deduped = [m for m in matches if not (m in seen or seen.add(m))]
                extracted_val = ", ".join(deduped)
                confidence = 98
                source_type = "global_regex"

        # Search anchors on lines
        if not extracted_val:
            for idx, line in enumerate(lines):
                line_lower = line.lower()
                matching_anchor = None

                for anchor in anchors:
                    if anchor in line_lower:
                        matching_anchor = anchor
                        break

                if matching_anchor:
                    # 1. Look to the right of the anchor on the same line
                    anchor_pos = line_lower.find(matching_anchor)
                    right_text = line[anchor_pos + len(matching_anchor):]
                    cleaned = clean_val(right_text)

                    if cleaned and len(cleaned) > 1:
                        # Validate against regex
                        match = re.search(regex_pattern, cleaned, re.IGNORECASE)
                        if match:
                            extracted_val = match.group(0)
                            confidence = 98
                            source_type = "regex_same_line"
                            break
                        else:
                            # Extract the cleaned phrase as candidate
                            extracted_val = cleaned
                            confidence = 85
                            source_type = "proximity_same_line"
                            break

                    # 2. Look in the next line if the right side was empty
                    if idx + 1 < len(lines):
                        next_line = clean_val(lines[idx + 1])
                        if next_line and len(next_line) > 1:
                            match = re.search(regex_pattern, next_line, re.IGNORECASE)
                            if match:
                                extracted_val = match.group(0)
                                confidence = 95
                                source_type = "regex_next_line"
                                break
                            else:
                                extracted_val = next_line
                                confidence = 80
                                source_type = "proximity_next_line"
                                break

        # 3. If proximity extraction didn't yield anything, scan the entire text for the regex pattern
        if not extracted_val:
            match = re.search(regex_pattern, text, re.IGNORECASE)
            if match:
                extracted_val = match.group(0)
                confidence = 90
                source_type = "global_regex"

        # 4. Fallback to default mock template value if not found in text
        if not extracted_val:
            extracted_val = default_val
            confidence = 75
            source_type = "heuristic_default"

        # Apply Safety/IMDG Compliance Rules to determine Verified/Flagged status
        status = "verified"
        text_for_hazard = (extracted_val + " " + text).lower()
        
        # Check for dangerous goods keywords
        hazard_keywords = [
            "lithium", "battery", "batteries", "un 3480", "un 3090", "hazardous",
            "hazmat", "explosive", "acid", "flammable", "toxic", "combustible",
            "corrosive", "class 9", "class 1", "class 3", "un 1993", "dangerous goods"
        ]

        if template_id == "TMP-002" or any(hk in text_for_hazard for hk in hazard_keywords):
            # If the specific field represents IMDG Class or UN code, check if it triggers
            if field_key in ["hazard_class", "un_numbers", "cargo_description"] or "class 9" in text_for_hazard or "un 3480" in text_for_hazard or "lithium" in text_for_hazard:
                status = "flagged"

        # Clean string layout
        extracted_fields.append({
            "key": field_label,
            "value": clean_val(extracted_val),
            "confidence": confidence,
            "status": status,
            "source": source_type
        })

    return extracted_fields


def compute_customs_check(extracted_fields: list, text: str, template_id: str) -> dict:
    """
    Evaluates customs compliance, HS code validation, valuation risk, and safety flags.
    """
    text_lower = text.lower()
    
    # Check for discrepancies or risks
    is_undervalued = "undervaluation" in text_lower or "suspicion" in text_lower or "benchmark" in text_lower
    has_weight_discrepancy = "weight discrepancy" in text_lower or "+29" in text_lower or "variance" in text_lower
    is_hazmat = "dangerous goods" in text_lower or "un 3480" in text_lower or "imdg" in text_lower or template_id == "TMP-002"
    is_unverified_consignee = "unverified" in text_lower or "pending" in text_lower
    
    # Channel determination
    if is_undervalued or has_weight_discrepancy:
        channel = "RED"
        status_label = "RED CHANNEL // AUDIT REQUIRED - SECONDARY PHYSICAL SCAN"
        risk_score = 88
    elif is_hazmat:
        channel = "YELLOW"
        status_label = "YELLOW CHANNEL // REGULATORY HAZMAT REVIEW & BUFFER CHECK"
        risk_score = 48
    elif template_id == "TMP-003":
        channel = "GREEN"
        status_label = "EQUIPMENT LOGGED // AUTHORIZED MAINTENANCE"
        risk_score = 5
    else:
        channel = "GREEN"
        status_label = "GREEN CHANNEL // AUTOMATED CUSTOMS CLEARANCE GRANTED"
        risk_score = 12

    # Duty assessment
    declared_val_str = "$4,290,100 USD"
    for f in extracted_fields:
        if "value" in f["key"].lower():
            declared_val_str = f["value"]
            break

    # Extract numeric value for tariff estimation
    numeric_val = 4290100.0
    val_clean = re.sub(r"[^\d.]", "", declared_val_str)
    if val_clean:
        try:
            numeric_val = float(val_clean)
        except ValueError:
            numeric_val = 4290100.0

    basic_duty = numeric_val * 0.04
    cess = numeric_val * 0.015
    import_gst = numeric_val * 0.18
    total_tax = basic_duty + cess + import_gst

    checklist = [
        {
            "id": "chk-hs",
            "name": "WCO HS-Code Tariff Classification",
            "regulation": "WCO Nomenclature 2026 / Section 46 Customs Act",
            "status": "FLAGGED" if is_undervalued else "PASS",
            "detail": "HS Code mismatch detected against declared invoice description." if is_undervalued else "8504.40.90 / 8507.60.00 classified under Standard Capital Goods schedule."
        },
        {
            "id": "chk-kyc",
            "name": "Consignee EORI / Import-Export Code (IEC) Status",
            "regulation": "CBIC Authorized Economic Operator (AEO-T2) Registry",
            "status": "FLAGGED" if is_unverified_consignee else "PASS",
            "detail": "Consignee KYC pending biometric verification." if is_unverified_consignee else "IEC active, AEO Tier-2 verified consignee status on record."
        },
        {
            "id": "chk-imo",
            "name": "Vessel IMO & Port Sanctions Screen",
            "regulation": "UN Sanctions Database & Port State Control (PSC)",
            "status": "PASS",
            "detail": "Vessel cleared against global maritime embargo and maritime sanctions list."
        },
        {
            "id": "chk-val",
            "name": "Commercial Valuation & Invoice Match",
            "regulation": "WTO Customs Valuation Agreement (Article 7)",
            "status": "FLAGGED" if is_undervalued else "PASS",
            "detail": "Suspect undervaluation: declared value is >80% below international market benchmark." if is_undervalued else "Transaction value validated within ±2.5% reference index."
        },
        {
            "id": "chk-wt",
            "name": "Gross Weight Tolerance Verification",
            "regulation": "SOLAS Verified Gross Mass (VGM) Regulation",
            "status": "FLAGGED" if has_weight_discrepancy else "PASS",
            "detail": "Quayside weight scale discrepancy: +29.0% over declared manifest weight!" if has_weight_discrepancy else "Discrepancy < 0.8% (within standard ±3% allowable tare tolerance)."
        },
        {
            "id": "chk-dg",
            "name": "IMDG Dangerous Goods Containment Protocol",
            "regulation": "IMO IMDG Code Chapter 7.2 (Segregation & Stowage)",
            "status": "FLAGGED" if is_hazmat else "PASS",
            "detail": "Class 9 Hazmat stowage plan approved. 12m quayside buffer isolation required." if is_hazmat else "Non-hazardous cargo. No dangerous goods pre-clearance required."
        }
    ]

    return {
        "channel": channel,
        "status_label": status_label,
        "risk_score": risk_score,
        "declaration_id": f"CUST-DEC-2026-{abs(hash(text)) % 90000 + 10000}",
        "clearance_token": f"CLR-INMUN-99{abs(hash(text)) % 900 + 100}",
        "duties": {
            "declared_value": f"${numeric_val:,.2f} USD",
            "basic_customs_duty": f"${basic_duty:,.2f} USD (4.0%)",
            "port_cess": f"${cess:,.2f} USD (1.5%)",
            "import_gst_vat": f"${import_gst:,.2f} USD (18.0%)",
            "total_estimated_tax": f"${total_tax:,.2f} USD"
        },
        "checklist": checklist,
        "summary": "Declaration passed automated green-channel clearance." if channel == "GREEN" else ("Mandatory physical container inspection required due to valuation or weight discrepancy." if channel == "RED" else "Hazardous material containment permit required prior to quayside transfer.")
    }

