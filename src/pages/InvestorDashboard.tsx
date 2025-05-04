import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { useIsMobile } from "@/hooks/use-mobile";

// Import refactored components
import DashboardHeader from "@/components/investor/DashboardHeader";
import DashboardTabs from "@/components/investor/DashboardTabs";
import PortfolioOverview from "@/components/investor/portfolio/PortfolioOverview";
import InvestmentsList from "@/components/investor/InvestmentsList";
import InteractionHistory from "@/components/investor/InteractionHistory";
import DocumentManagement from "@/components/investor/DocumentManagement";
import ProfileManagement from "@/components/investor/ProfileManagement";
import { OrientationPrompt } from "@/components/shared/OrientationPrompt";

export default function InvestorDashboard() {
  const { toast } = useToast();
  const { permissions } = useRolePermissions();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio");
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Welcome toast when dashboard loads
    toast({
      title: "Welcome to your investor dashboard",
      description: "This is where you'll manage your NOISAI investments.",
    });
  }, [toast]);

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
      <DashboardHeader 
        walletAddress={walletAddress} 
        isConnecting={isConnecting}
        connectWallet={connectWallet}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold">Investor Dashboard</h1>
          {permissions.canAccessNoisaiView && (
            <Link 
              to="/node-dashboard"
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-colors text-sm sm:text-base"
            >
              Go to Node Dashboard
            </Link>
          )}
        </div>
        
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab}>
          <TabsContent value="portfolio" className="mt-2 sm:mt-4">
            <PortfolioOverview />
          </TabsContent>

          <TabsContent value="investments" className="mt-2 sm:mt-4">
            <InvestmentsList />
          </TabsContent>

          <TabsContent value="interactions" className="mt-2 sm:mt-4">
            <InteractionHistory />
          </TabsContent>

          <TabsContent value="documents" className="mt-2 sm:mt-4">
            <DocumentManagement />
          </TabsContent>

          <TabsContent value="profile" className="mt-2 sm:mt-4">
            <ProfileManagement />
          </TabsContent>
        </DashboardTabs>
      </main>
      
      <OrientationPrompt />
    </div>
  );
}
