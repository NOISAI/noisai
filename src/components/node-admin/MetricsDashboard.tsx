
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, User, Battery, Leaf, Coins } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useLiveStats } from "@/hooks/useLiveStats";
import { formatTokenValue } from "@/utils/statsCalculations";
import NodeLocationMap, { NodeEvent } from "./NodeLocationMap";

// Mock data for node events with location information
const nodeEvents: NodeEvent[] = [
  {
    id: 1,
    name: "City Coffee Amsterdam",
    location: "Amsterdam, Netherlands",
    coordinates: [4.9041, 52.3676], // [longitude, latitude] - explicit tuple
    totalNodes: 3,
    activeNodes: 3,
    inactiveNodes: 0,
    avgNoiseLevel: 78,
    userId: "user-123",
    userName: "Sarah Johnson",
    tokensGenerated: 1240,
    tokensClaimed: 980,
    energyGenerated: 15.6,
    carbonOffset: 7.8
  },
  {
    id: 2,
    name: "Tomorrowland Festival",
    location: "Boom, Belgium",
    coordinates: [4.3667, 51.0833],
    totalNodes: 8,
    activeNodes: 5,
    inactiveNodes: 3,
    avgNoiseLevel: 92,
    userId: "user-456",
    userName: "Michael Chen",
    tokensGenerated: 4280,
    tokensClaimed: 3100,
    energyGenerated: 48.2,
    carbonOffset: 22.5
  },
  {
    id: 3,
    name: "Downtown Mall Berlin",
    location: "Berlin, Germany",
    coordinates: [13.3833, 52.5167],
    totalNodes: 4,
    activeNodes: 2,
    inactiveNodes: 2,
    avgNoiseLevel: 81,
    userId: "user-789",
    userName: "Emma Schmidt",
    tokensGenerated: 1860,
    tokensClaimed: 1200,
    energyGenerated: 22.4,
    carbonOffset: 10.2
  },
  {
    id: 4,
    name: "Paris Music Center",
    location: "Paris, France",
    coordinates: [2.3522, 48.8566],
    totalNodes: 5,
    activeNodes: 4,
    inactiveNodes: 1,
    avgNoiseLevel: 85,
    userId: "user-101",
    userName: "Antoine Dupont",
    tokensGenerated: 2650,
    tokensClaimed: 1950,
    energyGenerated: 31.8,
    carbonOffset: 14.7
  }
];

// Calculate totals for the metrics
const totalTokensGenerated = nodeEvents.reduce((sum, event) => sum + event.tokensGenerated, 0);
const totalTokensClaimed = nodeEvents.reduce((sum, event) => sum + event.tokensClaimed, 0);
const totalEnergyGenerated = nodeEvents.reduce((sum, event) => sum + event.energyGenerated, 0);
const totalCarbonOffset = nodeEvents.reduce((sum, event) => sum + event.carbonOffset, 0);

const mockNodeMetrics = [
  { name: 'Monday', count: 120, uptime: 98 },
  { name: 'Tuesday', count: 145, uptime: 99 },
  { name: 'Wednesday', count: 132, uptime: 97 },
  { name: 'Thursday', count: 178, uptime: 100 },
  { name: 'Friday', count: 156, uptime: 98 },
  { name: 'Saturday', count: 95, uptime: 96 },
  { name: 'Sunday', count: 87, uptime: 95 },
];

const mockPerformanceData = [
  { name: 'Morning', cpu: 45, memory: 32, network: 65 },
  { name: 'Noon', cpu: 78, memory: 56, network: 72 },
  { name: 'Evening', cpu: 65, memory: 48, network: 58 },
  { name: 'Night', cpu: 39, memory: 30, network: 42 },
];

export default function MetricsDashboard() {
  const liveStats = useLiveStats();
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/node-admin" className="mr-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white">Performance Metrics</h2>
            <p className="text-gray-400">Monitor your node's performance and activity</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Active Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[#22C55E]">{liveStats.activeNodes}</div>
            <p className="text-gray-400 mt-2">Total active nodes in the network</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Tokens Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[#22C55E]">{formatTokenValue(totalTokensGenerated)}</div>
            <p className="text-gray-400 mt-2">Claimed: {formatTokenValue(totalTokensClaimed)}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Energy Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[#22C55E]">{totalEnergyGenerated.toFixed(1)} kWh</div>
            <p className="text-gray-400 mt-2">Across all active nodes</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Carbon Offset</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[#22C55E]">{totalCarbonOffset.toFixed(1)} kg</div>
            <p className="text-gray-400 mt-2">Environmental impact</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Node Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] mb-6">
              <NodeLocationMap events={nodeEvents} selectedEvent={selectedEvent} onSelectEvent={setSelectedEvent} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
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
                  {nodeEvents.map((event) => (
                    <tr 
                      key={event.id} 
                      className={`border-b border-gray-800 ${selectedEvent === event.id ? 'bg-gray-800' : ''} hover:bg-gray-800`}
                      onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Node Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockNodeMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-gray-700 bg-gray-900 p-2 shadow-md">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="font-medium text-gray-300">Count:</div>
                              <div className="text-right font-medium text-[#22C55E]">
                                {payload[0].value}
                              </div>
                              <div className="font-medium text-gray-300">Uptime:</div>
                              <div className="text-right font-medium text-[#22C55E]">
                                {payload[1].value}%
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#22C55E" name="Node Count" />
                  <Bar dataKey="uptime" fill="#4ADE80" name="Uptime %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-gray-700 bg-gray-900 p-2 shadow-md">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="font-medium text-gray-300">CPU:</div>
                              <div className="text-right font-medium text-[#22C55E]">
                                {payload[0].value}%
                              </div>
                              <div className="font-medium text-gray-300">Memory:</div>
                              <div className="text-right font-medium text-[#22C55E]">
                                {payload[1].value}%
                              </div>
                              <div className="font-medium text-gray-300">Network:</div>
                              <div className="text-right font-medium text-[#22C55E]">
                                {payload[2].value}%
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="cpu" fill="#22C55E" name="CPU Usage %" />
                  <Bar dataKey="memory" fill="#4ADE80" name="Memory Usage %" />
                  <Bar dataKey="network" fill="#86EFAC" name="Network Usage %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
