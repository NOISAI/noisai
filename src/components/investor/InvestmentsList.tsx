
import { DollarSign } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock data for investments
const mockInvestments = [
  { id: 1, name: "NOISAI Seed Round", amount: 50000, date: "2025-01-15", status: "Active", roi: "+12.5%" },
  { id: 2, name: "NOISAI Series A", amount: 75000, date: "2025-02-28", status: "Pending", roi: "0%" },
];

const InvestmentsList = () => {
  const { toast } = useToast();

  const handleSellPosition = (investmentId: number) => {
    toast({
      title: "Sell Order Initiated",
      description: "Your sell request has been submitted. Our team will contact you shortly.",
    });
  };

  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>Your Investments</CardTitle>
        <CardDescription>Details of individual investments</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Amount</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">ROI</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvestments.map(investment => (
              <TableRow key={investment.id} className="border-gray-800">
                <TableCell className="font-medium">{investment.name}</TableCell>
                <TableCell>${investment.amount.toLocaleString()}</TableCell>
                <TableCell>{investment.date}</TableCell>
                <TableCell>
                  <span className={investment.status === 'Active' ? 'text-green-500' : 'text-yellow-500'}>
                    {investment.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={investment.roi.startsWith('+') ? 'text-green-500' : 'text-gray-400'}>
                    {investment.roi}
                  </span>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#22C55E] border-gray-800 hover:bg-gray-800"
                      >
                        <DollarSign className="w-4 h-4 mr-1" />
                        Sell
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border border-gray-800">
                      <DialogHeader>
                        <DialogTitle className="text-white">Sell Investment Position</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to sell your position in {investment.name}?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm text-gray-400 mb-2">Current value: ${parseInt(investment.roi) + investment.amount}</p>
                        <p className="text-sm text-gray-400">Expected return: ${investment.amount}</p>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          className="text-gray-400 border-gray-800 hover:bg-gray-800"
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={() => handleSellPosition(investment.id)}
                          className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-black"
                        >
                          Confirm Sale
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InvestmentsList;
