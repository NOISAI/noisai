
import { WalletConnectButton } from "./WalletConnectButton";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">NOISAI Dashboard</h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">User View - Monitor business panels and tokens</p>
      </div>
      
      <div className="w-full sm:w-auto">
        <WalletConnectButton 
          walletAddress={walletAddress} 
          isConnecting={isConnecting}
          connectWallet={connectWallet} 
        />
      </div>
    </div>
  );
}
