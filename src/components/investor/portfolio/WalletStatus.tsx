
import { Wallet as WalletIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WalletStatusProps {
  walletAddress: string | null;
  ethBalance: number;
  requiredEth: number;
  isLoading: boolean;
}

const WalletStatus = ({ 
  walletAddress, 
  ethBalance, 
  requiredEth, 
  isLoading 
}: WalletStatusProps) => {
  return (
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
            
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">ETH Balance:</p>
              <p className="text-xl font-bold">{ethBalance.toFixed(6)} ETH</p>
              {ethBalance < requiredEth && (
                <p className="text-xs text-red-400 mt-1">
                  Balance too low for minimum investment (need {requiredEth.toFixed(6)} ETH ≈ $10)
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                Assuming ETH price of ~$2000, minimum investment is {requiredEth.toFixed(6)} ETH
              </p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-400">Network:</p>
              <p className="text-green-500 font-medium">Sepolia Test Network</p>
              <p className="text-xs text-gray-400 mt-1">
                Note: This is a test network. You can get test ETH from Sepolia faucets.
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
  );
};

export default WalletStatus;
