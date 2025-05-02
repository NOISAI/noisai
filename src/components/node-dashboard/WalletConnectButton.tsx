
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getCurrentWalletAddress } from "@/services/blockchain/walletService";

interface WalletConnectButtonProps {
  walletAddress: string | null;
  setWalletAddress: (address: string) => void;
}

export function WalletConnectButton({ walletAddress, setWalletAddress }: WalletConnectButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive"
      });
      return;
    }
    
    setIsConnecting(true);
    
    try {
      const address = await getCurrentWalletAddress();
      setWalletAddress(address);
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <>
      {walletAddress ? (
        <div className="flex items-center bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm">
          <Wallet className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-sm text-gray-800 font-medium truncate w-32">
            {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
          </span>
        </div>
      ) : (
        <Button 
          onClick={connectWallet} 
          disabled={isConnecting}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </>
  );
}
