
import { Clock, DollarSign } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Investment } from "@/types/investment";

interface InvestmentTableProps {
  investments: Investment[];
  onInvestClick: (investment: Investment) => void;
}

const InvestmentTable = ({ investments, onInvestClick }: InvestmentTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-800">
          <TableHead className="text-gray-400">Name</TableHead>
          <TableHead className="text-gray-400">Status</TableHead>
          <TableHead className="text-gray-400">Progress</TableHead>
          <TableHead className="text-gray-400">End Date</TableHead>
          <TableHead className="text-gray-400">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investments.map(investment => (
          <TableRow key={investment.id} className="border-gray-800">
            <TableCell className="font-medium">
              <div className="flex flex-col">
                <span>{investment.name}</span>
                <span className="text-xs text-gray-400">Target: ${investment.target.toLocaleString()}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                <span className="text-yellow-500">
                  Running
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="w-full space-y-1">
                <Progress 
                  value={(investment.raised / investment.target) * 100} 
                  className="h-2 bg-gray-800" 
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>${investment.raised.toLocaleString()} raised</span>
                  <span>{Math.round((investment.raised / investment.target) * 100)}%</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{investment.endDate}</TableCell>
            <TableCell>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-[#22C55E] border-gray-800 hover:bg-gray-800"
                onClick={() => onInvestClick(investment)}
              >
                <DollarSign className="w-4 h-4 mr-1" />
                Invest Now
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InvestmentTable;
