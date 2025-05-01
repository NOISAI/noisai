
import { Wallet, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  walletAddress: string | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
}

const DashboardHeader = ({ walletAddress, isConnecting, connectWallet }: DashboardHeaderProps) => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/noisai-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
            alt="NOISAI Logo" 
            className="w-8 h-8 mr-2" 
          />
          <span className="text-[#22C55E] text-xl font-bold">NOISAI</span>
        </div>
        <div className="flex items-center space-x-4">
          {walletAddress ? (
            <div className="text-sm text-gray-400 flex items-center bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800">
              <Wallet className="w-4 h-4 mr-2 text-[#22C55E]" />
              <span>{walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}</span>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="flex items-center text-[#22C55E] border-gray-800 hover:bg-gray-900"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
          
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-gray-700">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
              <AvatarFallback className="bg-gray-800 text-gray-400">
                <UserCircle className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col">
              <span className="font-medium text-white text-sm">{user?.fullName || user?.username}</span>
              <span className="text-xs text-gray-400">{user?.primaryEmailAddress?.emailAddress}</span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
