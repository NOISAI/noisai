
import { Investment, InvestorApproval, InvestorRequirements, TransactionDetails } from "@/types/investment";

// Mock investment data for the application
export const mockInvestments: Investment[] = [
  { 
    id: 1, 
    name: "NOISAI Seed Round", 
    amount: 0, 
    target: 1000000,
    raised: 0,
    date: "2025-05-15", 
    status: "Active", 
    roi: "0%",
    endDate: "2025-06-30"
  },
];

// Mock investor approvals
export const mockApprovals: InvestorApproval[] = [
  {
    investorEmail: "demo@investor.com",
    investmentId: 1,
    status: "pending",
    requirements: {
      contractSigned: true,
      meetingCompleted: false,
      idUploaded: true,
      docsUploaded: false
    },
    requestDate: "2025-04-25",
    amountRequested: 25000
  }
];

// Mock blockchain transactions
export const mockTransactions: TransactionDetails[] = [
  {
    hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    tokenType: "USDC",
    amount: 10000,
    status: "confirmed",
    timestamp: "2025-04-20T14:32:11Z",
    network: "sepolia"
  },
  {
    hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    tokenType: "USDT",
    amount: 15000,
    status: "pending",
    timestamp: "2025-04-25T09:15:22Z",
    network: "sepolia"
  }
];

// Get status of requirements completion
export const getRequirementsStatus = (requirements: InvestorRequirements): {
  completed: number;
  total: number;
  percentage: number;
} => {
  const total = 4; // Total number of requirements
  const completed = Object.values(requirements).filter(Boolean).length;
  const percentage = (completed / total) * 100;
  
  return {
    completed,
    total,
    percentage
  };
};

// Format blockchain transaction hash for display
export const formatTransactionHash = (hash: string): string => {
  if (!hash || hash.length < 10) return hash;
  return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
};

// Check transaction status on Sepolia network
export const checkTransactionStatus = async (hash: string): Promise<"pending" | "confirmed" | "failed"> => {
  // In a real implementation, this would query the blockchain
  // For now, we'll just return the status from our mock data or "pending" as default
  const transaction = mockTransactions.find(tx => tx.hash === hash);
  return transaction?.status || "pending";
};
