
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Volume } from "lucide-react";
import { DashboardHeader } from "@/components/node-dashboard/DashboardHeader";
import { StatsOverview } from "@/components/node-dashboard/StatsOverview";
import { PerformanceChart } from "@/components/node-dashboard/PerformanceChart";
import { NoiseAnalysisCard } from "@/components/node-dashboard/NoiseAnalysisCard";
import { PanelsList } from "@/components/node-dashboard/PanelsList";
import { useWalletConnection } from "@/hooks/useWalletConnection";

// Mock data for the weekly performance chart
const weeklyData = [
  { name: 'Mon', energy: 180, tokens: 120 },
  { name: 'Tue', energy: 200, tokens: 130 },
  { name: 'Wed', energy: 190, tokens: 125 },
  { name: 'Thu', energy: 210, tokens: 145 },
  { name: 'Fri', energy: 250, tokens: 180 },
  { name: 'Sat', energy: 220, tokens: 160 },
  { name: 'Sun', energy: 170, tokens: 110 }
];

// Mock data for user panels
const mockPanels = [
  { 
    id: 1, 
    name: "City Coffee #1", 
    status: "active",
    uptime: "45d 9h 30m", 
    lastSync: "7 minutes ago",
    avgNoise: 78,
    peakNoise: 85,
    carbonOffset: 124.5,
    availableTokens: 325
  },
  { 
    id: 2, 
    name: "City Coffee #2", 
    status: "active",
    uptime: "30d 5h 15m", 
    lastSync: "10 minutes ago",
    avgNoise: 72,
    peakNoise: 80,
    carbonOffset: 98.3,
    availableTokens: 270
  },
  { 
    id: 3, 
    name: "Downtown Mall", 
    status: "active",
    uptime: "60d 2h 45m", 
    lastSync: "4 minutes ago",
    avgNoise: 83,
    peakNoise: 91,
    carbonOffset: 187.9,
    availableTokens: 720
  }
];

export default function NoisaiView() {
  // Use our custom wallet connection hook
  const { walletAddress, isConnecting, connectWallet } = useWalletConnection();
  
  // Dashboard stats
  const [stats, setStats] = useState({
    totalPanels: 3,
    activePanels: 3,
    tokensGenerated: 1315,
    tokenValue: 263,
    energyGenerated: 583,
    energySavings: 117,
    carbonOffset: 410.7,
    trees: 16,
    noiseLevel: 77.7,
    noisePeak: 91,
  });

  return (
    <div className="space-y-8">
      <DashboardHeader 
        walletAddress={walletAddress} 
        setWalletAddress={() => {}} // This prop is no longer needed but kept for compatibility
        isConnecting={isConnecting}
        connectWallet={connectWallet}
      />
      
      {/* Stats Overview Grid */}
      <StatsOverview stats={stats} />
      
      {/* Noise Level Card */}
      <Card className="border border-gray-200 bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 flex items-center">
                Noise Levels
                <span className="inline-block w-4 h-4 rounded-full bg-gray-100 text-gray-400 text-xs flex items-center justify-center ml-1">?</span>
              </p>
              <h2 className="text-4xl font-bold mt-2">{stats.noiseLevel} dB</h2>
              <p className="text-sm text-gray-500 mt-1">Peak: {stats.noisePeak} dB</p>
              <p className="text-sm text-red-600 mt-1">↓ 5% vs yesterday</p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <Volume className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance Chart */}
        <PerformanceChart 
          title="Weekly Performance" 
          data={weeklyData} 
        />
        
        {/* Noise Analysis */}
        <NoiseAnalysisCard 
          noiseLevel={stats.noiseLevel} 
          noisePeak={stats.noisePeak}
          carbonOffset={stats.carbonOffset}
          trees={stats.trees}
        />
      </div>
      
      {/* Panels List */}
      <PanelsList panels={mockPanels} activePanels={stats.activePanels} />
    </div>
  );
}
