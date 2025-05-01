
import { SEPOLIA_NETWORK_CONFIG, TOKEN_CONTRACTS } from "@/types/investment";

// ABI for ERC20 token interactions (expanded to include balance checking)
const ERC20_ABI = [
  // Balance checking function
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "type": "function"
  },
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

// Check if the wallet has sufficient balance
export const checkWalletBalance = async (
  tokenType: "USDT" | "USDC",
): Promise<{balance: number, hasEnoughFunds: boolean, requiredAmount: number}> => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  
  try {
    // Get the current wallet address
    const fromAddress = await getCurrentWalletAddress();
    
    // Create a Web3 provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Get the token contract
    const tokenAddress = TOKEN_CONTRACTS[tokenType];
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    
    // Check balance
    const rawBalance = await tokenContract.balanceOf(fromAddress);
    
    // Convert from wei to token units (assuming 6 decimals for USDC/USDT)
    const decimals = 6;
    const balance = Number(rawBalance) / (10 ** decimals);
    
    // Default required amount (for UI display purposes)
    const requiredAmount = 10; // Minimum investment amount
    
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
      requiredAmount: 10
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

// Make an investment transaction using stable coins
export const makeInvestment = async (
  amount: number,
  tokenType: "USDT" | "USDC"
): Promise<{ hash: string }> => {
  try {
    console.log(`Starting investment: ${amount} ${tokenType}`);
    
    // 1. Ensure we're on Sepolia network
    await ensureSepoliaNetwork();
    
    // 2. Get the current wallet address
    const fromAddress = await getCurrentWalletAddress();
    
    // 3. Check if wallet has sufficient balance
    const { balance, hasEnoughFunds } = await checkWalletBalance(tokenType);
    
    if (!hasEnoughFunds) {
      throw new Error(`Insufficient ${tokenType} balance. You have ${balance} ${tokenType} but need at least ${amount} ${tokenType}.`);
    }
    
    // 4. Create a contract instance using minimal ABI (just for transfer)
    const tokenAddress = TOKEN_CONTRACTS[tokenType];
    console.log(`Using token address: ${tokenAddress}`);
    
    // 5. Convert amount to token units (assuming 6 decimals for USDC/USDT)
    const decimals = 6;
    const amountInWei = BigInt(Math.floor(amount * 10 ** decimals));
    console.log(`Amount in wei: ${amountInWei}`);
    
    // 6. Create transaction parameters
    const transferData = getTransferData(NOISAI_WALLET, amountInWei.toString());
    console.log(`Transfer data: ${transferData}`);
    
    const transactionParameters = {
      to: tokenAddress,
      from: fromAddress,
      data: transferData,
    };
    
    console.log("Transaction parameters:", transactionParameters);

    // 7. Send the transaction
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

// Generate transfer function data
function getTransferData(to: string, value: string): string {
  console.log(`Generating transfer data for recipient: ${to}, value: ${value}`);
  
  // Encode the function signature: transfer(address,uint256)
  const functionSignature = '0xa9059cbb';
  
  // Encode the address (remove '0x' and pad to 32 bytes)
  const paddedAddress = to.slice(2).padStart(64, '0');
  
  // Encode the value (convert to hex and pad to 32 bytes)
  const valueStr = BigInt(value).toString(16).padStart(64, '0');
  
  // Combine all parts
  const data = `${functionSignature}${paddedAddress}${valueStr}`;
  console.log(`Generated data: ${data}`);
  
  return data;
}
