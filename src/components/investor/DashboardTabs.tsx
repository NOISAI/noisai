
import { ChartPie, PiggyBank, History, FileText, User } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

const DashboardTabs = ({ activeTab, onTabChange, children }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-5 lg:grid-cols-5 mb-8 bg-gray-900 border border-gray-800">
        <TabsTrigger value="portfolio" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
          <ChartPie className="w-4 h-4 mr-2" /> Portfolio
        </TabsTrigger>
        <TabsTrigger value="investments" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
          <PiggyBank className="w-4 h-4 mr-2" /> Investments
        </TabsTrigger>
        <TabsTrigger value="interactions" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
          <History className="w-4 h-4 mr-2" /> History
        </TabsTrigger>
        <TabsTrigger value="documents" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
          <FileText className="w-4 h-4 mr-2" /> Documents
        </TabsTrigger>
        <TabsTrigger value="profile" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
          <User className="w-4 h-4 mr-2" /> Profile
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default DashboardTabs;
