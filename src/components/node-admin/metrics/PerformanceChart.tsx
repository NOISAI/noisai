
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PerformanceData } from "./types";

interface PerformanceChartProps {
  data: PerformanceData[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">System Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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
  );
}
