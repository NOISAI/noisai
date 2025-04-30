
import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, UserPlus, Edit, Trash2, UserCheck, UserX 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for investors
const mockInvestors = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active", totalInvested: "$50,000", lastInteraction: "2025-04-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active", totalInvested: "$35,000", lastInteraction: "2025-04-20" },
  { id: 3, name: "Michael Johnson", email: "michael@example.com", status: "Inactive", totalInvested: "$0", lastInteraction: "2025-03-05" },
  { id: 4, name: "Emily Brown", email: "emily@example.com", status: "Active", totalInvested: "$25,000", lastInteraction: "2025-04-22" },
  { id: 5, name: "David Wilson", email: "david@example.com", status: "Active", totalInvested: "$14,500", lastInteraction: "2025-04-18" },
];

const InvestorManagement = () => {
  const [investors] = useState(mockInvestors);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Investor Management</h2>
        <Button className="bg-[#22C55E] hover:bg-[#1ea853] text-black">
          <UserPlus size={16} className="mr-1" /> Add New Investor
        </Button>
      </div>

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
                <TableCell>{investor.totalInvested}</TableCell>
                <TableCell>{investor.lastInteraction}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                      <DropdownMenuItem className="text-white hover:bg-gray-800 cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-gray-800 cursor-pointer">
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
                      <DropdownMenuItem className="text-red-500 hover:bg-gray-800 cursor-pointer">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvestorManagement;
