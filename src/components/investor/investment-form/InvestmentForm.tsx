
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
import { makeInvestment, ensureSepoliaNetwork, checkWalletBalance } from "@/services/blockchainService";

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
  const [tokenBalances, setTokenBalances] = useState<{
    USDC: number;
    USDT: number;
  }>({ USDC: 0, USDT: 0 });
  
  const form = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentFormSchema),
    defaultValues: {
      amount: "10",
      email: "",
      tokenType: "USDC"
    },
  });

  // Check wallet balances when the form loads
  useEffect(() => {
    const checkBalances = async () => {
      try {
        if (!window.ethereum) return;
        
        const usdcBalance = await checkWalletBalance("USDC");
        const usdtBalance = await checkWalletBalance("USDT");
        
        setTokenBalances({
          USDC: usdcBalance.balance,
          USDT: usdtBalance.balance
        });
      } catch (error) {
        console.error("Error checking balances:", error);
      }
    };
    
    checkBalances();
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
      const tokenType = data.tokenType as "USDT" | "USDC";
      const amount = Number(data.amount);
      const balanceInfo = await checkWalletBalance(tokenType);
      
      // Update balances
      setTokenBalances(prev => ({
        ...prev,
        [tokenType]: balanceInfo.balance
      }));
      
      // Check if balance is sufficient
      if (balanceInfo.balance < amount) {
        setBalanceError(`Insufficient ${tokenType} balance. You have ${balanceInfo.balance} ${tokenType} but need ${amount} ${tokenType}.`);
        toast({
          title: "Insufficient Balance",
          description: `Your ${tokenType} balance is too low for this investment. Please add funds to your wallet.`,
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
      const tokenType = data.tokenType as "USDT" | "USDC";
      const amount = Number(data.amount);
      
      console.log("Initiating blockchain transaction...");
      
      // Initiate the blockchain transaction
      try {
        const result = await makeInvestment(
          amount,
          tokenType
        );
        
        console.log("Transaction initiated:", result);
        
        // Create transaction record
        const newTransaction: TransactionDetails = {
          hash: result.hash,
          tokenType: tokenType,
          amount: amount,
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

  const currentTokenType = form.watch("tokenType") as "USDT" | "USDC"; 
  const currentAmount = Number(form.watch("amount"));
  const currentBalance = tokenBalances[currentTokenType] || 0;
  const hasInsufficientBalance = currentBalance < currentAmount;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleInvest)} className="space-y-4">
          <InvestmentAmountField form={form} />
          
          {/* Show balance information */}
          {window.ethereum && (
            <div className="text-sm flex justify-between items-center">
              <span className="text-gray-400">Your {currentTokenType} balance:</span>
              <span className={hasInsufficientBalance ? "text-red-500" : "text-[#22C55E]"}>
                {currentBalance.toFixed(2)} {currentTokenType}
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
                "Insufficient Balance" : "Invest Now"}
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
