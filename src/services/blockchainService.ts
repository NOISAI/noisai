
import { SEPOLIA_NETWORK_CONFIG, TOKEN_CONTRACTS } from "@/types/investment";

// ABI for ERC20 token interactions (minimal version)
const ERC20_ABI = [
  // Transfer function
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "type": "function"
  }
];

// NOISAI receiving wallet address
const NOISAI_WALLET = "0x9455579f25bcF26882Be32f22C8538e521D453d1"; // Example address

// Ensure the wallet is connected to Sepolia
export const ensureSepoliaNetwork = async (): Promise<boolean> => {
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    throw new Error("MetaMask is not installed");
  }

  try {
    // Check current network
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    if (chainId !== SEPOLIA_NETWORK_CONFIG.chainId) {
      try {
        // Try to switch to Sepolia
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SEPOLIA_NETWORK_CONFIG.chainId }],
        });
        return true;
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [SEPOLIA_NETWORK_CONFIG],
            });
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
    return accounts[0];
  } catch (error) {
    console.error("Error getting wallet address:", error);
    throw error;
  }
};

// Make an investment transaction using stable coins
export const makeInvestment = async (
  amount: number,
  tokenType: "USDT" | "USDC"
): Promise<{ hash: string }> => {
  try {
    // 1. Ensure we're on Sepolia network
    await ensureSepoliaNetwork();
    
    // 2. Get the current wallet address
    const fromAddress = await getCurrentWalletAddress();
    
    // 3. Create a contract instance using minimal ABI (just for transfer)
    const tokenAddress = TOKEN_CONTRACTS[tokenType];
    
    // 4. Convert amount to token units (assuming 6 decimals for USDC/USDT)
    const decimals = 6;
    const amountInWei = BigInt(Math.floor(amount * 10 ** decimals));
    
    // 5. Create transaction parameters
    const transactionParameters = {
      to: tokenAddress,
      from: fromAddress,
      data: getTransferData(NOISAI_WALLET, amountInWei.toString()),
    };

    // 6. Send the transaction
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });

    return { hash: txHash };
  } catch (error) {
    console.error("Investment transaction failed:", error);
    throw error;
  }
};

// Generate transfer function data
function getTransferData(to: string, value: string): string {
  // This is a simplified implementation.
  // In a production environment, you would use ethers.js or web3.js
  // to properly encode the function call.
  
  // Encode the function signature: transfer(address,uint256)
  const functionSignature = '0xa9059cbb';
  
  // Encode the address (remove '0x' and pad to 32 bytes)
  const paddedAddress = to.slice(2).padStart(64, '0');
  
  // Encode the value (remove '0x' if present and pad to 32 bytes)
  const valueStr = value.toString(16).padStart(64, '0');
  
  // Combine all parts
  return `${functionSignature}${paddedAddress}${valueStr}`;
}

