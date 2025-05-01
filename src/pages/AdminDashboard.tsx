
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Users, Phone, TrendingUp, FileText, Search, UserPlus, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Import admin components
import InvestorManagement from "@/components/admin/InvestorManagement";
import InteractionTracking from "@/components/admin/InteractionTracking";
import InvestmentTracking from "@/components/admin/InvestmentTracking";
import ReportGenerator from "@/components/admin/ReportGenerator";

// Import hooks
import { useInvestors } from "@/hooks/useInvestors";
import { useInteractions } from "@/hooks/useInteractions";
import { useInvestments } from "@/hooks/useInvestments";
import { useReports } from "@/hooks/useReports";

export default function AdminDashboard() {
  const { user } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("investors");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get data from hooks
  const { investors } = useInvestors();
  const { interactions } = useInteractions();
  const { investments, stats } = useInvestments();
  const { reports } = useReports();
  
  // Handle global search
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Determine which tab should be active based on search results
    const investorResults = investors.filter(
      i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           i.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const interactionResults = interactions.filter(
      i => i.investor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           i.notes.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const investmentResults = investments.filter(
      i => i.investor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           i.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Set tab with most results as active
    const resultCounts = [
      { tab: "investors", count: investorResults.length },
      { tab: "interactions", count: interactionResults.length },
      { tab: "investments", count: investmentResults.length }
    ];
    
    const mostResultsTab = resultCounts.reduce((max, obj) => 
      obj.count > max.count ? obj : max, resultCounts[0]
    ).tab;
    
    setActiveTab(mostResultsTab);
    
    toast({
      title: "Search Results",
      description: `Found ${investorResults.length} investors, ${interactionResults.length} interactions, and ${investmentResults.length} investments.`,
    });
  };
  
  const handleAddInvestorClick = () => {
    setActiveTab("investors");
    // The InvestorManagement component handles the actual form dialog
    document.querySelector<HTMLButtonElement>('[data-add-investor-button="true"]')?.click();
  };

  // Update to redirect to home page when exiting admin mode
  const handleExitAdmin = () => {
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/noisai-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
              alt="NOISAI Logo" 
              className="w-8 h-8 mr-2" 
            />
            <div>
              <span className="text-[#22C55E] text-xl font-bold">NOISAI</span>
              <span className="ml-2 text-gray-400 text-sm">Admin Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Logged in as:</span>
              <span className="font-medium text-white">{user?.primaryEmailAddress?.emailAddress}</span>
            </div>
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white"
              onClick={handleExitAdmin}
            >
              Exit Admin Mode
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400">Manage investors, track interactions, and generate reports</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <div className="relative flex items-center">
              <Input 
                type="search" 
                placeholder="Search..." 
                className="bg-gray-900 border-gray-800 pl-8 w-48 md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Search 
                className="absolute left-2.5 h-4 w-4 text-gray-400 cursor-pointer" 
                onClick={handleSearch} 
              />
            </div>
            <Button 
              className="bg-[#22C55E] hover:bg-[#1ea853] text-black"
              onClick={handleAddInvestorClick}
            >
              <UserPlus size={16} className="mr-1" />
              New Investor
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Investors</p>
                  <h3 className="text-2xl font-bold">{investors.length}</h3>
                </div>
                <div className="p-2 bg-[#22C55E]/10 rounded-full">
                  <Users className="w-5 h-5 text-[#22C55E]" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Recent Interactions</p>
                  <h3 className="text-2xl font-bold">{interactions.length}</h3>
                </div>
                <div className="p-2 bg-[#22C55E]/10 rounded-full">
                  <Phone className="w-5 h-5 text-[#22C55E]" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Investments</p>
                  <h3 className="text-2xl font-bold">${stats.totalInvestment.toLocaleString()}</h3>
                </div>
                <div className="p-2 bg-[#22C55E]/10 rounded-full">
                  <TrendingUp className="w-5 h-5 text-[#22C55E]" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Generated Reports</p>
                  <h3 className="text-2xl font-bold">{reports.length}</h3>
                </div>
                <div className="p-2 bg-[#22C55E]/10 rounded-full">
                  <FileText className="w-5 h-5 text-[#22C55E]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Alert className="bg-blue-900/20 border border-blue-800 mb-6">
          <AlertTitle className="text-blue-300">Getting Started with the Admin Dashboard</AlertTitle>
          <AlertDescription className="text-blue-200">
            <p className="mb-2">Welcome to the NOISAI admin dashboard. Here you can manage investors, track interactions, monitor investments, and generate reports.</p>
            <Button 
              variant="link" 
              className="text-[#22C55E] p-0 h-auto font-normal flex items-center hover:text-[#22C55E]/80"
            >
              View the admin guide <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </AlertDescription>
        </Alert>

        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <CardTitle>CRM Dashboard</CardTitle>
            <CardDescription>Manage investor relationships and track investments</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8 bg-gray-800 border border-gray-700">
                <TabsTrigger value="investors" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
                  <Users className="w-4 h-4 mr-2" /> Investors
                </TabsTrigger>
                <TabsTrigger value="interactions" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
                  <Phone className="w-4 h-4 mr-2" /> Interactions
                </TabsTrigger>
                <TabsTrigger value="investments" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
                  <TrendingUp className="w-4 h-4 mr-2" /> Investments
                </TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
                  <FileText className="w-4 h-4 mr-2" /> Reports
                </TabsTrigger>
              </TabsList>

              <TabsContent value="investors">
                <InvestorManagement />
              </TabsContent>

              <TabsContent value="interactions">
                <InteractionTracking />
              </TabsContent>

              <TabsContent value="investments">
                <InvestmentTracking />
              </TabsContent>

              <TabsContent value="reports">
                <ReportGenerator />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
