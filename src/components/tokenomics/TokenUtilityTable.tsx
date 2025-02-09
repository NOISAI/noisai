
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const TokenUtilityTable = () => {
  return (
    <div className="bg-[#1A1F2C] p-6 rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl font-semibold text-white border-b border-gray-800 pb-4">Token Utility</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="mt-4">
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">• Governance voting rights</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">• Energy credit trading</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">• Network fee payments</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">• Staking rewards</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
          <TableRow className="border-0">
            <TableCell className="text-gray-300 py-3">• Protocol participation</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
