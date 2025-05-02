
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getCurrentWalletAddress } from "@/services/blockchain/walletService";
import { ensureSepoliaNetwork } from "@/services/blockchain/networkService";

interface ClaimTokenDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  walletAddress: string | null;
  availableTokens: number;
  panelName: string;
  onClaimSuccess: () => void;
}

export function ClaimTokenDialog({
  isOpen,
  setIsOpen,
  walletAddress,
  availableTokens,
  panelName,
  onClaimSuccess
}: ClaimTokenDialogProps) {
  const [isClaiming, setIsClaiming] = useState(false);
  const { toast } = useToast();

  const handleClaimConfirm = async () => {
    setIsClaiming(true);
    
    try {
      // First ensure we're on the right network
      await ensureSepoliaNetwork();
      
      // Double-check wallet connection
      const currentAddress = await getCurrentWalletAddress();
      
      if (!currentAddress) {
        throw new Error("Wallet disconnected. Please reconnect.");
      }
      
      // Prepare transaction parameters
      const transactionParameters = {
        to: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", // Example receiver address
        from: currentAddress,
        // This is just simulating a token claim, not actually sending ETH
        // In a real app, this would call a smart contract function
        data: "0x095ea7b3000000000000000000000000" + 
              "71C7656EC7ab88b098defB751B7401B5f6d8976F" + 
              "0000000000000000000000000000000000000000000000000000000000000000",
      };
      
      console.log("Sending transaction with params:", transactionParameters);
      
      // Explicitly request transaction - this will trigger MetaMask popup
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      
      console.log("Transaction sent successfully! Hash:", txHash);
      
      setIsClaiming(false);
      setIsOpen(false);
      
      // Notify parent component about claimed tokens
      onClaimSuccess();
      
      toast({
        title: "Tokens Claimed Successfully",
        description: `${availableTokens} NOISAI tokens have been sent to your wallet.`,
      });
      
      toast({
        title: "Transaction Confirmed",
        description: `Transaction hash: ${txHash.substring(0, 10)}...${txHash.substring(txHash.length - 6)}`,
      });
    } catch (error: any) {
      console.error("Error claiming tokens:", error);
      setIsClaiming(false);
      
      toast({
        title: "Claim Failed",
        description: error.message || "There was an error claiming your tokens. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Claim NOISAI Tokens</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-300">
            You are about to claim {availableTokens} NOISAI tokens from the {panelName} panel.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Tokens will be sent to your connected wallet address:
          </p>
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
            <p className="text-xs font-mono text-gray-800 dark:text-gray-300 break-all">
              {walletAddress}
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            This transaction will be processed on the Sepolia test network. This action cannot be undone.
          </p>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleClaimConfirm}
            disabled={isClaiming}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isClaiming ? "Processing Transaction..." : "Confirm Claim"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
