
import { Investment, TransactionDetails } from "@/types/investment";

interface PortfolioInvestment {
  id: string;
  name: string;
  amount: number;
  tokenAmount: number;
  date: string;
  status: "pending" | "approved" | "completed";
  txHash: string;
}

// Local storage key for portfolio investments
const PORTFOLIO_STORAGE_KEY = "noisai_portfolio_investments";

// Save portfolio investments to local storage
const savePortfolioInvestments = (investments: PortfolioInvestment[]) => {
  localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(investments));
};

// Get portfolio investments from local storage
export const getPortfolioInvestments = (): PortfolioInvestment[] => {
  const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error parsing portfolio data:", error);
    return [];
  }
};

// Add a new investment to portfolio
export const addInvestmentToPortfolio = (
  investment: Investment,
  transaction: TransactionDetails,
  dollarAmount: number
): PortfolioInvestment => {
  const portfolioInvestments = getPortfolioInvestments();
  
  // Create new portfolio investment
  const newInvestment: PortfolioInvestment = {
    id: `${investment.id}-${Date.now()}`,
    name: investment.name,
    amount: dollarAmount,
    tokenAmount: dollarAmount / 2000, // Convert from $ to ETH at ~$2000/ETH
    date: new Date().toISOString(),
    status: "pending",
    txHash: transaction.hash
  };
  
  // Add to existing investments
  portfolioInvestments.push(newInvestment);
  savePortfolioInvestments(portfolioInvestments);
  
  return newInvestment;
};

// Update investment amounts on target project
export const updateInvestmentProgress = (investmentId: number, amount: number) => {
  // In a real app with a backend, this would update the database
  // For now, we'll just store this in local storage
  
  const INVESTMENT_PROGRESS_KEY = "noisai_investment_progress";
  const storedProgress = localStorage.getItem(INVESTMENT_PROGRESS_KEY);
  const progressData = storedProgress ? JSON.parse(storedProgress) : {};
  
  // Update the progress for this investment
  if (!progressData[investmentId]) {
    progressData[investmentId] = amount;
  } else {
    progressData[investmentId] += amount;
  }
  
  localStorage.setItem(INVESTMENT_PROGRESS_KEY, JSON.stringify(progressData));
  
  return progressData[investmentId];
};

// Get the total invested amount from the portfolio
export const getTotalInvestedAmount = (): number => {
  const investments = getPortfolioInvestments();
  return investments.reduce((sum, inv) => sum + inv.amount, 0);
};

// Get additional portfolio stats
export const getPortfolioStats = () => {
  const investments = getPortfolioInvestments();
  const totalInvested = getTotalInvestedAmount();
  const pendingApproval = investments.filter(inv => inv.status === "pending").length;
  const totalTokens = investments.reduce((sum, inv) => sum + inv.tokenAmount, 0);
  
  return {
    totalInvested,
    pendingApproval,
    totalTokens,
    investmentCount: investments.length
  };
};
