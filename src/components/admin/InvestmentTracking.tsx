
import { 
  BarChart, Calendar, DollarSign, TrendingUp, ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";

// Mock data for investments
const mockInvestmentsData = [
  { id: 1, investor: "John Doe", amount: "$50,000", date: "2025-03-15", type: "Seed Round", status: "Completed" },
  { id: 2, investor: "Jane Smith", amount: "$35,000", date: "2025-03-20", type: "Seed Round", status: "Completed" },
  { id: 3, investor: "Emily Brown", amount: "$25,000", date: "2025-04-05", type: "Seed Round", status: "Processing" },
  { id: 4, investor: "David Wilson", amount: "$14,500", date: "2025-04-12", type: "Seed Round", status: "Processing" },
];

const InvestmentTracking = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Investment Tracking</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-[#22C55E]" />
                <span className="text-2xl font-bold">$124,500</span>
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
                <span className="text-2xl font-bold">2 this month</span>
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
                <span className="text-2xl font-bold">$31,125</span>
              </div>
              <span className="flex items-center text-xs text-[#22C55E]">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 5.3%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle>Recent Investments</CardTitle>
          <CardDescription>Track all investment activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800 hover:bg-gray-800">
                  <TableHead className="text-gray-300">Investor</TableHead>
                  <TableHead className="text-gray-300">Amount</TableHead>
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Investment Type</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvestmentsData.map((investment) => (
                  <TableRow key={investment.id} className="bg-gray-900 hover:bg-gray-800">
                    <TableCell>{investment.investor}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-[#22C55E]" />
                        {investment.amount}
                      </div>
                    </TableCell>
                    <TableCell>{investment.date}</TableCell>
                    <TableCell>{investment.type}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        investment.status === "Completed" 
                          ? "bg-green-900 text-green-300" 
                          : "bg-yellow-900 text-yellow-300"
                      }`}>
                        {investment.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle>Investment Trend</CardTitle>
          <CardDescription>Monthly investment visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border border-gray-800 rounded-md bg-gray-950">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 text-[#22C55E]" />
              <p className="text-gray-400">Investment trend visualization would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentTracking;
