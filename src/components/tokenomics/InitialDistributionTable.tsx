
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const InitialDistributionTable = () => {
  return (
    <div className="bg-[#1A1F2C] p-6 rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl font-semibold text-white border-b border-gray-800 pb-4">Initial Distribution</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="mt-4">
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">Community Rewards</TableCell>
            <TableCell className="text-right text-[#22C55E] py-3">40%</TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">Development Fund</TableCell>
            <TableCell className="text-right text-[#22C55E] py-3">25%</TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">Team & Advisors</TableCell>
            <TableCell className="text-right text-[#22C55E] py-3">15%</TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">Ecosystem Growth</TableCell>
            <TableCell className="text-right text-[#22C55E] py-3">20%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
