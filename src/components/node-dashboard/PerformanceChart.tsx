
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface PerformanceData {
  name: string;
  energy: number;
  tokens: number;
}

interface PerformanceChartProps {
  title: string;
  data: PerformanceData[];
}

export function PerformanceChart({ title, data }: PerformanceChartProps) {
  return (
    <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 card-enhanced">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">{title}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12} 
              />
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#64748b40"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="energy" 
                stroke="#82ca9d" 
                fillOpacity={1} 
                fill="url(#colorEnergy)" 
              />
              <Area 
                type="monotone" 
                dataKey="tokens" 
                stroke="#9b87f5" 
                fillOpacity={1} 
                fill="url(#colorTokens)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
