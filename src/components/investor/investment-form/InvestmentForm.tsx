
import { useState, useEffect } from "react";
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
import {
  makeInvestment,
  ensureSepoliaNetwork,
  checkWalletBalance
} from "@/services/blockchain";

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
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const [ethBalance, setEthBalance] = useState<number>(0);
  const [requiredEth, setRequiredEth] = useState<number>(0.005); // Default ~$10 worth of ETH
  
  const form = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentFormSchema),
    defaultValues: {
      amount: "10",
      email: "",
      tokenType: "ETH"
    },
  });

  // Check wallet balances when the form loads
  useEffect(() => {
    const checkBalance = async () => {
      try {
        if (!window.ethereum) return;
        
        const ethBalanceInfo = await checkWalletBalance();
        
        setEthBalance(ethBalanceInfo.balance);
        setRequiredEth(ethBalanceInfo.requiredAmount);
      } catch (error) {
        console.error("Error checking balance:", error);
      }
    };
    
    checkBalance();
  }, []);

  const handleInvest = async (data: InvestmentFormData) => {
    if (!investment) return;
    
    setIsSubmitting(false); // Reset submission state before starting
    setBalanceError(null);
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        toast({
          title: "MetaMask Required",
          description: "Please install MetaMask browser extension to make an investment.",
          variant: "destructive",
        });
        return;
      }
      
      // Ensure we're on Sepolia network before proceeding
      try {
        await ensureSepoliaNetwork();
        setNetworkError(null);
      } catch (error) {
        console.error("Network error:", error);
        setNetworkError("Please connect to the Sepolia test network in MetaMask.");
        return;
      }

      // Check wallet balance
      const amount = Number(data.amount) / 2000; // Convert $ to ETH at ~$2000/ETH rate
      const balanceInfo = await checkWalletBalance();
      
      // Update balance
      setEthBalance(balanceInfo.balance);
      setRequiredEth(balanceInfo.requiredAmount);
      
      // Check if balance is sufficient
      if (balanceInfo.balance < balanceInfo.requiredAmount) {
        setBalanceError(`Insufficient ETH balance. You have ${balanceInfo.balance.toFixed(6)} ETH but need ${balanceInfo.requiredAmount.toFixed(6)} ETH (approx. $10).`);
        toast({
          title: "Insufficient Balance",
          description: `Your ETH balance is too low for this investment. Please add funds to your wallet.`,
          variant: "destructive",
        });
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
    }
  };
  
  const confirmInvestment = async () => {
    try {
      setIsSubmitting(true); // Set submitting state on confirmation
      
      const data = form.getValues();
      const dollarAmount = Number(data.amount);
      const ethAmount = dollarAmount / 2000; // Convert $ to ETH at ~$2000/ETH rate
      
      console.log("Initiating blockchain transaction...");
      
      // Initiate the blockchain transaction
      try {
        const result = await makeInvestment(ethAmount);
        
        console.log("Transaction initiated:", result);
        
        // Create transaction record
        const newTransaction: TransactionDetails = {
          hash: result.hash,
          tokenType: "ETH",
          amount: dollarAmount, // Store dollar amount for reference
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
          description: `Your ETH transaction is being processed. You'll need to complete all required steps before approval.`,
        });
        
        form.reset();
        setShowDialog(false);
        onSuccess();
      } catch (error: any) {
        console.error("Transaction error:", error);
        // Show specific error message
        if (error.message?.includes("Insufficient")) {
          setBalanceError(error.message);
          toast({
            title: "Transaction Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Transaction Failed",
            description: "There was a problem with the transaction. Please try again or contact support.",
            variant: "destructive",
          });
        }
        setShowDialog(false);
      }
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

  const hasInsufficientBalance = ethBalance < requiredEth;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleInvest)} className="space-y-4">
          <InvestmentAmountField form={form} />
          
          {/* Show balance information */}
          {window.ethereum && (
            <div className="text-sm flex justify-between items-center">
              <span className="text-gray-400">Your ETH balance:</span>
              <span className={hasInsufficientBalance ? "text-red-500" : "text-[#22C55E]"}>
                {ethBalance.toFixed(6)} ETH
              </span>
            </div>
          )}
          
          <TokenTypeField form={form} />
          <EmailField form={form} />
          
          <InvestmentSteps />
          <InvestmentDisclaimer />
          
          {networkError && (
            <div className="rounded-md bg-red-900/20 p-3 border border-red-500/50">
              <p className="text-sm text-red-500">{networkError}</p>
            </div>
          )}
          
          {balanceError && (
            <div className="rounded-md bg-red-900/20 p-3 border border-red-500/50">
              <p className="text-sm text-red-500">{balanceError}</p>
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
              disabled={isSubmitting || hasInsufficientBalance}
              className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-black flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              {isSubmitting ? "Preparing..." : hasInsufficientBalance ? 
                "Insufficient ETH Balance" : "Invest Now"}
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
          tokenType: "ETH"
        }}
      />
    </>
  );
};

export default InvestmentForm;
