
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useClerk } from "@clerk/clerk-react";

export default function InvestorDashboard() {
  const { toast } = useToast();
  const { signOut } = useClerk();
  const navigate = useNavigate();

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
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
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
