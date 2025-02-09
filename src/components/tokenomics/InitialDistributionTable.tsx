
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
            <TableCell className="text-gray-300 py-3">Community & Rewards</TableCell>
            <TableCell className="text-right text-[#22C55E] py-3">18% (37,800,000)</TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">Seed Sale</TableCell>
            <TableCell className="text-right text-[#22C55E] py-3">10% (21,000,000)</TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">Private Sale</TableCell>
            <TableCell className="text-right text-[#22C55E] py-3">10% (21,000,000)</TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">Development Fund</TableCell>
            <TableCell className="text-right text-[#22C55E] py-3">20% (42,000,000)</TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">Team & Advisors</TableCell>
            <TableCell className="text-right text-[#22C55E] py-3">15% (31,500,000)</TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">Ecosystem Growth</TableCell>
            <TableCell className="text-right text-[#22C55E] py-3">12% (25,200,000)</TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">Public Sale</TableCell>
            <TableCell className="text-right text-[#22C55E] py-3">8% (16,800,000)</TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">Liquidity & Market Making</TableCell>
            <TableCell className="text-right text-[#22C55E] py-3">5% (10,500,000)</TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">Reserve Fund</TableCell>
            <TableCell className="text-right text-[#22C55E] py-3">2% (4,200,000)</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
