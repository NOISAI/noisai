
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, Calendar, BarChart, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/utils/adminUtils";

interface InvestmentStatsProps {
  totalInvestment: number;
  recentInvestments: number;
  averageInvestment: number;
}

export default function InvestmentStats({
  totalInvestment,
  recentInvestments,
  averageInvestment
}: InvestmentStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Total Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-[#22C55E]" />
              <span className="text-2xl font-bold">
                {formatCurrency(totalInvestment)}
              </span>
            </div>
            <span className="flex items-center text-xs text-[#22C55E]">
              <ArrowUpRight className="h-3 w-3 mr-1" /> 12.5%
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Recent Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-[#22C55E]" />
              <span className="text-2xl font-bold">{recentInvestments} this month</span>
            </div>
            <span className="flex items-center text-xs text-[#22C55E]">
              <ArrowUpRight className="h-3 w-3 mr-1" /> 50%
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Average Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart className="h-4 w-4 text-[#22C55E]" />
              <span className="text-2xl font-bold">
                {formatCurrency(averageInvestment)}
              </span>
            </div>
            <span className="flex items-center text-xs text-[#22C55E]">
              <ArrowUpRight className="h-3 w-3 mr-1" /> 5.3%
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
