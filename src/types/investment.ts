
import { z } from "zod";

// Schema for investment form validation
export const investmentFormSchema = z.object({
  amount: z.string().min(1, "Investment amount is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Must be a valid number",
    })
    .refine((val) => Number(val) >= 10, {
      message: "Minimum investment is $10",
    }),
  email: z.string().email("Please enter a valid email address"),
  tokenType: z.enum(["ETH"]).optional(),
});

// Type for form data based on the schema
export type InvestmentFormData = z.infer<typeof investmentFormSchema>;

// Investor approval requirements status
export interface InvestorRequirements {
  contractSigned: boolean;
  meetingCompleted: boolean;
  idUploaded: boolean;
  docsUploaded: boolean;
}

// Investment data type
export interface Investment {
  id: number;
  name: string;
  amount: number;
  target: number;
  raised: number;
  date: string;
  status: string;
  roi: string;
  endDate: string;
}

// Extended investment with approval status for an investor
export interface InvestorApproval {
  investorEmail: string;
  investmentId: number;
  status: "pending" | "approved" | "rejected";
  requirements: InvestorRequirements;
  requestDate: string;
  amountRequested: number;
}

// Blockchain transaction details
export interface TransactionDetails {
  hash: string;
  tokenType: "ETH";
  amount: number;
  status: "pending" | "confirmed" | "failed";
  timestamp: string;
  network: "sepolia";
}

// Sepolia network configuration
export const SEPOLIA_NETWORK_CONFIG = {
  chainId: "0xaa36a7", // 11155111 in hex
  chainName: "Sepolia",
  nativeCurrency: {
    name: "Sepolia ETH",
    symbol: "SEP",
    decimals: 18
  },
  rpcUrls: ["https://rpc.sepolia.org"],
  blockExplorerUrls: ["https://sepolia.etherscan.io"]
};

// NOISAI wallet address
export const NOISAI_WALLET = "0x9455579f25bcF26882Be32f22C8538e521D453d1";
