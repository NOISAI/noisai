
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Form } from "@/components/ui/form";
import { 
  Investment, 
  investmentFormSchema, 
  InvestmentFormData,
  TransactionDetails 
} from "@/types/investment";
import { sendInvestmentInterestEmail } from "@/services/emailService";
import { makeInvestment, ensureSepoliaNetwork } from "@/services/blockchainService";

// Import the smaller components
import InvestmentAmountField from "./InvestmentAmountField";
import TokenTypeField from "./TokenTypeField";
import EmailField from "./EmailField";
import InvestmentSteps from "./InvestmentSteps";
import InvestmentDisclaimer from "./InvestmentDisclaimer";
import ConfirmationDialog from "./ConfirmationDialog";

interface InvestmentFormProps {
  investment: Investment | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const InvestmentForm = ({ investment, onSuccess, onCancel }: InvestmentFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  
  const form = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentFormSchema),
    defaultValues: {
      amount: "10000",
      email: "",
      tokenType: "USDC"
    },
  });

  const handleInvest = async (data: InvestmentFormData) => {
    if (!investment) return;
    
    setIsSubmitting(true);
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        toast({
          title: "MetaMask Required",
          description: "Please install MetaMask browser extension to make an investment.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Ensure we're on Sepolia network before proceeding
      try {
        await ensureSepoliaNetwork();
        setNetworkError(null);
      } catch (error) {
        console.error("Network error:", error);
        setNetworkError("Please connect to the Sepolia test network in MetaMask.");
        setIsSubmitting(false);
        return;
      }

      // Open the dialog to confirm transaction
      setShowDialog(true);
    } catch (error) {
      console.error("Error preparing investment:", error);
      toast({
        title: "Error",
        description: "There was a problem with your investment request. Please try again or contact support.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  const confirmInvestment = async () => {
    try {
      const data = form.getValues();
      const tokenType = data.tokenType as "USDT" | "USDC";
      
      // Initiate the blockchain transaction
      const result = await makeInvestment(
        Number(data.amount),
        tokenType
      );
      
      // Create transaction record
      const newTransaction: TransactionDetails = {
        hash: result.hash,
        tokenType: tokenType,
        amount: Number(data.amount),
        status: "pending",
        timestamp: new Date().toISOString(),
        network: "sepolia"
      };
      
      setTransaction(newTransaction);
      
      // Send email notification
      await sendInvestmentInterestEmail({
        investorEmail: data.email,
        investmentName: investment!.name,
        amount: data.amount,
      });
      
      toast({
        title: "Investment Transaction Initiated",
        description: `Your ${tokenType} transaction is being processed. You'll need to complete all required steps before approval.`,
      });
      
      form.reset();
      setShowDialog(false);
      onSuccess();
    } catch (error) {
      console.error("Error during investment:", error);
      toast({
        title: "Transaction Failed",
        description: "There was a problem with the transaction. Please try again or contact support.",
        variant: "destructive",
      });
      setShowDialog(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleInvest)} className="space-y-4">
          <InvestmentAmountField form={form} />
          <TokenTypeField form={form} />
          <EmailField form={form} />
          
          <InvestmentSteps />
          <InvestmentDisclaimer />
          
          {networkError && (
            <div className="rounded-md bg-red-900/20 p-3 border border-red-500/50">
              <p className="text-sm text-red-500">{networkError}</p>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button"
              variant="outline" 
              className="text-gray-400 border-gray-800 hover:bg-gray-800"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-black flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              {isSubmitting ? "Preparing..." : "Invest Now"}
            </Button>
          </div>
        </form>
      </Form>
      
      <ConfirmationDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        isSubmitting={isSubmitting}
        onConfirm={confirmInvestment}
        formValues={{
          amount: form.getValues("amount"),
          tokenType: form.getValues("tokenType") || "USDC"
        }}
      />
    </>
  );
};

export default InvestmentForm;
