
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { NodeLocation } from "./types";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

// This token is invalid or expired, so we'll need user input
const MAPBOX_TOKEN = "";

interface MapboxMapProps {
  nodes: NodeLocation[];
  onNodeClick?: (node: NodeLocation) => void;
  highlightActive?: boolean;
}

export default function MapboxMap({ nodes, onNodeClick, highlightActive = true }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapToken, setMapToken] = useState<string>(MAPBOX_TOKEN);
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);
  const [mapError, setMapError] = useState<string>("");

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Use the token from state (which might be from input field)
    if (!mapToken) return;

    // Clear any previous error
    setMapError("");

    try {
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

      // Handle errors when loading the map
      map.current.on("error", (e) => {
        console.error("Mapbox error:", e);
        setMapError("There was an error loading the map. Please check your token and try again.");
        setShowTokenInput(true);
      });

      return () => {
        // Clean up
        markers.current.forEach(marker => marker.remove());
        map.current?.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Failed to initialize map. Please check your token and try again.");
      setShowTokenInput(true);
    }
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
  }, [nodes, mapToken, map.current, highlightActive]);

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
      
      // Set color based on node status
      if (node.status === "active") {
        el.style.backgroundColor = "#22C55E"; // Green for active
        // Add pulse effect for active nodes if highlighting is enabled
        if (highlightActive) {
          el.style.animation = "pulse 1.5s infinite";
        }
      } else {
        el.style.backgroundColor = "#6b7280"; // Gray for inactive
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
          ${node.events && node.events.length > 0 ? 
            `<p class="text-xs mt-1">Recent events: ${node.events.length}</p>` : 
            ''}
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

  const handleResetToken = () => {
    setShowTokenInput(true);
    setMapToken("");
  };

  // Return the token input form if needed
  if (showTokenInput) {
    return (
      <div className="h-[500px] border border-gray-700 rounded-md flex items-center justify-center p-8">
        <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <h3 className="text-white text-lg font-medium mb-4">Mapbox Token Required</h3>
          
          {mapError && (
            <div className="bg-red-900/30 border border-red-800 text-red-300 p-3 rounded mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{mapError}</p>
            </div>
          )}
          
          <p className="text-gray-400 mb-4">
            To display the map, please enter your Mapbox public token. 
            You can get a free token at <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">mapbox.com</a>.
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
      
      {/* Button to reset token */}
      <button 
        onClick={handleResetToken}
        className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-white text-xs py-1 px-2 rounded"
      >
        Change API Token
      </button>
      
      {/* CSS for pulse effect */}
      <style>
        {`
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
        `}
      </style>
    </div>
  );
}
