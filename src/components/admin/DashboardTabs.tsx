
import { Users, Phone, TrendingUp, FileText, UserCheck } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

// Import admin components
import InvestorManagement from "@/components/admin/InvestorManagement";
import InteractionTracking from "@/components/admin/InteractionTracking";
import InvestmentTracking from "@/components/admin/InvestmentTracking";
import ReportGenerator from "@/components/admin/ReportGenerator";
import ProfileRequests from "@/components/admin/ProfileRequests";

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  tabs: { id: string; label: string }[];
}

export default function DashboardTabs({ activeTab, onTabChange, tabs }: DashboardTabsProps) {
  const isMobile = useIsMobile();
  
  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>CRM Dashboard</CardTitle>
        <CardDescription>Manage investor relationships and track investments</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid grid-cols-3 sm:grid-cols-5 mb-4 sm:mb-8 bg-gray-800 border border-gray-700 overflow-x-auto">
            <TabsTrigger value="investors" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
              <Users className="w-4 h-4 sm:mr-2" /> {!isMobile ? "Investors" : ""}
            </TabsTrigger>
            <TabsTrigger value="interactions" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
              <Phone className="w-4 h-4 sm:mr-2" /> {!isMobile ? "Interactions" : ""}
            </TabsTrigger>
            <TabsTrigger value="investments" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
              <TrendingUp className="w-4 h-4 sm:mr-2" /> {!isMobile ? "Investments" : ""}
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
              <FileText className="w-4 h-4 sm:mr-2" /> {!isMobile ? "Reports" : ""}
            </TabsTrigger>
            <TabsTrigger value="profile-requests" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
              <UserCheck className="w-4 h-4 sm:mr-2" /> {!isMobile ? "Profiles" : ""}
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
          
          <TabsContent value="profile-requests">
            <ProfileRequests />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
