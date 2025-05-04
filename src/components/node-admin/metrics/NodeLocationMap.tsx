
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WifiHigh, WifiOff, MapPin, Activity } from "lucide-react";
import { NodeEvent, NodeLocation } from "./types";
import MapboxMap from "./MapboxMap";

interface NodeLocationMapProps {
  nodes: NodeLocation[];
  isAdminView?: boolean;
}

export default function NodeLocationMap({ nodes, isAdminView = true }: NodeLocationMapProps) {
  const [selectedNode, setSelectedNode] = useState<NodeLocation | null>(null);
  const activeNodes = nodes.filter(node => node.status === "active");
  const inactiveNodes = nodes.filter(node => node.status === "inactive");

  const handleNodeClick = (node: NodeLocation) => {
    setSelectedNode(node);
    console.log("Node clicked:", node);
  };

  const formatDate = (dateString: string) => {
    // If it contains "ago", it's already formatted
    if (dateString.includes("ago")) return dateString;
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">
          Node Locations
          {isAdminView && <span className="ml-2 text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded-full">Admin View</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Node Status Counts */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
            <WifiHigh className="h-4 w-4 text-[#22C55E] mr-2" />
            <span className="text-sm text-gray-300">{activeNodes.length} active nodes</span>
          </div>
          <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
            <WifiOff className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-300">{inactiveNodes.length} inactive nodes</span>
          </div>
        </div>
        
        {/* Interactive Map */}
        <MapboxMap 
          nodes={nodes} 
          onNodeClick={handleNodeClick} 
          adminView={isAdminView}
        />

        {/* Selected Node Details */}
        {selectedNode && (
          <div className="mt-4 bg-gray-800 p-4 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-medium">{selectedNode.name}</h3>
              <div className={`px-2 py-1 rounded text-xs ${
                selectedNode.status === "active" 
                  ? "bg-green-900 text-green-300" 
                  : "bg-gray-700 text-gray-400"
              }`}>
                {selectedNode.status}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div className="text-gray-400">Location:</div>
              <div className="text-white flex items-center">
                <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                {selectedNode.location}
              </div>
              
              <div className="text-gray-400">Last Active:</div>
              <div className="text-white">
                {formatDate(selectedNode.lastActive)}
              </div>
              
              <div className="text-gray-400">Coordinates:</div>
              <div className="text-white">
                {selectedNode.lat.toFixed(4)}, {selectedNode.lng.toFixed(4)}
              </div>
            </div>

            {/* Node Events */}
            {selectedNode.events && selectedNode.events.length > 0 && (
              <div>
                <h4 className="text-gray-300 text-sm font-medium mb-2 flex items-center">
                  <Activity className="h-4 w-4 mr-1" />
                  Recent Events
                </h4>
                <div className="bg-gray-900 rounded-md overflow-hidden">
                  {selectedNode.events.map((event) => (
                    <NodeEventItem key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface NodeEventItemProps {
  event: NodeEvent;
}

function NodeEventItem({ event }: NodeEventItemProps) {
  // Set color based on event type
  let typeColor = "bg-gray-700";
  switch (event.type) {
    case "connection": 
      typeColor = "bg-blue-800 text-blue-300"; 
      break;
    case "error": 
      typeColor = "bg-red-900 text-red-300"; 
      break;
    case "restart": 
      typeColor = "bg-yellow-900 text-yellow-300"; 
      break;
    case "update": 
      typeColor = "bg-indigo-900 text-indigo-300"; 
      break;
  }

  // Format timestamp
  const timestamp = new Date(event.timestamp);
  const formattedTime = timestamp.toLocaleTimeString();
  const formattedDate = timestamp.toLocaleDateString();

  return (
    <div className="p-3 border-b border-gray-800 last:border-b-0">
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs rounded px-2 py-0.5 ${typeColor}`}>
          {event.type}
        </span>
        <span className="text-xs text-gray-500">
          {formattedDate} {formattedTime}
        </span>
      </div>
      <p className="text-sm text-gray-300">{event.description}</p>
    </div>
  );
}
