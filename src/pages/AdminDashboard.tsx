import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Import custom hooks
import { useInvestors } from "@/hooks/useInvestors";
import { useInteractions } from "@/hooks/useInteractions";
import { useInvestments } from "@/hooks/useInvestments";
import { useReports } from "@/hooks/useReports";

// Import refactored components
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSearchBar from "@/components/admin/AdminSearchBar";
import DashboardStats from "@/components/admin/DashboardStats";
import WelcomeAlert from "@/components/admin/WelcomeAlert";
import DashboardTabs from "@/components/admin/DashboardTabs";
import ProfileRequests from "@/components/admin/ProfileRequests";
import { TabsContent } from "@/components/ui/tabs";

export default function AdminDashboard() {
  const { toast } = useToast();
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
  
  return (
    <div className="min-h-screen bg-black text-white">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AdminSearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
          onAddInvestorClick={handleAddInvestorClick}
        />

        <DashboardStats 
          investors={investors}
          interactionsCount={interactions.length}
          totalInvestment={stats.totalInvestment}
          reportsCount={reports.length}
        />

        <WelcomeAlert />

        <DashboardTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={[
            { id: "investors", label: "Investors" },
            { id: "investments", label: "Investments" },
            { id: "interactions", label: "Interactions" },
            { id: "reports", label: "Reports" },
            { id: "profile-requests", label: "Profile Requests" }
          ]}
        >
          {/* Existing tab content will be kept */}
          
          <TabsContent value="profile-requests">
            <ProfileRequests />
          </TabsContent>
        </DashboardTabs>
      </main>
    </div>
  );
}
