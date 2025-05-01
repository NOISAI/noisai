
import { ChartPie, LineChart, Briefcase } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Investment } from "@/types/investment";

interface InvestmentMetricsProps {
  totalInvested: number;
  currentValue: number;
  roi: number;
  investmentCount: number;
  investmentOpportunities: Investment[];
}

const InvestmentMetrics = ({
  totalInvested,
  currentValue,
  roi,
  investmentCount,
  investmentOpportunities,
}: InvestmentMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PiggyBank className="w-5 h-5 mr-2 text-[#22C55E]" />
            Total Investments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${totalInvested.toLocaleString()}</p>
          <p className="text-sm text-gray-400">
            {investmentCount === 0 ? "No active investments" : 
              `${investmentCount} ${investmentCount === 1 ? 'investment' : 'investments'}`}
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="w-5 h-5 mr-2 text-[#22C55E]" />
            Current Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${currentValue.toLocaleString()}</p>
          <p className="text-sm text-gray-400">
            {roi > 0 ? `+${roi.toFixed(1)}% ROI` : `${roi.toFixed(1)}% ROI`}
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-[#22C55E]" />
            Investment Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{investmentOpportunities.length}</p>
          <p className="text-sm text-yellow-500">
            {investmentOpportunities.length === 1 
              ? "Seed Sale Running" 
              : `${investmentOpportunities.length} Investments Running`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentMetrics;
