import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

/* ===================================================
   1. CATEGORIZATION & COLOR PALETTE
=================================================== */
export interface Vessel {
  id: string;
  name: string;
  type: string;
  flag: string;
  last_position_lat: number;
  last_position_lon: number;
  speed: number;
  course: number;
  eta?: string;
  status?: string;
  dest?: string;
  risk?: string;
}

export interface RiskZone {
  id: string | number;
  risk_type: 'WEATHER' | 'PIRACY' | 'CONGESTION';
  latitude: number;
  longitude: number;
  radius_km: number;
  description: string;
}

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  vessels?: Vessel[];
  risks?: RiskZone[];
  loading?: boolean;
  selectedVesselId?: string | null;
  onSelectVessel?: (vesselId: string) => void;
  showFiltersInline?: boolean; // Option to show filter overlay on top of the map
}

const getVesselCategory = (type: string): string => {
  if (!type) return "UNKNOWN";
  const t = type.toLowerCase();
  
  if (t.includes("tanker") || t.includes("oil") || t.includes("hazard")) return "TANKER";
  if (t.includes("cargo") || t.includes("container") || t.includes("bulk")) return "CARGO";
  if (t.includes("passenger") || t.includes("ferry") || t.includes("cruise")) return "PASSENGER";
  if (t.includes("fishing") || t.includes("trawler")) return "FISHING";
  if (t.includes("navy") || t.includes("military") || t.includes("patrol") || t.includes("war")) return "MILITARY";
  
  return "OTHER";
};

const VESSEL_COLORS: Record<string, string> = {
  CARGO: "#10b981",     // 🟢 Green (emerald-500)
  TANKER: "#ef4444",    // 🔴 Red (red-500)
  PASSENGER: "#06b6d4", // 🔵 Cyan (cyan-500)
  FISHING: "#f97316",   // 🟠 Orange (orange-500)
  MILITARY: "#a855f7",  // 🟣 Purple (purple-500)
  OTHER: "#64748b",     // Grey (slate-500)
  UNKNOWN: "#64748b"    // Grey (slate-500)
};

/* ===================================================
   2. SHAPE-BASED ICON GENERATOR (SVG format)
=================================================== */
const createShipIcon = (course: number = 0, type: string, isSelected: boolean = false) => {
  const category = getVesselCategory(type);
  let color = VESSEL_COLORS[category] || VESSEL_COLORS.UNKNOWN;
  let svgShape = "";

  const strokeColor = isSelected ? "#38bdf8" : "white"; // sky-400 for selected
  const strokeWidth = isSelected ? "8" : "5";

  switch (category) {
    case "CARGO":
      // ▲ Triangle pointing up
      svgShape = `<path d="M50 5 L95 95 L50 75 L5 95 Z" fill="${color}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
      break;
    case "TANKER":
      // ◆ Diamond
      svgShape = `<path d="M50 0 L95 50 L50 100 L5 50 Z" fill="${color}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
      break;
    case "PASSENGER":
      // ● Circle with nose
      svgShape = `<circle cx="50" cy="50" r="42" fill="${color}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>
                  <path d="M50 5 L62 28 L38 28 Z" fill="${strokeColor}"/>`; 
      break;
    case "FISHING":
      // ■ Square
      svgShape = `<rect x="12" y="12" width="76" height="76" fill="${color}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
      break;
    case "MILITARY":
      // ★ Star
      svgShape = `<polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="${color}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
      break;
    default:
      // Default Triangle
      svgShape = `<path d="M50 5 L95 95 L50 75 L5 95 Z" fill="${color}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
  }
  
  const size = isSelected ? 26 : 22;
  const halfSize = size / 2;

  return L.divIcon({
    className: "custom-ship-icon",
    html: `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100" style="transform: rotate(${course}deg); filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.4)); transition: transform 0.2s ease-out;">
        ${svgShape}
      </svg>
    `,
    iconSize: [size, size],
    iconAnchor: [halfSize, halfSize],
    popupAnchor: [0, -halfSize]
  });
};

/* ===================================================
   3. ANIMATED MARKER
=================================================== */
interface AnimatedMarkerProps {
  position: L.LatLngExpression;
  icon: L.DivIcon;
  children?: React.ReactNode;
  onClick?: () => void;
}

function AnimatedMarker({ position, icon, children, onClick }: AnimatedMarkerProps) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (!markerRef.current) return;
    const marker = markerRef.current;
    const to = L.latLng(position);
    if (marker.getLatLng().distanceTo(to) > 10) {
      marker.setLatLng(to); 
    }
  }, [position]);

  return (
    <Marker 
      ref={markerRef} 
      position={position} 
      icon={icon} 
      eventHandlers={{ click: onClick }}
    >
      {children}
    </Marker>
  );
}

/* ===================================================
   3.5 MAP VIEW CONTROLLER (center, zoom, selectedVessel)
=================================================== */
function MapController({
  center,
  zoom,
  vessels,
  selectedVesselId
}: {
  center: [number, number];
  zoom: number;
  vessels: Vessel[];
  selectedVesselId: string | null;
}) {
  const map = useMap();
  const prevCenterRef = useRef<[number, number]>(center);
  const prevZoomRef = useRef<number>(zoom);
  const prevSelectedIdRef = useRef<string | null>(selectedVesselId);

  useEffect(() => {
    const centerChanged = prevCenterRef.current[0] !== center[0] || prevCenterRef.current[1] !== center[1];
    const zoomChanged = prevZoomRef.current !== zoom;

    if (centerChanged || zoomChanged) {
      map.setView(center, zoom);
      prevCenterRef.current = center;
      prevZoomRef.current = zoom;
    }
  }, [center, zoom, map]);

  useEffect(() => {
    if (selectedVesselId && selectedVesselId !== prevSelectedIdRef.current) {
      const selectedVessel = vessels.find(v => v.id === selectedVesselId);
      if (selectedVessel) {
        const lat = Number(selectedVessel.last_position_lat);
        const lon = Number(selectedVessel.last_position_lon);
        if (!isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0) {
          map.setView([lat, lon], Math.max(map.getZoom(), 8)); // Zoom in to center on the selected vessel
        }
      }
      prevSelectedIdRef.current = selectedVesselId;
    }
  }, [selectedVesselId, vessels, map]);

  return null;
}

/* ===================================================
   4. MAIN MAP COMPONENT
=================================================== */
export default function MapComponent({ 
  center = [22.8, 69.7], // Center around Mundra Port by default
  zoom = 9, 
  vessels = [], 
  risks = [], 
  loading = false,
  selectedVesselId = null,
  onSelectVessel,
  showFiltersInline = true
}: MapComponentProps) {
  
  // UI States
  const [filterType, setFilterType] = useState<string>("ALL"); 
  const [showRiskZones, setShowRiskZones] = useState<boolean>(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null); 
  const [showAlerts, setShowAlerts] = useState<boolean>(false);

  // Risk Zone Colors
  const getRiskStyle = (type: string) => {
    switch (type) {
      case 'WEATHER': return { color: '#fbbf24', fill: '#fbbf24', opacity: 0.25 }; // Yellow
      case 'PIRACY': return { color: '#ef4444', fill: '#ef4444', opacity: 0.35 }; // Red
      case 'CONGESTION': return { color: '#f97316', fill: '#f97316', opacity: 0.25 }; // Orange
      default: return { color: '#fbbf24', fill: '#fbbf24', opacity: 0.25 };
    }
  };

  const handleAction = (action: string) => {
    setToastMsg(`${action} initiated.`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredVessels = vessels.filter(v => filterType === "ALL" || getVesselCategory(v.type) === filterType);
  const activeCount = filteredVessels.length;
  const riskCount = vessels.filter(v => v.risk === "High" || v.risk === "Medium").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] w-full bg-white text-slate-600 font-mono text-sm">
        <div className="flex flex-col items-center gap-3">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-slate-500 border-t-cyan-500" />
          <span>Synchronizing AIS stream...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden border border-border bg-background font-sans">
      
      {/* 1. GLASS STATUS BAR */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/80 hover:bg-white/90 text-slate-900 backdrop-blur-md px-5 py-2 rounded-full flex gap-5 items-center shadow-lg text-xs font-semibold border border-slate-200 transition duration-150">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981] animate-pulse" />
          <span>{activeCount} Active</span>
        </div>
        <div className="w-px h-3.5 bg-white/20" />
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]" />
          <span>{riskCount} Risks</span>
        </div>
      </div>

      {/* 2. TOP RIGHT CONTROLS */}
      {showFiltersInline && (
        <div className="absolute top-4 right-4 z-[1000] flex gap-2.5 items-start">
            
            {/* FILTER BOX */}
            <div className="bg-background/95 backdrop-blur-md p-3.5 rounded-lg shadow-xl min-w-[210px] border border-border flex flex-col gap-2.5">
              <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-foreground">AIS Filters</span>
                  <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse" />
                    LIVE
                  </span>
              </div>
              
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)} 
                className="p-1.5 rounded bg-muted border border-border text-xs text-foreground w-full cursor-pointer focus:outline-none focus:border-cyan-500"
              >
                  <option value="ALL">Show All Fleets</option>
                  <option value="CARGO">Cargo (Green ▲)</option>
                  <option value="TANKER">Tankers (Red ◆)</option>
                  <option value="PASSENGER">Passenger (Blue ●)</option>
                  <option value="FISHING">Fishing (Orange ■)</option>
                  <option value="MILITARY">Military (Purple ★)</option>
              </select>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                 <span className="text-[11px] font-semibold text-muted-foreground">Risk Overlays</span>
                 <input 
                   type="checkbox" 
                   checked={showRiskZones} 
                   onChange={() => setShowRiskZones(!showRiskZones)} 
                   className="cursor-pointer h-3.5 w-3.5 rounded bg-muted border-border text-cyan-500 accent-cyan-500" 
                 />
              </div>
            </div>

            {/* BELL BUTTON */}
            <button 
              onClick={() => setShowAlerts(!showAlerts)}
              className={`border border-border rounded-lg w-9.5 h-9.5 flex items-center justify-center shadow-xl cursor-pointer transition duration-150 ${showAlerts ? 'bg-muted text-foreground' : 'bg-background hover:bg-muted text-muted-foreground hover:text-foreground'}`}
            >
               <span className="text-base">🔔</span>
            </button>
        </div>
      )}

      {/* 3. ALERTS PANEL */}
      {showAlerts && showFiltersInline && (
        <div className="absolute top-36 right-4 z-[999] w-[260px] bg-background border border-border rounded-lg shadow-2xl p-4 animate-slide-down">
            <h4 className="margin-0 mb-3 text-xs font-bold text-foreground">Active AIS Warnings</h4>
            <div className="flex flex-col gap-2">
                <div className="bg-red-500/10 p-2.5 rounded border-l-3 border-red-500 text-foreground">
                    <div className="text-[11px] font-bold text-red-600 dark:text-red-400">Accident/Congestion Warning</div>
                    <div className="text-[10px] text-muted-foreground">Restricted maneuver corridor Gulf of Kutch.</div>
                </div>
                <div className="bg-amber-500/10 p-2.5 rounded border-l-3 border-amber-500 text-foreground">
                    <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400">Weather advisory</div>
                    <div className="text-[10px] text-muted-foreground">High wind swells (&gt;22kn) approaching Mundra Berth 4.</div>
                </div>
            </div>
        </div>
      )}

      {/* TOAST FEEDBACK */}
      {toastMsg && (
        <div className="absolute top-18 left-1/2 -translate-x-1/2 bg-emerald-600 text-slate-900 px-4 py-2 rounded-full shadow-lg z-[10000] font-semibold text-xs animate-fade-in border border-emerald-500/25">
          {toastMsg}
        </div>
      )}

      {/* LEAFLET MAP */}
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: "100%", width: "100%", background: "#090f1d" }} 
        zoomControl={false}
      >
        <MapController 
          center={center} 
          zoom={zoom} 
          vessels={vessels}
          selectedVesselId={selectedVesselId}
        />
        <TileLayer 
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
          attribution='&copy; <a href="https://carto.com/">CARTO</a>' 
        />

        {/* RISK ZONES */}
        {showRiskZones && risks.map((risk) => {
            const style = getRiskStyle(risk.risk_type);
            return (
              <Circle 
                key={risk.id} 
                center={[risk.latitude || 0, risk.longitude || 0]} 
                pathOptions={{ color: style.color, fillColor: style.fill, fillOpacity: style.opacity, weight: 1.5 }} 
                radius={(risk.radius_km || 10) * 1000}
              >
                <Popup className="custom-popup">
                  <div className="text-center font-sans">
                    <strong className="text-amber-400">⚠️ {risk.risk_type} ZONE</strong>
                    <p className="text-xs text-slate-700 mt-1">{risk.description}</p>
                    <span className="text-[9px] text-slate-500">Radius: {risk.radius_km} km</span>
                  </div>
                </Popup>
              </Circle>
            );
        })}

        {/* VESSELS */}
        {filteredVessels.map((v) => {
          const lat = Number(v.last_position_lat);
          const lon = Number(v.last_position_lon);
          if (isNaN(lat) || isNaN(lon) || lat === 0 || lon === 0) return null;

          const heading = v.course ?? 0;
          const displaySpeed = (v.speed ?? 0).toFixed(1); 
          const isHighRisk = v.risk === "High";
          const isSelected = selectedVesselId === v.id;

          return (
            <React.Fragment key={v.id}>
                {isSelected && (
                  // Draw direction line projection if selected
                  <Polyline 
                    positions={[
                      [lat, lon], 
                      [
                        lat + Math.cos((heading * Math.PI) / 180) * 0.05, 
                        lon + Math.sin((heading * Math.PI) / 180) * 0.05
                      ]
                    ]} 
                    pathOptions={{ color: '#06b6d4', weight: 2, dashArray: '4, 6', opacity: 0.8 }} 
                  />
                )}
                
                <AnimatedMarker 
                  position={[lat, lon]} 
                  icon={createShipIcon(heading, v.type, isSelected)} 
                  onClick={() => onSelectVessel?.(v.id)}
                >
                  
                  {/* POPUP */}
                  <Popup className="custom-popup" maxWidth={300}>
                    <div className="w-[240px]">
                      <div className="flex justify-between items-start mb-2 pb-2 border-b border-slate-200">
                          <div>
                            <h3 className="m-0 text-sm font-bold text-cyan-400">{v.name || "UNNAMED VESSEL"}</h3>
                            <span className="text-[10px] text-slate-600 font-medium">MMSI: {v.id} {v.flag ? `· ${v.flag}` : ''}</span>
                          </div>
                          {isHighRisk && (
                            <span className="text-[9px] bg-red-950 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20 font-bold">
                              HIGH RISK
                            </span>
                          )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 mb-3">
                          <div className="bg-white/60 p-1.5 rounded">
                            <span className="text-slate-500 block text-[9px] uppercase">Type</span>
                            <span className="font-semibold text-slate-800">{v.type}</span>
                          </div>
                          <div className="bg-white/60 p-1.5 rounded">
                            <span className="text-slate-500 block text-[9px] uppercase">Speed</span>
                            <span className="font-semibold text-slate-800">{displaySpeed} kn</span>
                          </div>
                          <div className="bg-white/60 p-1.5 rounded">
                            <span className="text-slate-500 block text-[9px] uppercase">Heading</span>
                            <span className="font-semibold text-slate-800">{heading}°</span>
                          </div>
                          <div className="bg-white/60 p-1.5 rounded">
                            <span className="text-slate-500 block text-[9px] uppercase">ETA</span>
                            <span className="font-semibold text-slate-800">{v.eta || "N/A"}</span>
                          </div>
                      </div>


                    </div>
                  </Popup>
                </AnimatedMarker>
            </React.Fragment>
          );
        })}
      </MapContainer>
      
      {/* 4. LEGEND */}
      <div className="absolute bottom-4 right-4 bg-background/95 text-foreground p-3 rounded-lg shadow-xl z-[1000] text-[11px] border border-border">
          <div className="font-bold mb-1.5 text-foreground border-b border-border pb-1">Vessel Category</div>
          <div className="flex flex-col gap-1 text-muted-foreground">
            <div className="flex items-center gap-2"><span className="text-[#10b981] font-bold">▲</span> <span className="text-foreground">Cargo (Green)</span></div>
            <div className="flex items-center gap-2"><span className="text-[#ef4444] font-bold">◆</span> <span className="text-foreground">Tanker (Red)</span></div>
            <div className="flex items-center gap-2"><span className="text-[#06b6d4] font-bold">●</span> <span className="text-foreground">Passenger (Blue)</span></div>
            <div className="flex items-center gap-2"><span className="text-[#f97316] font-bold">■</span> <span className="text-foreground">Fishing (Orange)</span></div>
            <div className="flex items-center gap-2"><span className="text-[#a855f7] font-bold">★</span> <span className="text-foreground">Military (Purple)</span></div>
          </div>
      </div>
    </div>
  );
}
