
import { Users, Phone, TrendingUp, FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Import admin components
import InvestorManagement from "@/components/admin/InvestorManagement";
import InteractionTracking from "@/components/admin/InteractionTracking";
import InvestmentTracking from "@/components/admin/InvestmentTracking";
import ReportGenerator from "@/components/admin/ReportGenerator";

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>CRM Dashboard</CardTitle>
        <CardDescription>Manage investor relationships and track investments</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
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
  );
}
