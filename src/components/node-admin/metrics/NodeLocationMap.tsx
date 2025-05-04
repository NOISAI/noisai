
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WifiHigh, WifiOff } from "lucide-react";
import { NodeLocation } from "./types";
import MapboxMap from "./MapboxMap";

interface NodeLocationMapProps {
  nodes: NodeLocation[];
}

export default function NodeLocationMap({ nodes }: NodeLocationMapProps) {
  const [selectedNode, setSelectedNode] = useState<NodeLocation | null>(null);
  const activeNodes = nodes.filter(node => node.status === "active");
  const inactiveNodes = nodes.filter(node => node.status === "inactive");

  const handleNodeClick = (node: NodeLocation) => {
    setSelectedNode(node);
    console.log("Node clicked:", node);
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Node Locations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Interactive Map */}
        <MapboxMap nodes={nodes} onNodeClick={handleNodeClick} />
        
        {/* Node Status Counts */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
            <WifiHigh className="h-4 w-4 text-[#22C55E] mr-2" />
            <span className="text-sm text-gray-300">{activeNodes.length} active nodes</span>
          </div>
          <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
            <WifiOff className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-300">{inactiveNodes.length} inactive nodes</span>
          </div>
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <div className="mt-4 bg-gray-800 p-4 rounded-md">
            <h3 className="text-white font-medium mb-2">{selectedNode.name}</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-400">Location:</div>
              <div className="text-white">{selectedNode.location}</div>
              
              <div className="text-gray-400">Status:</div>
              <div className={selectedNode.status === "active" ? "text-[#22C55E]" : "text-gray-400"}>
                {selectedNode.status}
              </div>
              
              <div className="text-gray-400">Last Active:</div>
              <div className="text-white">{selectedNode.lastActive}</div>
              
              <div className="text-gray-400">Coordinates:</div>
              <div className="text-white">
                {selectedNode.lat.toFixed(4)}, {selectedNode.lng.toFixed(4)}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
