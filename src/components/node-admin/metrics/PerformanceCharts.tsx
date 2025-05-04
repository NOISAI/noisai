
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

// Mock data for visualizations
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

export default function PerformanceCharts() {
  return (
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
  );
}
