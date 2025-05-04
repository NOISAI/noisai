
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface InvestmentSummaryProps {
  userInvestments: any[];
  portfolioStats: {
    totalInvested: number;
    pendingApproval: number;
    totalTokens: number;
    investmentCount: number;
  };
  investmentOpportunities: number;
}

const InvestmentSummary = ({ userInvestments, portfolioStats, investmentOpportunities }: InvestmentSummaryProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Investment Summary</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userInvestments.length > 0 ? (
          userInvestments.map(investment => (
            <Card key={investment.id} className="bg-gray-900 border-gray-800 overflow-hidden">
              <CardHeader className="bg-gray-800 pb-2">
                <CardTitle className="flex items-center text-base">
                  <PiggyBank className="h-5 w-5 text-[#22C55E] mr-2" />
                  {investment.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="font-medium">${investment.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token Allocation:</span>
                    <span className="font-medium">{investment.tokens.toLocaleString()} NOISAI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`font-medium ${investment.status === 'Confirmed' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {investment.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-1 sm:col-span-3 bg-gray-900 border-gray-800">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="rounded-full bg-gray-800 p-3 mb-4">
                <PiggyBank className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Investments Yet</h3>
              <p className="text-gray-400 text-center mb-4 max-w-md">
                You haven't made any investments yet. Start your investment journey with NOISAI today.
              </p>
              <Link to="/investments">
                <Button className="bg-[#22C55E] hover:bg-[#1ea853]">
                  View Investment Opportunities
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
      
      {userInvestments.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-900 border border-gray-800 rounded-lg">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">You have {investmentOpportunities} new investment opportunities</h3>
            <p className="text-sm text-gray-400">
              Explore new ways to grow your NOISAI portfolio
            </p>
          </div>
          <Link to="/investments">
            <Button className="w-full sm:w-auto bg-[#22C55E] hover:bg-[#1ea853]">
              View All Opportunities
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default InvestmentSummary;
