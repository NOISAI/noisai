
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, WifiHigh, WifiOff } from "lucide-react";
import { NodeLocation } from "./types";

interface NodeLocationMapProps {
  nodes: NodeLocation[];
}

export default function NodeLocationMap({ nodes }: NodeLocationMapProps) {
  const activeNodes = nodes.filter(node => node.status === "active");
  const inactiveNodes = nodes.filter(node => node.status === "inactive");

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Node Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] border border-gray-700 rounded-md p-4 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-[#22C55E]" />
            <p className="mb-2">Node location map would display here</p>
            <p className="text-sm">Integration with a mapping service like Mapbox or Google Maps would show actual node positions</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
            <WifiHigh className="h-4 w-4 text-[#22C55E] mr-2" />
            <span className="text-sm text-gray-300">{activeNodes.length} active nodes</span>
          </div>
          <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
            <WifiOff className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-300">{inactiveNodes.length} inactive nodes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
