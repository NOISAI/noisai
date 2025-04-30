
import { ChartPie, LineChart, Briefcase, PiggyBank } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PortfolioOverview = () => {
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
            <p className="text-3xl font-bold">$125,000</p>
            <p className="text-sm text-gray-400">Across 2 projects</p>
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
            <p className="text-3xl font-bold">$140,625</p>
            <p className="text-sm text-green-500">+12.5% ROI</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-[#22C55E]" />
              Active Deals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
            <p className="text-sm text-gray-400">1 Pending, 1 Active</p>
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
            <p className="text-gray-400">Portfolio visualization coming soon</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">NOISAI Tokens</p>
              <p className="text-xl font-bold">50,000</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">Equity Share</p>
              <p className="text-xl font-bold">0.5%</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">First Investment</p>
              <p className="text-xl font-bold">Jan 15, 2025</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">Investor Status</p>
              <p className="text-xl font-bold text-[#22C55E]">Active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioOverview;
