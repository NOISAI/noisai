
import { ChartPie, LineChart, Briefcase, PiggyBank } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { mockInvestments } from "@/data/mockInvestments";
import { convertInvestmentsForInvestor } from "@/utils/typeAdapters";
import { Investment } from "@/types/investment";

const PortfolioOverview = () => {
  const [investmentOpportunities, setInvestmentOpportunities] = useState<Investment[]>([]);
  
  useEffect(() => {
    // Use the same data source and conversion as InvestmentsList
    const investmentsForInvestors = convertInvestmentsForInvestor(mockInvestments);
    setInvestmentOpportunities(investmentsForInvestors);
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PiggyBank className="w-5 h-5 mr-2 text-[#22C55E]" />
              Total Investments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0</p>
            <p className="text-sm text-gray-400">No active investments</p>
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
            <p className="text-3xl font-bold">$0</p>
            <p className="text-sm text-gray-400">0% ROI</p>
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
      
      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle>Investment Summary</CardTitle>
          <CardDescription>Your current investment portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border border-gray-800 rounded-md bg-gray-950 mb-4">
            <div className="text-center">
              <p className="text-gray-400 mb-2">No active investments</p>
              <p className="text-[#22C55E]">
                {investmentOpportunities.length === 1 
                  ? "NOISAI Seed Sale is now open" 
                  : `${investmentOpportunities.length} NOISAI investment opportunities available`}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">NOISAI Tokens</p>
              <p className="text-xl font-bold">0</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">Equity Share</p>
              <p className="text-xl font-bold">0%</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">Investment Status</p>
              <p className="text-xl font-bold text-gray-400">None</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">Investor Status</p>
              <p className="text-xl font-bold text-gray-400">Not Active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioOverview;
