
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const InitialDistributionTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-white">Initial Distribution</TableHead>
          <TableHead className="text-right text-white">Percentage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-gray-300">Community Rewards</TableCell>
          <TableCell className="text-right text-[#22C55E]">40%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-gray-300">Development Fund</TableCell>
          <TableCell className="text-right text-[#22C55E]">25%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-gray-300">Team & Advisors</TableCell>
          <TableCell className="text-right text-[#22C55E]">15%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-gray-300">Ecosystem Growth</TableCell>
          <TableCell className="text-right text-[#22C55E]">20%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
