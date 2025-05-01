
import { Users, Phone, TrendingUp, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Investor } from "@/types/admin";

interface DashboardStatsProps {
  investors: Investor[];
  interactionsCount: number;
  totalInvestment: number;
  reportsCount: number;
}

export default function DashboardStats({ 
  investors, 
  interactionsCount, 
  totalInvestment, 
  reportsCount 
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gray-900 border border-gray-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Investors</p>
              <h3 className="text-2xl font-bold">{investors.length}</h3>
            </div>
            <div className="p-2 bg-[#22C55E]/10 rounded-full">
              <Users className="w-5 h-5 text-[#22C55E]" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border border-gray-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Recent Interactions</p>
              <h3 className="text-2xl font-bold">{interactionsCount}</h3>
            </div>
            <div className="p-2 bg-[#22C55E]/10 rounded-full">
              <Phone className="w-5 h-5 text-[#22C55E]" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border border-gray-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Investments</p>
              <h3 className="text-2xl font-bold">${totalInvestment.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-[#22C55E]/10 rounded-full">
              <TrendingUp className="w-5 h-5 text-[#22C55E]" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border border-gray-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Generated Reports</p>
              <h3 className="text-2xl font-bold">{reportsCount}</h3>
            </div>
            <div className="p-2 bg-[#22C55E]/10 rounded-full">
              <FileText className="w-5 h-5 text-[#22C55E]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
