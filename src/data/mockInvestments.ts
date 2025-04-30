
import { Investment, InvestorApproval, InvestorRequirements } from "@/types/investment";

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
