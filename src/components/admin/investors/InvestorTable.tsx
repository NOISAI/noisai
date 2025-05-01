
import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, UserCheck, UserX } from "lucide-react";
import { Investor } from "@/types/admin";
import { formatCurrency, formatDate } from "@/utils/adminUtils";
import LoadingIndicator from "../shared/LoadingIndicator";
import EmptyState from "../shared/EmptyState";

interface InvestorTableProps {
  investors: Investor[];
  loading: boolean;
  searchQuery: string;
  onEdit: (investor: Investor) => void;
  onDelete: (investor: Investor) => void;
  onToggleStatus: (investor: Investor) => void;
}

export default function InvestorTable({
  investors,
  loading,
  searchQuery,
  onEdit,
  onDelete,
  onToggleStatus
}: InvestorTableProps) {
  if (loading) {
    return <LoadingIndicator message="Loading investors..." />;
  }

  if (investors.length === 0) {
    return <EmptyState 
      type="investors" 
      isSearching={!!searchQuery}
      searchQuery={searchQuery}
    />;
  }

  return (
    <div className="rounded-md border border-gray-800">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-800 hover:bg-gray-800">
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Total Invested</TableHead>
            <TableHead className="text-gray-300">Last Interaction</TableHead>
            <TableHead className="text-gray-300 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investors.map((investor) => (
            <TableRow key={investor.id} className="bg-gray-900 hover:bg-gray-800">
              <TableCell>{investor.name}</TableCell>
              <TableCell>{investor.email}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  investor.status === "Active" 
                    ? "bg-green-900 text-green-300" 
                    : "bg-gray-800 text-gray-400"
                }`}>
                  {investor.status}
                </span>
              </TableCell>
              <TableCell>{formatCurrency(investor.total_invested)}</TableCell>
              <TableCell>{formatDate(investor.last_interaction)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                    <DropdownMenuItem 
                      className="text-white hover:bg-gray-800 cursor-pointer"
                      onClick={() => onEdit(investor)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-white hover:bg-gray-800 cursor-pointer"
                      onClick={() => onToggleStatus(investor)}
                    >
                      {investor.status === "Active" ? (
                        <>
                          <UserX className="mr-2 h-4 w-4" /> Set Inactive
                        </>
                      ) : (
                        <>
                          <UserCheck className="mr-2 h-4 w-4" /> Set Active
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-500 hover:bg-gray-800 cursor-pointer"
                      onClick={() => onDelete(investor)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
