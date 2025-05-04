
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { NodeEvent } from "./types/NodeEvent";

interface NodeLocationMapProps {
  events: NodeEvent[];
  selectedEvent: number | null;
  onSelectEvent: (eventId: number | null) => void;
}

const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNsa3g2OWN0dTBjcmQzbHFoMDliYnB2dzAifQ.AkBphkTrR2KyLzxfnThbaw";

export default function NodeLocationMap({ events, selectedEvent, onSelectEvent }: NodeLocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{[key: number]: mapboxgl.Marker}>({});

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [10, 51], // Centered on Europe
      zoom: 3.5,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      "top-right"
    );

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Add/update markers when events or selected event changes
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};
    
    // Add markers for each event
    events.forEach(event => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'flex flex-col items-center';
      
      const markerPin = document.createElement('div');
      markerPin.className = `w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
        selectedEvent === event.id 
          ? 'w-7 h-7 bg-white' 
          : (event.inactiveNodes > 0 ? 'bg-amber-500' : 'bg-[#22C55E]')
      }`;
      
      const markerLabel = document.createElement('div');
      markerLabel.className = `text-xs font-bold mt-1 px-1 py-0.5 rounded bg-gray-800/80 text-white whitespace-nowrap transition-all duration-300 ${
        selectedEvent === event.id ? 'scale-100' : 'scale-0'
      }`;
      markerLabel.textContent = `${event.name} (${event.activeNodes}/${event.totalNodes})`;
      
      el.appendChild(markerPin);
      el.appendChild(markerLabel);
      
      // Create and add the marker
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat(event.coordinates)
        .addTo(map.current!);
      
      // Add click handler
      el.addEventListener('click', () => {
        onSelectEvent(selectedEvent === event.id ? null : event.id);
      });
      
      // Store marker reference for later removal
      markers.current[event.id] = marker;
    });
    
    // If an event is selected, fly to it
    if (selectedEvent) {
      const event = events.find(e => e.id === selectedEvent);
      if (event) {
        map.current.flyTo({
          center: event.coordinates,
          zoom: 6,
          duration: 1500
        });
      }
    }
  }, [events, selectedEvent, onSelectEvent]);

  return <div ref={mapContainer} className="h-full w-full rounded-md overflow-hidden" />;
}
