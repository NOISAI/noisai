
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockInvestments } from "@/data/mockInvestments";
import { initEmailJS } from "@/services/emailService";
import InvestmentTable from "@/components/investor/InvestmentTable";
import InvestmentForm from "@/components/investor/InvestmentForm";
import { Investment } from "@/types/investment";

const InvestmentsList = () => {
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Initialize EmailJS
  useEffect(() => {
    initEmailJS();
  }, []);

  const handleInvestClick = (investment: Investment) => {
    setSelectedInvestment(investment);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
  };

  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>Current Investment Opportunities</CardTitle>
        <CardDescription>Available NOISAI investment rounds</CardDescription>
      </CardHeader>
      <CardContent>
        <InvestmentTable 
          investments={mockInvestments}
          onInvestClick={handleInvestClick}
        />
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-gray-900 border border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Invest in {selectedInvestment?.name}</DialogTitle>
              <DialogDescription>
                Enter your investment details to participate in this funding round.
              </DialogDescription>
            </DialogHeader>
            
            <InvestmentForm
              investment={selectedInvestment}
              onSuccess={handleFormSuccess}
              onCancel={handleDialogClose}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default InvestmentsList;
