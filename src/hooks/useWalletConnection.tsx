
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getCurrentWalletAddress, checkWalletBalance } from "@/services/blockchain/walletService";

interface UseWalletConnectionReturn {
  walletAddress: string | null;
  isConnecting: boolean;
  ethBalance: number;
  requiredEth: number;
  hasEnoughFunds: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

export function useWalletConnection(): UseWalletConnectionReturn {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [ethBalance, setEthBalance] = useState<number>(0);
  const [requiredEth, setRequiredEth] = useState<number>(0);
  const [hasEnoughFunds, setHasEnoughFunds] = useState<boolean>(false);
  
  const { toast } = useToast();

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            updateBalanceInfo();
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    
    checkWalletConnection();
    
    // Setup MetaMask event listeners
    if (window.ethereum) {
      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        console.log("MetaMask accounts changed:", accounts);
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet();
        } else {
          // User switched accounts
          setWalletAddress(accounts[0]);
          updateBalanceInfo();
        }
      });
      
      // Listen for chain changes
      window.ethereum.on('chainChanged', (chainId: string) => {
        console.log("MetaMask chain changed:", chainId);
        // Refresh balance info when chain changes
        if (walletAddress) {
          updateBalanceInfo();
        }
      });
    }
    
    // Clean up event listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  // Update balance information when wallet is connected
  const updateBalanceInfo = async () => {
    try {
      const { balance, hasEnoughFunds, requiredAmount } = await checkWalletBalance();
      setEthBalance(balance);
      setRequiredEth(requiredAmount);
      setHasEnoughFunds(hasEnoughFunds);
    } catch (error) {
      console.error("Error updating balance info:", error);
    }
  };

  // Connect wallet function
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
      // This will trigger the MetaMask popup
      console.log("Requesting MetaMask accounts...");
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length === 0) {
        throw new Error("No accounts found or user rejected the connection");
      }
      
      const address = accounts[0];
      console.log("MetaMask connected:", address);
      setWalletAddress(address);
      
      // Update balance information
      await updateBalanceInfo();
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      });
      
      return address;
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setWalletAddress(null);
    setEthBalance(0);
    setHasEnoughFunds(false);
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  return {
    walletAddress,
    isConnecting,
    ethBalance,
    requiredEth,
    hasEnoughFunds,
    connectWallet,
    disconnectWallet,
  };
}
