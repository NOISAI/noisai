
import { ethers } from "ethers";
import { NOISAI_WALLET } from "@/types/investment";
import { ensureSepoliaNetwork } from "./networkService";
import { checkWalletBalance, getCurrentWalletAddress } from "./walletService";

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
