
import { WalletConnectButton } from "./WalletConnectButton";

interface DashboardHeaderProps {
  walletAddress: string | null;
  setWalletAddress: (address: string) => void;
}

export function DashboardHeader({ walletAddress, setWalletAddress }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold text-black">NOISAI Dashboard</h2>
        <p className="text-gray-600">User View - Monitor business panels and tokens</p>
      </div>
      
      <div>
        <WalletConnectButton 
          walletAddress={walletAddress} 
          setWalletAddress={setWalletAddress} 
        />
      </div>
    </div>
  );
}
