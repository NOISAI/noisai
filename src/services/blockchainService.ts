import { ethers } from "ethers";
import { SEPOLIA_NETWORK_CONFIG, NOISAI_WALLET } from "@/types/investment";

// Check if the wallet has sufficient ETH balance
export const checkWalletBalance = async (): Promise<{
  balance: number,
  hasEnoughFunds: boolean,
  requiredAmount: number
}> => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  
  try {
    // Get the current wallet address
    const fromAddress = await getCurrentWalletAddress();
    
    // Create a Web3 provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Check ETH balance
    const rawBalance = await provider.getBalance(fromAddress);
    
    // Convert from wei to ETH (decimals = 18)
    const decimals = 18;
    const balance = Number(ethers.utils.formatEther(rawBalance));
    
    // Default required amount (for UI display purposes)
    const requiredAmount = 10 / 2000; // $10 worth of ETH assuming ~$2000/ETH
    
    return {
      balance,
      hasEnoughFunds: balance >= requiredAmount,
      requiredAmount
    };
  } catch (error) {
    console.error("Error checking wallet balance:", error);
    return {
      balance: 0,
      hasEnoughFunds: false,
      requiredAmount: 10 / 2000
    };
  }
};

// Ensure the wallet is connected to Sepolia
export const ensureSepoliaNetwork = async (): Promise<boolean> => {
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    throw new Error("MetaMask is not installed");
  }

  try {
    // Check current network
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log("Current chain ID:", chainId);
    
    if (chainId !== SEPOLIA_NETWORK_CONFIG.chainId) {
      console.log("Need to switch to Sepolia network");
      try {
        // Try to switch to Sepolia
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SEPOLIA_NETWORK_CONFIG.chainId }],
        });
        console.log("Successfully switched to Sepolia");
        return true;
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            console.log("Adding Sepolia network to MetaMask");
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [SEPOLIA_NETWORK_CONFIG],
            });
            console.log("Successfully added Sepolia network");
            return true;
          } catch (addError) {
            console.error("Failed to add Sepolia network:", addError);
            throw new Error("Failed to add Sepolia network");
          }
        } else {
          console.error("Failed to switch to Sepolia network:", switchError);
          throw new Error("Failed to switch to Sepolia network");
        }
      }
    }
    console.log("Already on Sepolia network");
    return true;
  } catch (error) {
    console.error("Error ensuring Sepolia network:", error);
    throw error;
  }
};

// Get the current wallet address
export const getCurrentWalletAddress = async (): Promise<string> => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length === 0) throw new Error("No accounts found");
    console.log("Connected wallet address:", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.error("Error getting wallet address:", error);
    throw error;
  }
};

// Make an investment transaction using ETH
export const makeInvestment = async (amount: number): Promise<{ hash: string }> => {
  try {
    console.log(`Starting investment: ${amount} ETH`);
    
    // 1. Ensure we're on Sepolia network
    await ensureSepoliaNetwork();
    
    // 2. Get the current wallet address
    const fromAddress = await getCurrentWalletAddress();
    
    // 3. Check if wallet has sufficient balance
    const { balance, hasEnoughFunds, requiredAmount } = await checkWalletBalance();
    
    if (!hasEnoughFunds) {
      throw new Error(`Insufficient ETH balance. You have ${balance} ETH but need at least ${requiredAmount} ETH (approx. $10).`);
    }
    
    // 4. Create transaction parameters for sending ETH directly
    const transactionParameters = {
      to: NOISAI_WALLET,
      from: fromAddress,
      value: ethers.utils.parseEther(amount.toString()).toHexString(),
    };
    
    console.log("Transaction parameters:", transactionParameters);

    // 5. Send the transaction
    console.log("Sending transaction...");
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    
    console.log("Transaction sent successfully! Hash:", txHash);

    return { hash: txHash };
  } catch (error) {
    console.error("Investment transaction failed:", error);
    throw error;
  }
};
