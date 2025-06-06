
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface WalletConnectButtonProps {
  walletAddress: string | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
}

export function WalletConnectButton({ walletAddress, isConnecting, connectWallet }: WalletConnectButtonProps) {
  return (
    <>
      {walletAddress ? (
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700 shadow-sm">
          <Wallet className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-sm text-gray-800 dark:text-gray-200 font-medium truncate w-32">
            {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
          </span>
        </div>
      ) : (
        <Button 
          onClick={connectWallet} 
          disabled={isConnecting}
          className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600"
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </>
  );
}
