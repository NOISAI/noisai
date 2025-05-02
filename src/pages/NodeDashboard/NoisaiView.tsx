
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Leaf, Volume, Wallet } from "lucide-react";
import { checkWalletBalance, getCurrentWalletAddress } from "@/services/blockchain/walletService";

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
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  
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
  
  // Check if wallet is connected on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    
    checkWalletConnection();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive"
      });
      return;
    }
    
    setIsConnecting(true);
    
    try {
      const address = await getCurrentWalletAddress();
      setWalletAddress(address);
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black">NOISAI Dashboard</h2>
          <p className="text-gray-600">User View - Monitor business panels and tokens</p>
        </div>
        
        <div>
          {walletAddress ? (
            <div className="flex items-center bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm">
              <Wallet className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-800 font-medium truncate w-32">
                {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
              </span>
            </div>
          ) : (
            <Button 
              onClick={connectWallet} 
              disabled={isConnecting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>
      </div>
      
      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Panels Card */}
        <Card className="border border-gray-200 bg-white overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  Your Panels 
                  <span className="inline-block w-4 h-4 rounded-full bg-gray-100 text-gray-400 text-xs flex items-center justify-center ml-1">?</span>
                </p>
                <h2 className="text-4xl font-bold mt-2">{stats.totalPanels}</h2>
                <div className="mt-1 inline-block px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">All Online</div>
                <p className="text-sm text-gray-500 mt-2">Active: {stats.activePanels}</p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-green-600">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tokens Generated Card */}
        <Card className="border border-gray-200 bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  Tokens Generated
                  <span className="inline-block w-4 h-4 rounded-full bg-gray-100 text-gray-400 text-xs flex items-center justify-center ml-1">?</span>
                </p>
                <h2 className="text-4xl font-bold mt-2">{stats.tokensGenerated.toLocaleString()}</h2>
                <p className="text-sm text-gray-500 mt-1">Value: ${stats.tokenValue}</p>
                <p className="text-sm text-green-600 mt-1">↑ 22% this month</p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-green-600">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M12 7v10M9 14l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Energy Generated Card */}
        <Card className="border border-gray-200 bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  Energy Generated
                  <span className="inline-block w-4 h-4 rounded-full bg-gray-100 text-gray-400 text-xs flex items-center justify-center ml-1">?</span>
                </p>
                <h2 className="text-4xl font-bold mt-2">{stats.energyGenerated} kWh</h2>
                <p className="text-sm text-gray-500 mt-1">Savings: ${stats.energySavings}</p>
                <p className="text-sm text-green-600 mt-1">↑ 8% vs yesterday</p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-green-600">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Carbon Offset Card */}
        <Card className="border border-gray-200 bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  Carbon Offset
                  <span className="inline-block w-4 h-4 rounded-full bg-gray-100 text-gray-400 text-xs flex items-center justify-center ml-1">?</span>
                </p>
                <h2 className="text-4xl font-bold mt-2">{stats.carbonOffset} kg</h2>
                <p className="text-sm text-gray-500 mt-1">Trees: {stats.trees}</p>
                <p className="text-sm text-green-600 mt-1">↑ 12% vs yesterday</p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
        <Card className="border border-gray-200 bg-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Weekly Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="#82ca9d" 
                    fillOpacity={1} 
                    fill="url(#colorEnergy)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tokens" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorTokens)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Noise Analysis */}
        <Card className="border border-gray-200 bg-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Noise Analysis</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Average Noise Level</p>
                  <p className="text-2xl font-bold">{stats.noiseLevel} dB</p>
                </div>
                <Volume className="h-6 w-6 text-blue-500" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Highest Peak</span>
                  <span>{stats.noisePeak} dB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Average Level</span>
                  <span>{stats.noiseLevel} dB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: '85%' }}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Carbon Offset</p>
                    <p className="text-2xl font-bold">{stats.carbonOffset} kg</p>
                  </div>
                  <Leaf className="h-6 w-6 text-green-500" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Equivalent Trees</span>
                  <span>{stats.trees}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: '40%' }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Goal Progress</span>
                  <span>41%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: '41%' }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Panels List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium text-gray-800">Your Panels</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
            {stats.activePanels} Active
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPanels.map(panel => (
            <Card key={panel.id} className="border border-gray-200 bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">{panel.name}</h4>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    panel.status === 'active' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {panel.status}
                  </span>
                </div>
                
                <div className="text-sm text-gray-500 mb-4">
                  <p>Uptime: {panel.uptime}</p>
                  <p>Last sync: {panel.lastSync}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-600 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 18.5V9.5M12 9.5L7 14.5M12 9.5L17 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6V6.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Avg: {panel.avgNoise} dB</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-red-600 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 18.5V9.5M12 9.5L7 14.5M12 9.5L17 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6V6.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Peak: {panel.peakNoise} dB</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="flex items-center">
                    <Leaf className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Carbon offset: {panel.carbonOffset} kg</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Available tokens: {panel.availableTokens}</span>
                  <Button variant="secondary" size="sm" className="bg-blue-100 hover:bg-blue-200 text-blue-800">
                    Claim
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
