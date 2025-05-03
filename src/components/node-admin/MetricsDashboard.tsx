
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLiveStats } from "@/hooks/useLiveStats";
import { formatTokenValue } from "@/utils/statsCalculations";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, WifiHigh, WifiOff } from "lucide-react";

// Mock node location data
const mockNodeLocations = [
  { id: 1, name: "Node-NYC-001", location: "New York, USA", status: "active", lat: 40.7128, lng: -74.0060, lastActive: "2 minutes ago" },
  { id: 2, name: "Node-LON-002", location: "London, UK", status: "active", lat: 51.5074, lng: -0.1278, lastActive: "5 minutes ago" },
  { id: 3, name: "Node-TYO-003", location: "Tokyo, Japan", status: "active", lat: 35.6762, lng: 139.6503, lastActive: "1 minute ago" },
  { id: 4, name: "Node-SYD-004", location: "Sydney, Australia", status: "inactive", lat: -33.8688, lng: 151.2093, lastActive: "3 days ago" },
  { id: 5, name: "Node-PAR-005", location: "Paris, France", status: "active", lat: 48.8566, lng: 2.3522, lastActive: "10 minutes ago" },
  { id: 6, name: "Node-BER-006", location: "Berlin, Germany", status: "active", lat: 52.5200, lng: 13.4050, lastActive: "15 minutes ago" },
  { id: 7, name: "Node-SIN-007", location: "Singapore", status: "inactive", lat: 1.3521, lng: 103.8198, lastActive: "1 day ago" },
  { id: 8, name: "Node-MEX-008", location: "Mexico City, Mexico", status: "active", lat: 19.4326, lng: -99.1332, lastActive: "20 minutes ago" },
];

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
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [viewMode, setViewMode] = useState<"charts" | "map" | "list">("charts");
  const liveStats = useLiveStats();
  
  const activeNodes = mockNodeLocations.filter(node => node.status === "active");
  const inactiveNodes = mockNodeLocations.filter(node => node.status === "inactive");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Performance Metrics</h2>
          <p className="text-gray-400">Monitor your node's performance and activity</p>
        </div>
        <div className="flex space-x-4">
          <Tabs
            defaultValue="charts"
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "charts" | "map" | "list")}
            className="w-[300px]"
          >
            <TabsList className="grid grid-cols-3 bg-gray-800">
              <TabsTrigger value="charts" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">Charts</TabsTrigger>
              <TabsTrigger value="map" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">Map</TabsTrigger>
              <TabsTrigger value="list" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">List</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Tabs
            defaultValue="week"
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as "day" | "week" | "month")}
            className="w-[300px]"
          >
            <TabsList className="grid grid-cols-3 bg-gray-800">
              <TabsTrigger value="day" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">Day</TabsTrigger>
              <TabsTrigger value="week" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">Week</TabsTrigger>
              <TabsTrigger value="month" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Active Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[#22C55E]">{activeNodes.length}</div>
            <p className="text-gray-400 mt-2">Total active nodes in the network</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Network Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[#22C55E]">{liveStats.networkEfficiency}%</div>
            <p className="text-gray-400 mt-2">Average efficiency across all nodes</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Daily Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[#22C55E]">{liveStats.dailyTransactions.toLocaleString()}</div>
            <p className="text-gray-400 mt-2">Transactions processed today</p>
          </CardContent>
        </Card>
      </div>

      {viewMode === "charts" && (
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
      )}

      {viewMode === "map" && (
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
      )}

      {viewMode === "list" && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Nodes List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-gray-800">
                <TableRow>
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Location</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockNodeLocations.map((node) => (
                  <TableRow key={node.id} className="border-b border-gray-700">
                    <TableCell className="font-medium text-white">{node.name}</TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 text-gray-400 mr-1" />
                        {node.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      {node.status === "active" ? (
                        <div className="flex items-center">
                          <WifiHigh className="h-4 w-4 text-[#22C55E] mr-1" />
                          <span className="text-[#22C55E]">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <WifiOff className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-gray-400">Inactive</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-300">{node.lastActive}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
