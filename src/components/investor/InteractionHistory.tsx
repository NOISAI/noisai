
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

// Mock data for interactions
const mockInteractions = [
  { id: 1, date: "2025-04-20", type: "Meeting", description: "Q1 Investor Update Meeting", status: "Completed" },
  { id: 2, date: "2025-03-10", type: "Email", description: "Investment Opportunity Details", status: "Completed" },
  { id: 3, date: "2025-02-15", type: "Document", description: "Signed Investment Agreement", status: "Completed" },
];

const InteractionHistory = () => {
  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>Interaction History</CardTitle>
        <CardDescription>Record of past interactions with NOISAI</CardDescription>
      </CardHeader>
      <CardContent>
        {mockInteractions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Type</TableHead>
                <TableHead className="text-gray-400">Description</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInteractions.map(interaction => (
                <TableRow key={interaction.id} className="border-gray-800">
                  <TableCell>{interaction.date}</TableCell>
                  <TableCell>{interaction.type}</TableCell>
                  <TableCell>{interaction.description}</TableCell>
                  <TableCell>
                    <span className="text-green-500">
                      {interaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-6 text-center bg-gray-800/50 rounded-md border border-gray-700">
            <p className="text-gray-400">No interaction history found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractionHistory;
