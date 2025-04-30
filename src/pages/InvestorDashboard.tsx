
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useClerk } from "@clerk/clerk-react";
import { Wallet } from "lucide-react";

export default function InvestorDashboard() {
  const { toast } = useToast();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Welcome toast when dashboard loads
    toast({
      title: "Welcome to your investor dashboard",
      description: "This is where you'll manage your NOISAI investments.",
    });
  }, [toast]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setIsConnecting(true);
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          toast({
            title: "Wallet Connected",
            description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`,
          });
        }
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
        toast({
          title: "Connection Failed",
          description: "Could not connect to MetaMask. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsConnecting(false);
      }
    } else {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask browser extension to connect your wallet.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Investor Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">Investment Overview</h2>
            <p className="text-gray-400 mb-4">
              This dashboard is currently under development. Soon you'll be able to:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>View your investment portfolio</li>
              <li>Track performance metrics</li>
              <li>Participate in funding rounds</li>
              <li>Access exclusive investor documents</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
            <p className="text-gray-400 mb-6">
              Thank you for your interest in investing in NOISAI. Our team will contact you shortly with more information.
            </p>
            <Button className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-white">
              Complete Your Profile
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
