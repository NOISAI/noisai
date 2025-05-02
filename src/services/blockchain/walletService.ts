
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
    
    if (!fromAddress) {
      throw new Error("No wallet connected");
    }
    
    // Create a Web3 provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Check ETH balance
    const rawBalance = await provider.getBalance(fromAddress);
    
    // Convert from wei to ETH (decimals = 18)
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

// Get the current wallet address
export const getCurrentWalletAddress = async (): Promise<string> => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  
  try {
    // This should NOT trigger the MetaMask popup, just check current accounts
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    
    if (accounts.length === 0) {
      // No accounts connected yet
      return "";
    }
    
    console.log("Current wallet address:", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.error("Error getting wallet address:", error);
    throw error;
  }
};

// Request wallet connection (this WILL trigger MetaMask popup)
export const requestWalletConnection = async (): Promise<string> => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  
  try {
    console.log("Requesting wallet connection...");
    // This WILL trigger the MetaMask popup
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if (accounts.length === 0) {
      throw new Error("No accounts found or user rejected the connection");
    }
    
    console.log("Connected wallet address:", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.error("Error requesting wallet connection:", error);
    throw error;
  }
};
