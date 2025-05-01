
import { SEPOLIA_NETWORK_CONFIG } from "@/types/investment";

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
