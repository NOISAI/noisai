
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Investment {
  id: string;
  name: string;
  amount: number;
  tokenAmount: number;
  date: string;
  status: "pending" | "approved" | "completed";
  txHash: string;
}

interface PortfolioStats {
  totalInvested: number;
  pendingApproval: number;
  totalTokens: number;
  investmentCount: number;
}

interface InvestmentSummaryProps {
  userInvestments: Investment[];
  portfolioStats: PortfolioStats;
  investmentOpportunities: number;
}

const InvestmentSummary = ({
  userInvestments,
  portfolioStats,
  investmentOpportunities,
}: InvestmentSummaryProps) => {
  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>Investment Summary</CardTitle>
        <CardDescription>Your current investment portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        {userInvestments.length > 0 ? (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-gray-800">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-400">Investment</th>
                    <th className="text-left py-3 px-4 text-gray-400">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-400">ETH</th>
                    <th className="text-left py-3 px-4 text-gray-400">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userInvestments.map((inv) => (
                    <tr key={inv.id} className="border-b border-gray-800">
                      <td className="py-3 px-4">{inv.name}</td>
                      <td className="py-3 px-4">${inv.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">{inv.tokenAmount.toFixed(6)}</td>
                      <td className="py-3 px-4">{new Date(inv.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                          inv.status === "approved" 
                            ? "bg-green-900/30 text-green-500"
                            : inv.status === "completed" 
                              ? "bg-blue-900/30 text-blue-500"
                              : "bg-yellow-900/30 text-yellow-500"
                        }`}>
                          {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center border border-gray-800 rounded-md bg-gray-950 mb-4">
            <div className="text-center">
              <p className="text-gray-400 mb-2">No active investments</p>
              <p className="text-[#22C55E]">
                {investmentOpportunities === 1 
                  ? "NOISAI Seed Sale is now open" 
                  : `${investmentOpportunities} NOISAI investment opportunities available`}
              </p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-800 p-4 rounded-md">
            <p className="text-sm text-gray-400">NOISAI Tokens</p>
            <p className="text-xl font-bold">{portfolioStats.totalTokens.toFixed(6)}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md">
            <p className="text-sm text-gray-400">Equity Share</p>
            <p className="text-xl font-bold">
              {portfolioStats.totalInvested > 0 ? `${(portfolioStats.totalInvested / 1000000 * 100).toFixed(4)}%` : '0%'}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md">
            <p className="text-sm text-gray-400">Investment Status</p>
            <p className="text-xl font-bold">
              {portfolioStats.investmentCount > 0 
                ? portfolioStats.pendingApproval > 0 
                  ? "Pending" 
                  : "Active" 
                : "None"}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md">
            <p className="text-sm text-gray-400">Investor Status</p>
            <p className="text-xl font-bold">
              {portfolioStats.totalInvested > 0 ? "Active" : "Not Active"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentSummary;
