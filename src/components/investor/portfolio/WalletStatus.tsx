
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wallet, AlertCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface WalletStatusProps {
  walletAddress: string | null;
  ethBalance: number;
  requiredEth: number;
  isLoading: boolean;
}

const WalletStatus = ({ walletAddress, ethBalance, requiredEth, isLoading }: WalletStatusProps) => {
  const isMobile = useIsMobile();
  const hasEnoughFunds = ethBalance >= requiredEth;
  
  // Format wallet address for display
  const shortenedAddress = walletAddress 
    ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
    : null;
  
  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-1">
          <CardTitle className="flex items-center">
            <Wallet className="h-5 w-5 mr-2 text-[#22C55E]" />
            Wallet Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-12 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading wallet information...</div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!walletAddress) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-1">
          <CardTitle className="flex items-center">
            <Wallet className="h-5 w-5 mr-2 text-[#22C55E]" />
            Wallet Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <p className="text-lg font-medium text-gray-300">No Wallet Connected</p>
              <p className="text-gray-400 text-sm">Connect your wallet to invest in NOISAI</p>
            </div>
            <Link to="/profile">
              <Button className="w-full sm:w-auto bg-[#22C55E] hover:bg-[#1ea853]">
                Connect Wallet
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-1">
        <CardTitle className="flex items-center">
          <Wallet className="h-5 w-5 mr-2 text-[#22C55E]" />
          Wallet Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start justify-between">
          <div className="mb-4 sm:mb-0 w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-4 mb-2">
              <div>
                <span className="text-gray-400 text-sm">Address:</span>
                <p className="text-sm font-medium text-white bg-gray-800 px-2 py-1 rounded">
                  {shortenedAddress}
                </p>
              </div>
              
              <div>
                <span className="text-gray-400 text-sm">ETH Balance:</span>
                <p className="text-sm font-medium text-white bg-gray-800 px-2 py-1 rounded">
                  {ethBalance.toFixed(4)} ETH
                </p>
              </div>
            </div>
            
            {!hasEnoughFunds && (
              <div className="flex items-center gap-2 mt-3 text-sm text-red-400 bg-red-900/20 px-3 py-2 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span>Insufficient balance for minimum investment ({requiredEth} ETH required)</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Link to="/profile" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto text-sm border-gray-700 hover:bg-gray-800">
                Manage Wallet
              </Button>
            </Link>
            
            <Link to="/investments" className="w-full sm:w-auto">
              <Button 
                className={`w-full sm:w-auto text-sm ${hasEnoughFunds ? 'bg-[#22C55E] hover:bg-[#1ea853]' : 'bg-gray-700 hover:bg-gray-600 cursor-not-allowed'}`}
                disabled={!hasEnoughFunds}
              >
                Invest Now
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletStatus;
