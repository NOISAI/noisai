
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const TokenUtilityTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-white">Token Utility</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-gray-300">Governance voting rights</TableCell>
          <TableCell className="text-right">•</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-gray-300">Energy credit trading</TableCell>
          <TableCell className="text-right">•</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-gray-300">Network fee payments</TableCell>
          <TableCell className="text-right">•</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-gray-300">Staking rewards</TableCell>
          <TableCell className="text-right">•</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-gray-300">Protocol participation</TableCell>
          <TableCell className="text-right">•</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
