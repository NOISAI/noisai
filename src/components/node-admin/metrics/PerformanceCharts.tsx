
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LineChart, Line } from "recharts";
import { Activity, Gauge, Zap } from "lucide-react";

// Enhanced mock data for visualizations
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
  { name: '00:00', cpu: 45, memory: 32, network: 65 },
  { name: '04:00', cpu: 38, memory: 28, network: 52 },
  { name: '08:00', cpu: 65, memory: 48, network: 58 },
  { name: '12:00', cpu: 78, memory: 56, network: 72 },
  { name: '16:00', cpu: 82, memory: 62, network: 78 },
  { name: '20:00', cpu: 54, memory: 42, network: 61 },
  { name: '23:59', cpu: 39, memory: 30, network: 42 },
];

const energyGenerationData = [
  { name: 'Jan', value: 24 },
  { name: 'Feb', value: 28 },
  { name: 'Mar', value: 32 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 48 },
  { name: 'Jun', value: 56 },
  { name: 'Jul', value: 64 },
  { name: 'Aug', value: 58 },
  { name: 'Sep', value: 50 },
  { name: 'Oct', value: 44 },
  { name: 'Nov', value: 36 },
  { name: 'Dec', value: 30 },
];

export default function PerformanceCharts() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center">
        <Activity className="mr-2 h-5 w-5" />
        Performance & Activity Metrics
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Node Activity Chart */}
        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
          <CardHeader className="border-b border-gray-800 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Gauge className="mr-2 h-5 w-5 text-[#22C55E]" />
                Node Activity
              </CardTitle>
              <div className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-400">Last 7 days</div>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="h-[320px]">
              <ChartContainer 
                config={{
                  count: { theme: { light: "#22C55E", dark: "#22C55E" }},
                  uptime: { theme: { light: "#4ADE80", dark: "#4ADE80" }}
                }}
              >
                <BarChart data={mockNodeMetrics}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4ADE80" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF" 
                    tickLine={false}
                    axisLine={{ stroke: '#4B5563' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    tickLine={false}
                    axisLine={{ stroke: '#4B5563' }}
                    tickFormatter={(value) => `${value}`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: "10px" }} 
                    iconType="circle"
                  />
                  <Bar 
                    dataKey="count" 
                    fill="url(#colorCount)" 
                    radius={[4, 4, 0, 0]}
                    name="Node Count" 
                    barSize={24}
                  />
                  <Bar 
                    dataKey="uptime" 
                    fill="url(#colorUptime)" 
                    radius={[4, 4, 0, 0]}
                    name="Uptime %" 
                    barSize={24}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* System Performance Chart */}
        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
          <CardHeader className="border-b border-gray-800 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Zap className="mr-2 h-5 w-5 text-[#22C55E]" />
                System Performance
              </CardTitle>
              <div className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-400">24-hour metrics</div>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="h-[320px]">
              <ChartContainer 
                config={{
                  cpu: { theme: { light: "#22C55E", dark: "#22C55E" }},
                  memory: { theme: { light: "#4ADE80", dark: "#4ADE80" }},
                  network: { theme: { light: "#86EFAC", dark: "#86EFAC" }}
                }}
              >
                <LineChart data={mockPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF" 
                    tickLine={false}
                    axisLine={{ stroke: '#4B5563' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tickLine={false}
                    axisLine={{ stroke: '#4B5563' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: "10px" }} 
                    iconType="line"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cpu" 
                    stroke="#22C55E" 
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#22C55E", stroke: "#22C55E" }}
                    activeDot={{ r: 5, stroke: "#22C55E", strokeWidth: 2 }}
                    name="CPU Usage %"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="memory" 
                    stroke="#4ADE80" 
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#4ADE80", stroke: "#4ADE80" }}
                    activeDot={{ r: 5, stroke: "#4ADE80", strokeWidth: 2 }}
                    name="Memory Usage %"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="network" 
                    stroke="#86EFAC" 
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#86EFAC", stroke: "#86EFAC" }}
                    activeDot={{ r: 5, stroke: "#86EFAC", strokeWidth: 2 }}
                    name="Network Usage %"
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Energy Generation Chart */}
        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 lg:col-span-2">
          <CardHeader className="border-b border-gray-800 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Zap className="mr-2 h-5 w-5 text-[#22C55E]" />
                Energy Generation Overview
              </CardTitle>
              <div className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-400">Annual metrics</div>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="h-[280px]">
              <ChartContainer 
                config={{
                  value: { theme: { light: "#22C55E", dark: "#22C55E" }}
                }}
              >
                <BarChart data={energyGenerationData}>
                  <defs>
                    <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF" 
                    tickLine={false}
                    axisLine={{ stroke: '#4B5563' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    tickLine={false}
                    axisLine={{ stroke: '#4B5563' }}
                    tickFormatter={(value) => `${value} kWh`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="value" 
                    fill="url(#colorEnergy)" 
                    name="Energy (kWh)" 
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
