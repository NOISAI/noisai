
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, User, Battery, Leaf, Coins } from "lucide-react";
import { NodeEvent } from "../types/NodeEvent";

interface EventsTableProps {
  events: NodeEvent[];
  selectedEvent: number | null;
  onSelectEvent: (eventId: number | null) => void;
}

export default function EventsTable({ events, selectedEvent, onSelectEvent }: EventsTableProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Node Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase text-gray-400">
              <tr>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Nodes (Active/Total)</th>
                <th className="px-4 py-3">Tokens Generated</th>
                <th className="px-4 py-3">Tokens Claimed</th>
                <th className="px-4 py-3">Energy (kWh)</th>
                <th className="px-4 py-3">Carbon Offset (kg)</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr 
                  key={event.id} 
                  className={`border-b border-gray-800 ${selectedEvent === event.id ? 'bg-gray-800' : ''} hover:bg-gray-800`}
                  onClick={() => onSelectEvent(selectedEvent === event.id ? null : event.id)}
                >
                  <td className="px-4 py-3 font-medium text-white">{event.name}</td>
                  <td className="px-4 py-3 text-gray-300 flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-[#22C55E]" /> 
                    {event.location}
                  </td>
                  <td className="px-4 py-3 text-gray-300 flex items-center">
                    <User className="h-3 w-3 mr-1 text-blue-400" />
                    {event.userName}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[#22C55E]">{event.activeNodes}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-300">{event.totalNodes}</span>
                    {event.inactiveNodes > 0 && (
                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-red-900/30 text-red-400">
                        {event.inactiveNodes} offline
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-yellow-300">
                    <div className="flex items-center">
                      <Coins className="h-3 w-3 mr-1" />
                      {event.tokensGenerated}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-blue-300">
                    {event.tokensClaimed}
                    <span className="text-gray-500 ml-1">
                      ({Math.round(event.tokensClaimed / event.tokensGenerated * 100)}%)
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300 flex items-center">
                    <Battery className="h-3 w-3 mr-1 text-[#22C55E]" />
                    {event.energyGenerated.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 text-gray-300 flex items-center">
                    <Leaf className="h-3 w-3 mr-1 text-[#22C55E]" />
                    {event.carbonOffset.toFixed(1)}
                  </td>
                  <td className="px-4 py-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-gray-700 text-gray-300 hover:border-[#22C55E] hover:text-[#22C55E]"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
