
import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function MetaMaskButton() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const { signIn } = useAuth();

  const connectWallet = async () => {
    setIsConnecting(true);

    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        toast({
          title: "MetaMask not detected",
          description: "Please install MetaMask browser extension to continue.",
          variant: "destructive"
        });
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      // Use the first account
      const walletAddress = accounts[0];
      
      // Get the chain ID to know which network the user is connected to
      const chainId = await window.ethereum.request({ 
        method: 'eth_chainId' 
      });
      
      if (walletAddress) {
        try {
          // Create a new verification for the wallet address
          const signInResponse = await signIn?.create({
            strategy: "web3",
            identifier: walletAddress,
            chainId
          });
          
          toast({
            title: "Wallet connected",
            description: "Successfully authenticated with MetaMask"
          });
        } catch (err: any) {
          console.error("Clerk Web3 auth error:", err);
          toast({
            title: "Authentication failed",
            description: err.message || "Could not authenticate with your wallet",
            variant: "destructive"
          });
        }
      }
    } catch (error: any) {
      console.error("MetaMask connection error:", error);
      toast({
        title: "Connection failed",
        description: error.message || "Could not connect to MetaMask",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Button 
      onClick={connectWallet} 
      disabled={isConnecting} 
      className="bg-[#F6851B] hover:bg-[#E2761B] text-white w-full h-14 gap-2 mb-4"
    >
      <Wallet className="w-5 h-5" />
      {isConnecting ? 'Connecting...' : 'Connect with MetaMask'}
    </Button>
  );
}
