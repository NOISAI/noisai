
import { DollarSign, Clock } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Updated mock data for investments with seed sale
const mockInvestments = [
  { 
    id: 1, 
    name: "NOISAI Seed Round", 
    amount: 0, 
    target: 1000000,
    raised: 680000,
    date: "2025-05-15", 
    status: "Active", 
    roi: "0%",
    endDate: "2025-06-30"
  },
];

const InvestmentsList = () => {
  const { toast } = useToast();
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const handleInvest = (investmentId) => {
    toast({
      title: "Investment Request Submitted",
      description: "Your investment request has been submitted. Our team will contact you shortly.",
    });
  };

  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>Current Investment Opportunities</CardTitle>
        <CardDescription>Available NOISAI investment rounds</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Progress</TableHead>
              <TableHead className="text-gray-400">End Date</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvestments.map(investment => (
              <TableRow key={investment.id} className="border-gray-800">
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{investment.name}</span>
                    <span className="text-xs text-gray-400">Target: ${investment.target.toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                    <span className="text-yellow-500">
                      Running
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-full space-y-1">
                    <Progress 
                      value={(investment.raised / investment.target) * 100} 
                      className="h-2 bg-gray-800" 
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>${investment.raised.toLocaleString()} raised</span>
                      <span>{Math.round((investment.raised / investment.target) * 100)}%</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{investment.endDate}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#22C55E] border-gray-800 hover:bg-gray-800"
                        onClick={() => setSelectedInvestment(investment)}
                      >
                        <DollarSign className="w-4 h-4 mr-1" />
                        Invest Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border border-gray-800">
                      <DialogHeader>
                        <DialogTitle className="text-white">Invest in {selectedInvestment?.name}</DialogTitle>
                        <DialogDescription>
                          Enter your investment details to participate in this funding round.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm text-gray-400 mb-4">Status: <span className="text-yellow-500">Running</span></p>
                        <p className="text-sm text-gray-400 mb-4">Target Raise: ${selectedInvestment?.target.toLocaleString()}</p>
                        <p className="text-sm text-gray-400 mb-4">Minimum Investment: $10,000</p>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          className="text-gray-400 border-gray-800 hover:bg-gray-800"
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={() => handleInvest(selectedInvestment?.id)}
                          className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-black"
                        >
                          Submit Interest
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
