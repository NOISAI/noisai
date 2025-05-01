
import { ChartPie, LineChart, Briefcase, PiggyBank, Wallet as WalletIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { mockInvestments } from "@/data/mockInvestments";
import { convertInvestmentsForInvestor } from "@/utils/typeAdapters";
import { Investment } from "@/types/investment";
import { checkWalletBalance, getCurrentWalletAddress } from "@/services/blockchainService";
import { useToast } from "@/hooks/use-toast";

const PortfolioOverview = () => {
  const [investmentOpportunities, setInvestmentOpportunities] = useState<Investment[]>([]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<{USDC: number, USDT: number}>({ USDC: 0, USDT: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Use the same data source and conversion as InvestmentsList
    const investmentsForInvestors = convertInvestmentsForInvestor(mockInvestments);
    setInvestmentOpportunities(investmentsForInvestors);
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
          const usdcBalanceInfo = await checkWalletBalance("USDC");
          const usdtBalanceInfo = await checkWalletBalance("USDT");
          
          setWalletBalance({
            USDC: usdcBalanceInfo.balance,
            USDT: usdtBalanceInfo.balance
          });
          
          // Show warning if balance is too low
          if (!usdcBalanceInfo.hasEnoughFunds && !usdtBalanceInfo.hasEnoughFunds) {
            toast({
              title: "Low Balance Warning",
              description: `Your wallet doesn't have enough USDC or USDT for minimum investment. Please add funds to your wallet.`,
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

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PiggyBank className="w-5 h-5 mr-2 text-[#22C55E]" />
              Total Investments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0</p>
            <p className="text-sm text-gray-400">No active investments</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="w-5 h-5 mr-2 text-[#22C55E]" />
              Current Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0</p>
            <p className="text-sm text-gray-400">0% ROI</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-[#22C55E]" />
              Investment Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{investmentOpportunities.length}</p>
            <p className="text-sm text-yellow-500">
              {investmentOpportunities.length === 1 
                ? "Seed Sale Running" 
                : `${investmentOpportunities.length} Investments Running`}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Wallet Balance Card */}
      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <WalletIcon className="w-5 h-5 mr-2 text-[#22C55E]" />
            Wallet Status
          </CardTitle>
          <CardDescription>Your current wallet balance</CardDescription>
        </CardHeader>
        <CardContent>
          {walletAddress ? (
            <div className="space-y-4">
              <div className="p-4 rounded-md bg-gray-800 border border-gray-700">
                <p className="text-sm text-gray-400">Connected Address:</p>
                <p className="text-sm font-mono truncate">{walletAddress}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-md">
                  <p className="text-sm text-gray-400">USDC Balance:</p>
                  <p className="text-xl font-bold">{walletBalance.USDC.toFixed(2)} USDC</p>
                  {walletBalance.USDC < 10 && (
                    <p className="text-xs text-red-400 mt-1">
                      Balance too low for minimum investment ($10)
                    </p>
                  )}
                </div>
                
                <div className="bg-gray-800 p-4 rounded-md">
                  <p className="text-sm text-gray-400">USDT Balance:</p>
                  <p className="text-xl font-bold">{walletBalance.USDT.toFixed(2)} USDT</p>
                  {walletBalance.USDT < 10 && (
                    <p className="text-xs text-red-400 mt-1">
                      Balance too low for minimum investment ($10)
                    </p>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-md">
                <p className="text-sm text-gray-400">Network:</p>
                <p className="text-green-500 font-medium">Sepolia Test Network</p>
                <p className="text-xs text-gray-400 mt-1">
                  Note: This is a test network. You can get test tokens from Sepolia faucets.
                </p>
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center p-6">
              <p className="text-gray-400">Loading wallet information...</p>
            </div>
          ) : (
            <div className="bg-gray-800 p-6 rounded-md border border-dashed border-gray-700 flex flex-col items-center">
              <WalletIcon className="w-12 h-12 text-gray-600 mb-4" />
              <p className="text-gray-400 text-center">Connect your wallet to see balance information</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle>Investment Summary</CardTitle>
          <CardDescription>Your current investment portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border border-gray-800 rounded-md bg-gray-950 mb-4">
            <div className="text-center">
              <p className="text-gray-400 mb-2">No active investments</p>
              <p className="text-[#22C55E]">
                {investmentOpportunities.length === 1 
                  ? "NOISAI Seed Sale is now open" 
                  : `${investmentOpportunities.length} NOISAI investment opportunities available`}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">NOISAI Tokens</p>
              <p className="text-xl font-bold">0</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">Equity Share</p>
              <p className="text-xl font-bold">0%</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">Investment Status</p>
              <p className="text-xl font-bold text-gray-400">None</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">Investor Status</p>
              <p className="text-xl font-bold text-gray-400">Not Active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioOverview;
