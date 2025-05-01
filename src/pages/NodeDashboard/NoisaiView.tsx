
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Network, Zap, Coins, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock data - in a real app, this would come from an API
const mockPanelData = [
  { id: 1, location: "Downtown Office", status: "Active", efficiency: 87, energyGenerated: 245, tokensGenerated: 120 },
  { id: 2, location: "City Park", status: "Active", efficiency: 92, energyGenerated: 310, tokensGenerated: 155 },
  { id: 3, location: "Shopping Mall", status: "Maintenance", efficiency: 45, energyGenerated: 95, tokensGenerated: 47 },
  { id: 4, location: "Train Station", status: "Active", efficiency: 78, energyGenerated: 215, tokensGenerated: 108 },
  { id: 5, location: "Airport", status: "Active", efficiency: 89, energyGenerated: 290, tokensGenerated: 145 },
  { id: 6, location: "University", status: "Inactive", efficiency: 0, energyGenerated: 0, tokensGenerated: 0 },
];

export default function NoisaiView() {
  const [panels, setPanels] = useState(mockPanelData);
  const [stats, setStats] = useState({
    totalPanels: 0,
    activePanels: 0,
    totalEnergy: 0,
    totalTokens: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Calculate dashboard stats
    const activePanels = panels.filter(p => p.status === "Active").length;
    const totalEnergy = panels.reduce((sum, panel) => sum + panel.energyGenerated, 0);
    const totalTokens = panels.reduce((sum, panel) => sum + panel.tokensGenerated, 0);
    
    setStats({
      totalPanels: panels.length,
      activePanels,
      totalEnergy,
      totalTokens
    });
  }, [panels]);

  const handleRefreshData = () => {
    toast({
      title: "Data Refreshed",
      description: "Panel data has been updated with the latest information.",
    });
    
    // In a real application, this would fetch new data
    // For now, we'll just simulate a refresh by slightly modifying the mock data
    setPanels(prevPanels => 
      prevPanels.map(panel => ({
        ...panel,
        efficiency: panel.status === "Active" ? Math.min(100, panel.efficiency + Math.floor(Math.random() * 5)) : panel.efficiency,
        energyGenerated: panel.status === "Active" ? panel.energyGenerated + Math.floor(Math.random() * 10) : panel.energyGenerated,
        tokensGenerated: panel.status === "Active" ? panel.tokensGenerated + Math.floor(Math.random() * 5) : panel.tokensGenerated,
      }))
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">NOISAI Administrator View</h2>
        <Button onClick={handleRefreshData} className="bg-green-600 hover:bg-green-700">
          Refresh Data
        </Button>
      </div>
      
      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-gray-400 text-sm">
              <Network className="mr-2 h-4 w-4 text-green-500" />
              Total Panels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPanels}</div>
            <p className="text-xs text-gray-400 mt-1">{stats.activePanels} active panels</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-gray-400 text-sm">
              <Activity className="mr-2 h-4 w-4 text-green-500" />
              Network Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.activePanels > 0 
                ? Math.round(panels.reduce((sum, p) => sum + p.efficiency, 0) / stats.totalPanels)
                : 0}%
            </div>
            <p className="text-xs text-gray-400 mt-1">Sound to energy conversion</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-gray-400 text-sm">
              <Zap className="mr-2 h-4 w-4 text-green-500" />
              Energy Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEnergy} kWh</div>
            <p className="text-xs text-gray-400 mt-1">Total harvested energy</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-gray-400 text-sm">
              <Coins className="mr-2 h-4 w-4 text-green-500" />
              Tokens Mined
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTokens} NOISAI</div>
            <p className="text-xs text-gray-400 mt-1">Total tokens generated</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Panel List */}
      <Card className="bg-gray-900 border-gray-800 text-white">
        <CardHeader>
          <CardTitle>All Network Panels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {panels.map(panel => (
              <div key={panel.id} className="border border-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-white">{panel.location}</h4>
                    <p className="text-sm text-gray-400">Panel ID: {panel.id}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    panel.status === 'Active' ? 'bg-green-900 text-green-400' :
                    panel.status === 'Maintenance' ? 'bg-yellow-900 text-yellow-400' :
                    'bg-red-900 text-red-400'
                  }`}>
                    {panel.status}
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Efficiency</span>
                      <span>{panel.efficiency}%</span>
                    </div>
                    <Progress value={panel.efficiency} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-xs text-gray-400">Energy Generated</p>
                      <p className="font-medium">{panel.energyGenerated} kWh</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Tokens Mined</p>
                      <p className="font-medium">{panel.tokensGenerated} NOISAI</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
