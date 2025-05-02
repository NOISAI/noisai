
import { WalletConnectButton } from "./WalletConnectButton";

interface DashboardHeaderProps {
  walletAddress: string | null;
  setWalletAddress: (address: string) => void; // Kept for backward compatibility
  isConnecting?: boolean;
  connectWallet?: () => Promise<void>;
}

export function DashboardHeader({ 
  walletAddress, 
  setWalletAddress,
  isConnecting = false,
  connectWallet = async () => {}
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold text-black dark:text-white">NOISAI Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">User View - Monitor business panels and tokens</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <WalletConnectButton 
          walletAddress={walletAddress} 
          isConnecting={isConnecting}
          connectWallet={connectWallet} 
        />
      </div>
    </div>
  );
}
