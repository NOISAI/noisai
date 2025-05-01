
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

interface ChartDataPoint {
  month: string;
  amount: number;
  count: number;
}

interface InvestmentChartProps {
  chartData: ChartDataPoint[];
}

export default function InvestmentChart({ chartData }: InvestmentChartProps) {
  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>Investment Trend</CardTitle>
        <CardDescription>Monthly investment visualization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] border border-gray-800 rounded-md bg-gray-950 p-4">
          {chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-2 text-[#22C55E]" />
                <p className="text-gray-400">No investment data available yet</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222', borderColor: '#444' }} 
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']}
                />
                <Legend />
                <Bar dataKey="amount" name="Investment Amount" fill="#22C55E" />
                <Bar dataKey="count" name="Number of Investments" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
