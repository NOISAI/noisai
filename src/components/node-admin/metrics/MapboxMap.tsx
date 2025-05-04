
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { NodeLocation } from "./types";

// This would ideally come from environment variables or Supabase
// For demonstration, you'll need to replace with your actual token
const MAPBOX_TOKEN = "pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2xyMTlnbHIyMDV6NjJrcGR1ZzNzZ3ZzcSJ9.HfPe12pFR_ywVUrzKH3aDg";

interface MapboxMapProps {
  nodes: NodeLocation[];
  onNodeClick?: (node: NodeLocation) => void;
}

export default function MapboxMap({ nodes, onNodeClick }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapToken, setMapToken] = useState<string>(MAPBOX_TOKEN);
  const [showTokenInput, setShowTokenInput] = useState<boolean>(mapToken === "");

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Use the token from state (which might be from input field)
    if (!mapToken) return;

    mapboxgl.accessToken = mapToken;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [0, 20],
      zoom: 1.5,
      projection: "globe",
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      "top-right"
    );

    // Add atmosphere and fog effects
    map.current.on("style.load", () => {
      map.current?.setFog({
        color: "rgb(20, 20, 30)",
        "high-color": "rgb(40, 40, 60)",
        "horizon-blend": 0.2,
      });
    });

    return () => {
      // Clean up
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, [mapToken]);

  // Add markers when map is loaded and nodes change
  useEffect(() => {
    if (!map.current || !mapToken) return;

    // Make sure the map is loaded
    if (!map.current.loaded()) {
      map.current.on("load", () => addMarkers());
      return;
    }

    addMarkers();
  }, [nodes, mapToken, map.current]);

  const addMarkers = () => {
    if (!map.current) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    nodes.forEach(node => {
      // Create a DOM element for the marker
      const el = document.createElement("div");
      el.className = "marker";
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";
      el.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
      el.style.cursor = "pointer";
      el.style.backgroundColor = node.status === "active" ? "#22C55E" : "#6b7280";
      
      // Add pulse effect for active nodes
      if (node.status === "active") {
        el.style.animation = "pulse 1.5s infinite";
      }
      
      // Create the popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-bold">${node.name}</h3>
          <p class="text-sm">${node.location}</p>
          <p class="text-xs text-gray-500">Last active: ${node.lastActive}</p>
          <p class="text-xs ${node.status === "active" ? "text-green-500" : "text-gray-500"}">
            Status: ${node.status}
          </p>
        </div>
      `);

      // Create and add the marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([node.lng, node.lat])
        .setPopup(popup)
        .addTo(map.current!);
      
      // Add click event
      el.addEventListener("click", () => {
        if (onNodeClick) {
          onNodeClick(node);
        }
      });

      markers.current.push(marker);
    });
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.getElementById("mapbox-token") as HTMLInputElement;
    if (input && input.value) {
      setMapToken(input.value);
      setShowTokenInput(false);
    }
  };

  // Return the token input form if no token is provided
  if (showTokenInput) {
    return (
      <div className="h-[500px] border border-gray-700 rounded-md flex items-center justify-center p-8">
        <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <h3 className="text-white text-lg font-medium mb-4">Mapbox Token Required</h3>
          <p className="text-gray-400 mb-4">
            To display the map, please enter your Mapbox public token. 
            You can find it in your Mapbox account dashboard.
          </p>
          <form onSubmit={handleTokenSubmit}>
            <input
              id="mapbox-token"
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 mb-4 text-white"
              placeholder="Enter your Mapbox public token"
            />
            <button 
              type="submit" 
              className="bg-[#22C55E] hover:bg-[#1ea853] text-black font-medium py-2 px-4 rounded"
            >
              Load Map
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Map container */}
      <div ref={mapContainer} className="h-[500px] rounded-md overflow-hidden" />
      
      {/* CSS for pulse effect */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }
      `}</style>
    </div>
  );
}
