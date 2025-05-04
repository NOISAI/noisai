
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { OrientationPrompt } from "@/components/shared/OrientationPrompt";
import InvestmentsList from "@/components/investor/InvestmentsList";

export default function Investments() {
  const { toast } = useToast();
  
  useEffect(() => {
    // Welcome toast when page loads
    toast({
      title: "Investment Opportunities",
      description: "Find and invest in new NOISAI opportunities.",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 border-b border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold">NOISAI Investments</h1>
          <a 
            href="/investor-dashboard" 
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md transition-colors text-sm"
          >
            Back to Dashboard
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <InvestmentsList />
      </main>
      
      <OrientationPrompt />
    </div>
  );
}
