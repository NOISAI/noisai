
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Check, FileText, CalendarCheck, IdCard, File, Wallet } from "lucide-react";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Investment, 
  investmentFormSchema, 
  InvestmentFormData,
  TransactionDetails 
} from "@/types/investment";
import { sendInvestmentInterestEmail } from "@/services/emailService";
import { makeInvestment, ensureSepoliaNetwork } from "@/services/blockchainService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Investment Amount ($)</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number" 
                    min="10000"
                    placeholder="10000" 
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </FormControl>
                <FormDescription className="text-gray-400">
                  Minimum investment is $10,000
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tokenType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Stablecoin Type</FormLabel>
                <Select 
                  defaultValue={field.value} 
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select stablecoin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-800 text-white border-gray-700">
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-gray-400">
                  Only USDC and USDT are accepted for investments
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Your Email</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="email" 
                    placeholder="your@email.com" 
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </FormControl>
                <FormDescription className="text-gray-400">
                  We'll use this email to contact you about your investment
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="pt-4 space-y-4">
            <h3 className="text-white font-semibold">Required Steps for Approval:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span>Sign investment contract</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center">
                  <CalendarCheck className="w-3.5 h-3.5" />
                </div>
                <span>Complete intro meeting with NOISAI team</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center">
                  <IdCard className="w-3.5 h-3.5" />
                </div>
                <span>Upload identification documents</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center">
                  <File className="w-3.5 h-3.5" />
                </div>
                <span>Submit any additional required documentation</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4 text-sm text-gray-400">
            <p>By investing, your transaction will be processed on the Sepolia network using the selected stablecoin.</p>
            <p className="mt-2">After transaction, you'll need to complete all required steps before your investment can be approved.</p>
            <p className="mt-2 text-[#22C55E]">Once all requirements are met, an admin will review and approve your investment.</p>
          </div>
          
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
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-gray-900 text-white border border-gray-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Confirm Investment</DialogTitle>
            <DialogDescription className="text-gray-400">
              You're about to make an investment using MetaMask on the Sepolia network.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Amount:</span>
              <span className="font-semibold text-white">${Number(form.getValues("amount")).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Token:</span>
              <span className="font-semibold text-white">{form.getValues("tokenType") || "USDC"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Network:</span>
              <span className="font-semibold text-green-500">Sepolia Testnet</span>
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2 justify-end">
            <Button 
              variant="outline" 
              onClick={() => setShowDialog(false)}
              className="text-gray-400 border-gray-800 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmInvestment}
              disabled={isSubmitting}
              className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-black"
            >
              {isSubmitting ? "Processing..." : "Confirm & Sign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvestmentForm;
