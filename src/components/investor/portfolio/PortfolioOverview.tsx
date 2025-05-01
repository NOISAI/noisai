
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Investment } from "@/types/investment";
import { mockInvestments } from "@/data/mockInvestments";
import { convertInvestmentsForInvestor } from "@/utils/typeAdapters";
import { checkWalletBalance, getCurrentWalletAddress } from "@/services/blockchain";
import { getPortfolioInvestments, getPortfolioStats } from "@/services/portfolioService";

// Import the new component files
import InvestmentMetrics from "./InvestmentMetrics";
import WalletStatus from "./WalletStatus";
import InvestmentSummary from "./InvestmentSummary";
import { PiggyBank } from "lucide-react";

const PortfolioOverview = () => {
  const [investmentOpportunities, setInvestmentOpportunities] = useState<Investment[]>([]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState<number>(0);
  const [requiredEth, setRequiredEth] = useState<number>(0.005); // Default ~$10 worth of ETH
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioStats, setPortfolioStats] = useState({
    totalInvested: 0,
    pendingApproval: 0,
    totalTokens: 0,
    investmentCount: 0
  });
  const [userInvestments, setUserInvestments] = useState<any[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Use the same data source and conversion as InvestmentsList
    const investmentsForInvestors = convertInvestmentsForInvestor(mockInvestments);
    setInvestmentOpportunities(investmentsForInvestors);
    
    // Load portfolio investments from local storage
    const investments = getPortfolioInvestments();
    setUserInvestments(investments);
    
    // Get portfolio stats
    const stats = getPortfolioStats();
    setPortfolioStats(stats);
  }, []);

  // Check if wallet is connected and get balance
  useEffect(() => {
    const fetchWalletDetails = async () => {
      if (!window.ethereum) return;
      
      try {
        setIsLoading(true);
        // Get address
        const address = await getCurrentWalletAddress().catch(() => null);
        setWalletAddress(address);
        
        // If we have an address, get balances
        if (address) {
          const balanceInfo = await checkWalletBalance();
          
          setEthBalance(balanceInfo.balance);
          setRequiredEth(balanceInfo.requiredAmount);
          
          // Show warning if balance is too low
          if (!balanceInfo.hasEnoughFunds) {
            toast({
              title: "Low Balance Warning",
              description: `Your wallet doesn't have enough ETH for minimum investment. Please add funds to your wallet.`,
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching wallet details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWalletDetails();
  }, [toast]);

  // Calculate current value (simple estimation for demo purposes)
  const currentValue = portfolioStats.totalInvested * 1.1; // 10% ROI for demo
  const roi = portfolioStats.totalInvested > 0 
    ? ((currentValue / portfolioStats.totalInvested) - 1) * 100 
    : 0;

  return (
    <div className="space-y-8">
      <InvestmentMetrics 
        totalInvested={portfolioStats.totalInvested}
        currentValue={currentValue}
        roi={roi}
        investmentCount={portfolioStats.investmentCount}
        investmentOpportunities={investmentOpportunities}
      />
      
      <WalletStatus
        walletAddress={walletAddress}
        ethBalance={ethBalance}
        requiredEth={requiredEth}
        isLoading={isLoading}
      />
      
      <InvestmentSummary 
        userInvestments={userInvestments}
        portfolioStats={portfolioStats}
        investmentOpportunities={investmentOpportunities.length}
      />
    </div>
  );
};

export default PortfolioOverview;
