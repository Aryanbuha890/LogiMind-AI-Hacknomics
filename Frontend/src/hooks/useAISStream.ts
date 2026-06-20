import { useState, useEffect, useRef } from "react";
import { Vessel } from "@/components/MapComponent";

const AISSTREAM_API_KEY = import.meta.env.VITE_AISSTREAM_API_KEY || "";
const AISSTREAM_URL = import.meta.env.VITE_AISSTREAM_URL || "wss://stream.aisstream.io/v0/stream";

// Global bounding box covering the entire world for global live feed
// Format: [[[minLat, minLon], [maxLat, maxLon]]]
const MUNDRA_BOUNDING_BOX = [[[-90.0, -180.0], [90.0, 180.0]]];

// Map AIS Type numeric codes to category strings
const mapAisTypeToCategory = (typeId: number): string => {
  if (typeId >= 70 && typeId <= 79) return "Cargo";
  if (typeId >= 80 && typeId <= 89) return "Tanker";
  if (typeId >= 60 && typeId <= 69) return "Passenger";
  if (typeId === 30) return "Fishing";
  if (typeId === 35 || typeId === 36 || typeId === 55) return "Military";
  return "Cargo"; // Fallback default
};

// Initial simulated vessels for fallback/simulation mode
const INITIAL_SIMULATED_VESSELS: Vessel[] = [
  {
    id: "MV-228",
    name: "Maersk Halifax",
    flag: "DK",
    status: "Berthing",
    eta: "14:45",
    risk: "Low",
    speed: 4.2,
    course: 218,
    dest: "Berth 7",
    last_position_lat: 22.78,
    last_position_lon: 69.68,
    type: "Cargo"
  },
  {
    id: "MV-441",
    name: "MSC Aurora",
    flag: "PA",
    status: "Inbound",
    eta: "16:20",
    risk: "Medium",
    speed: 12.1,
    course: 142,
    dest: "Berth 12",
    last_position_lat: 22.65,
    last_position_lon: 69.85,
    type: "Cargo"
  },
  {
    id: "MV-117",
    name: "Ever Glory",
    flag: "TW",
    status: "Anchored",
    eta: "—",
    risk: "Low",
    speed: 0.0,
    course: 90,
    dest: "Anchorage A",
    last_position_lat: 22.84,
    last_position_lon: 69.52,
    type: "Cargo"
  },
  {
    id: "MV-908",
    name: "CMA Beirut",
    flag: "FR",
    status: "Outbound",
    eta: "Departing",
    risk: "Low",
    speed: 8.4,
    course: 310,
    dest: "Open sea",
    last_position_lat: 22.58,
    last_position_lon: 69.38,
    type: "Cargo"
  },
  {
    id: "MV-562",
    name: "ONE Bluebird",
    flag: "JP",
    status: "Inbound",
    eta: "18:05",
    risk: "High",
    speed: 14.8,
    course: 188,
    dest: "Berth 4",
    last_position_lat: 22.42,
    last_position_lon: 69.95,
    type: "Tanker"
  },
  {
    id: "MV-330",
    name: "Adani Spirit",
    flag: "IN",
    status: "Berthed",
    eta: "—",
    risk: "Low",
    speed: 0.0,
    course: 0,
    dest: "Berth 9",
    last_position_lat: 22.75,
    last_position_lon: 69.71,
    type: "Cargo"
  },
  {
    id: "MV-711",
    name: "Everest Explorer",
    flag: "SG",
    status: "Inbound",
    eta: "20:10",
    risk: "Low",
    speed: 10.4,
    course: 45,
    dest: "Anchorage B",
    last_position_lat: 22.31,
    last_position_lon: 68.82,
    type: "Cargo"
  },
  {
    id: "MV-882",
    name: "Ganges Trader",
    flag: "IN",
    status: "Anchored",
    eta: "—",
    risk: "Low",
    speed: 0.0,
    course: 180,
    dest: "Anchorage A",
    last_position_lat: 22.91,
    last_position_lon: 69.41,
    type: "Cargo"
  },
  {
    id: "MV-154",
    name: "OOCL Tokyo",
    flag: "HK",
    status: "Outbound",
    eta: "Departed",
    risk: "Low",
    speed: 15.2,
    course: 220,
    dest: "Singapore",
    last_position_lat: 22.48,
    last_position_lon: 69.15,
    type: "Cargo"
  },
  {
    id: "MV-369",
    name: "INS Vikram",
    flag: "IN",
    status: "Inbound",
    eta: "—",
    risk: "Medium",
    speed: 18.5,
    course: 95,
    dest: "Naval Base",
    last_position_lat: 22.25,
    last_position_lon: 69.55,
    type: "Military"
  },
  {
    id: "MV-505",
    name: "Sagar Kanya",
    flag: "IN",
    status: "Anchored",
    eta: "—",
    risk: "Low",
    speed: 4.8,
    course: 320,
    dest: "Fishing Zone B",
    last_position_lat: 22.35,
    last_position_lon: 69.21,
    type: "Fishing"
  },
  {
    id: "MV-620",
    name: "Royal Voyager",
    flag: "BS",
    status: "Outbound",
    eta: "19:00",
    risk: "Low",
    speed: 16.5,
    course: 130,
    dest: "Mumbai Port",
    last_position_lat: 22.15,
    last_position_lon: 70.12,
    type: "Passenger"
  },
  {
    id: "MV-102",
    name: "COSCO Shipping Alps",
    flag: "CN",
    status: "Underway",
    eta: "10-24 14:00",
    risk: "Medium",
    speed: 18.2,
    course: 90,
    dest: "Rotterdam",
    last_position_lat: 50.60,
    last_position_lon: -1.25,
    type: "Cargo"
  },
  {
    id: "MV-203",
    name: "Suez Monarch",
    flag: "PA",
    status: "Underway",
    eta: "10-25 08:30",
    risk: "Low",
    speed: 12.5,
    course: 350,
    dest: "Port Said",
    last_position_lat: 29.95,
    last_position_lon: 32.55,
    type: "Cargo"
  },
  {
    id: "MV-304",
    name: "Malacca Star",
    flag: "SG",
    status: "Underway",
    eta: "10-23 22:15",
    risk: "Medium",
    speed: 16.4,
    course: 125,
    dest: "Singapore",
    last_position_lat: 1.45,
    last_position_lon: 102.75,
    type: "Cargo"
  },
  {
    id: "MV-405",
    name: "Panama Pioneer",
    flag: "LR",
    status: "Underway",
    eta: "10-27 11:00",
    risk: "Low",
    speed: 10.8,
    course: 220,
    dest: "Balboa",
    last_position_lat: 8.92,
    last_position_lon: -79.56,
    type: "Cargo"
  },
  {
    id: "MV-506",
    name: "Arabian Sun",
    flag: "SA",
    status: "Underway",
    eta: "10-24 04:00",
    risk: "Low",
    speed: 14.5,
    course: 60,
    dest: "Fujairah",
    last_position_lat: 24.50,
    last_position_lon: 57.50,
    type: "Tanker"
  },
  {
    id: "MV-607",
    name: "Pacific Titan",
    flag: "US",
    status: "Underway",
    eta: "10-29 09:00",
    risk: "Medium",
    speed: 21.0,
    course: 270,
    dest: "Tokyo",
    last_position_lat: 34.50,
    last_position_lon: 142.50,
    type: "Cargo"
  },
  {
    id: "MV-708",
    name: "Atlantic Crest",
    flag: "UK",
    status: "Underway",
    eta: "10-28 17:30",
    risk: "Low",
    speed: 15.6,
    course: 80,
    dest: "New York",
    last_position_lat: 40.50,
    last_position_lon: -70.50,
    type: "Cargo"
  },
  {
    id: "MV-809",
    name: "Gibraltar Guard",
    flag: "GI",
    status: "Underway",
    eta: "10-24 19:45",
    risk: "Low",
    speed: 13.2,
    course: 270,
    dest: "Algeciras",
    last_position_lat: 35.95,
    last_position_lon: -5.45,
    type: "Cargo"
  },
  {
    id: "MV-910",
    name: "Cape Horizon",
    flag: "ZA",
    status: "Underway",
    eta: "10-31 06:15",
    risk: "Low",
    speed: 14.0,
    course: 90,
    dest: "Durban",
    last_position_lat: -34.40,
    last_position_lon: 18.50,
    type: "Cargo"
  },
  {
    id: "MV-111",
    name: "Hormuz Raider",
    flag: "IR",
    status: "Underway",
    eta: "10-24 13:00",
    risk: "Low",
    speed: 11.2,
    course: 150,
    dest: "Bandar Abbas",
    last_position_lat: 26.55,
    last_position_lon: 56.45,
    type: "Cargo"
  },
  {
    id: "MV-222",
    name: "Bosphorus Pride",
    flag: "TR",
    status: "Underway",
    eta: "10-23 16:20",
    risk: "Low",
    speed: 9.5,
    course: 45,
    dest: "Istanbul",
    last_position_lat: 41.15,
    last_position_lon: 29.10,
    type: "Cargo"
  },
  {
    id: "MV-333",
    name: "Indian Empress",
    flag: "IN",
    status: "Underway",
    eta: "10-25 02:00",
    risk: "Medium",
    speed: 17.5,
    course: 180,
    dest: "Colombo",
    last_position_lat: 13.00,
    last_position_lon: 80.30,
    type: "Cargo"
  },
  {
    id: "MV-444",
    name: "Rotterdam Express",
    flag: "NL",
    status: "Underway",
    eta: "10-23 12:45",
    risk: "Medium",
    speed: 19.8,
    course: 220,
    dest: "Hamburg",
    last_position_lat: 53.95,
    last_position_lon: 8.55,
    type: "Cargo"
  },
  {
    id: "MV-555",
    name: "Sydney Mariner",
    flag: "AU",
    status: "Underway",
    eta: "10-26 05:00",
    risk: "Low",
    speed: 15.0,
    course: 135,
    dest: "Sydney",
    last_position_lat: -33.80,
    last_position_lon: 151.30,
    type: "Cargo"
  },
  {
    id: "MV-666",
    name: "Bering Scout",
    flag: "RU",
    status: "Underway",
    eta: "11-02 18:00",
    risk: "Low",
    speed: 13.8,
    course: 180,
    dest: "Vladivostok",
    last_position_lat: 60.50,
    last_position_lon: -175.50,
    type: "Cargo"
  },
  {
    id: "MV-777",
    name: "Gulf Sentinel",
    flag: "US",
    status: "Underway",
    eta: "10-24 07:10",
    risk: "Low",
    speed: 12.0,
    course: 180,
    dest: "Houston",
    last_position_lat: 28.50,
    last_position_lon: -90.50,
    type: "Cargo"
  },
  {
    id: "MV-888",
    name: "Red Sea Navigator",
    flag: "EG",
    status: "Underway",
    eta: "10-25 11:20",
    risk: "Low",
    speed: 14.8,
    course: 155,
    dest: "Jeddah",
    last_position_lat: 22.50,
    last_position_lon: 38.50,
    type: "Cargo"
  }
];

export function useAISStream() {
  const [vessels, setVessels] = useState<Record<string, Vessel>>({});
  const [isLive, setIsLive] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<"DISCONNECTED" | "CONNECTING" | "CONNECTED" | "ERROR">("DISCONNECTED");
  const [messageCount, setMessageCount] = useState<number>(0);
  
  const wsRef = useRef<WebSocket | null>(null);
  const simulationTimerRef = useRef<number | null>(null);

  // Initialize with simulated vessels
  useEffect(() => {
    const initialMap: Record<string, Vessel> = {};
    INITIAL_SIMULATED_VESSELS.forEach(v => {
      initialMap[v.id] = v;
    });
    setVessels(initialMap);
  }, []);

  // 1. Simulated Movement Logic (when not live)
  const startSimulation = () => {
    if (simulationTimerRef.current) return;
    
    simulationTimerRef.current = window.setInterval(() => {
      setVessels(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(id => {
          const v = next[id];
          // Only move moving vessels
          if (v.speed > 0) {
            const rad = (v.course * Math.PI) / 180;
            // standard approximation: 1 knot ~ 0.00027 degrees per second
            // let's scale slightly for visual feedback in real-time updates
            const speedFactor = v.speed * 0.00015;
            const dLat = Math.cos(rad) * speedFactor;
            const dLon = Math.sin(rad) * speedFactor;
            
            next[id] = {
              ...v,
              last_position_lat: v.last_position_lat + dLat,
              last_position_lon: v.last_position_lon + dLon
            };
          }
        });
        return next;
      });
    }, 1500);
  };

  const stopSimulation = () => {
    if (simulationTimerRef.current) {
      clearInterval(simulationTimerRef.current);
      simulationTimerRef.current = null;
    }
  };

  // Run simulation if not live
  useEffect(() => {
    if (!isLive) {
      startSimulation();
    } else {
      stopSimulation();
    }
    return () => stopSimulation();
  }, [isLive]);

  // 2. Real-time Live Connection (WebSocket)
  const connectLive = () => {
    if (wsRef.current) return;

    setConnectionStatus("CONNECTING");
    
    try {
      const socket = new WebSocket(AISSTREAM_URL);
      wsRef.current = socket;

      socket.onopen = () => {
        setConnectionStatus("CONNECTED");
        
        // Subscribe to messages inside the specified bounding box
        const subMsg = {
          APIKey: AISSTREAM_API_KEY,
          BoundingBoxes: MUNDRA_BOUNDING_BOX
        };
        
        socket.send(JSON.stringify(subMsg));
        console.log("AISStream WebSocket subscription message sent.");
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setMessageCount(prev => prev + 1);

          const meta = data.MetaData;
          if (!meta || !meta.MMSI) return;

          const mmsiStr = meta.MMSI_String || String(meta.MMSI);
          const type = data.MessageType;

          setVessels(prev => {
            const next = { ...prev };
            
            // Prune oldest keys if they exceed 400 items to avoid DOM lag in global stream
            const keys = Object.keys(next);
            if (keys.length > 400) {
              for (let i = 0; i < 150; i++) {
                delete next[keys[i]];
              }
            }

            const existing = next[mmsiStr] || {
              id: mmsiStr,
              name: meta.ShipName || `MMSI ${mmsiStr}`,
              type: "Cargo",
              flag: "Unknown",
              last_position_lat: meta.latitude || 0,
              last_position_lon: meta.longitude || 0,
              speed: 0,
              course: 0,
              eta: "—",
              status: "Underway",
              dest: "Mundra Port",
              risk: "Low"
            };

            // Update positional data
            let updated = { ...existing };
            updated.last_position_lat = meta.latitude || updated.last_position_lat;
            updated.last_position_lon = meta.longitude || updated.last_position_lon;

            if (type === "PositionReport" && data.Message?.PositionReport) {
              const pos = data.Message.PositionReport;
              updated.speed = pos.Sog ?? updated.speed;
              updated.course = pos.Cog ?? updated.course;
              
              // Calculate dynamic navigation status if numeric status is mapped
              if (pos.NavigationalStatus !== undefined) {
                const statusMap: Record<number, string> = {
                  0: "Underway",
                  1: "Berthed",
                  2: "Anchored",
                  5: "Moored",
                  8: "Inbound"
                };
                updated.status = statusMap[pos.NavigationalStatus] || updated.status;
              }
            } else if (type === "ShipStaticData" && data.Message?.ShipStaticData) {
              const stat = data.Message.ShipStaticData;
              updated.name = stat.Name?.trim() || updated.name;
              updated.type = mapAisTypeToCategory(stat.Type);
              updated.dest = stat.Destination?.trim() || updated.dest;
              
              if (stat.Eta) {
                updated.eta = `${stat.Eta.Month}/${stat.Eta.Day} ${String(stat.Eta.Hour).padStart(2, '0')}:${String(stat.Eta.Minute).padStart(2, '0')}`;
              }
            }

            // Determine Risk dynamically
            const category = mapAisTypeToCategory(data.Message?.ShipStaticData?.Type || 0);
            if (category === "Tanker") {
              updated.risk = "High";
            } else if (updated.speed > 16) {
              updated.risk = "Medium";
            } else {
              updated.risk = "Low";
            }

            next[mmsiStr] = updated;
            return next;
          });
        } catch (err) {
          console.error("Error parsing AISStream payload:", err);
        }
      };

      socket.onerror = (err) => {
        console.error("AISStream WebSocket error:", err);
        setConnectionStatus("ERROR");
      };

      socket.onclose = () => {
        console.log("AISStream WebSocket connection closed.");
        setConnectionStatus("DISCONNECTED");
        wsRef.current = null;
      };
      
    } catch (err) {
      console.error("Failed to connect to AISStream WebSocket:", err);
      setConnectionStatus("ERROR");
      wsRef.current = null;
    }
  };

  const disconnectLive = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setConnectionStatus("DISCONNECTED");
    }
  };

  // Toggle Live/Simulation mode
  const toggleLiveMode = (enableLive: boolean) => {
    setIsLive(enableLive);
    if (enableLive) {
      connectLive();
    } else {
      disconnectLive();
      // Reset vessels to simulated list upon leaving live mode to prevent UI crowding
      const initialMap: Record<string, Vessel> = {};
      INITIAL_SIMULATED_VESSELS.forEach(v => {
        initialMap[v.id] = v;
      });
      setVessels(initialMap);
      setMessageCount(0);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnectLive();
      stopSimulation();
    };
  }, []);

  return {
    vessels: Object.values(vessels),
    isLive,
    connectionStatus,
    messageCount,
    toggleLiveMode
  };
}
