
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, DollarSign } from "lucide-react";
import { Investment } from "@/types/admin";
import { formatCurrency, formatDate } from "@/utils/adminUtils";
import LoadingIndicator from "../shared/LoadingIndicator";
import EmptyState from "../shared/EmptyState";

interface InvestmentTableProps {
  investments: Investment[];
  loading: boolean;
  searchQuery: string;
  onEdit: (investment: Investment) => void;
  onDelete: (investment: Investment) => void;
}

export default function InvestmentTable({
  investments,
  loading,
  searchQuery,
  onEdit,
  onDelete
}: InvestmentTableProps) {
  if (loading) {
    return <LoadingIndicator message="Loading investments..." />;
  }

  if (investments.length === 0) {
    return <EmptyState 
      type="investments" 
      isSearching={!!searchQuery}
      searchQuery={searchQuery}
    />;
  }

  return (
    <div className="rounded-md border border-gray-800">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-800 hover:bg-gray-800">
            <TableHead className="text-gray-300">Investor</TableHead>
            <TableHead className="text-gray-300">Amount</TableHead>
            <TableHead className="text-gray-300">Date</TableHead>
            <TableHead className="text-gray-300">Investment Type</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment) => (
            <TableRow key={investment.id} className="bg-gray-900 hover:bg-gray-800">
              <TableCell>{investment.investor_name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-[#22C55E]" />
                  {formatCurrency(investment.amount)}
                </div>
              </TableCell>
              <TableCell>{formatDate(investment.date)}</TableCell>
              <TableCell>{investment.type}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  investment.status === "Completed" 
                    ? "bg-green-900 text-green-300" 
                    : investment.status === "Processing"
                    ? "bg-yellow-900 text-yellow-300"
                    : "bg-red-900 text-red-300"
                }`}>
                  {investment.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0 mr-1"
                  onClick={() => onEdit(investment)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-red-500"
                  onClick={() => onDelete(investment)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
