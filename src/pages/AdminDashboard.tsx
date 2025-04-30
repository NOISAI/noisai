
import { useState } from "react";
import { Users, Phone, TrendingUp, FileText, Search, UserPlus, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Import admin components
import InvestorManagement from "@/components/admin/InvestorManagement";
import InteractionTracking from "@/components/admin/InteractionTracking";
import InvestmentTracking from "@/components/admin/InvestmentTracking";
import ReportGenerator from "@/components/admin/ReportGenerator";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("investors");

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
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white"
            onClick={() => window.location.href = "/investor-dashboard"}
          >
            Exit Admin Mode
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400">Manage investors, track interactions, and generate reports</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="bg-gray-900 border-gray-800 pl-8 w-48 md:w-64"
              />
            </div>
            <Button className="bg-[#22C55E] hover:bg-[#1ea853] text-black">
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
                  <h3 className="text-2xl font-bold">12</h3>
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
                  <h3 className="text-2xl font-bold">5</h3>
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
                  <h3 className="text-2xl font-bold">$124,500</h3>
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
                  <h3 className="text-2xl font-bold">7</h3>
                </div>
                <div className="p-2 bg-[#22C55E]/10 rounded-full">
                  <FileText className="w-5 h-5 text-[#22C55E]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
}
