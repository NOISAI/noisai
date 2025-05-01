
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Wallet, Zap, Activity, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useClerk } from "@clerk/clerk-react";

// Mock data - in a real app, this would come from an API
const mockBusinessPanels = [
  { id: 101, location: "HQ Building", status: "Active", efficiency: 91, energyGenerated: 312, tokensAvailable: 156 },
  { id: 102, location: "Branch Office 1", status: "Active", efficiency: 84, energyGenerated: 275, tokensAvailable: 138 },
  { id: 103, location: "Warehouse", status: "Maintenance", efficiency: 52, energyGenerated: 103, tokensAvailable: 51 },
];

export default function BusinessView() {
  const { toast } = useToast();
  const { user } = useClerk();
  const [panels, setPanels] = useState(mockBusinessPanels);
  const [isClaimOpen, setIsClaimOpen] = useState(false);
  const [claimingPanel, setClaimingPanel] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isClaiming, setIsClaiming] = useState(false);
  
  const totalTokensAvailable = panels.reduce((sum, panel) => sum + panel.tokensAvailable, 0);
  const totalEnergy = panels.reduce((sum, panel) => sum + panel.energyGenerated, 0);

  const handleClaimStart = (panel: any) => {
    setClaimingPanel(panel);
    setIsClaimOpen(true);
  };

  const handleClaimConfirm = async () => {
    if (!walletAddress) {
      toast({
        title: "Wallet Address Required",
        description: "Please enter a wallet address to claim your tokens.",
        variant: "destructive"
      });
      return;
    }

    setIsClaiming(true);

    // Simulate API call
    setTimeout(() => {
      setIsClaiming(false);
      setIsClaimOpen(false);
      
      // Update the panel's available tokens
      setPanels(prevPanels => 
        prevPanels.map(p => 
          p.id === claimingPanel.id 
            ? { ...p, tokensAvailable: 0 } 
            : p
        )
      );
      
      toast({
        title: "Tokens Claimed Successfully",
        description: `${claimingPanel.tokensAvailable} NOISAI tokens have been sent to your wallet.`,
      });
      
      // Reset
      setClaimingPanel(null);
      setWalletAddress("");
    }, 1500);
  };

  const handleClaimAll = () => {
    if (totalTokensAvailable <= 0) {
      toast({
        title: "No Tokens Available",
        description: "You don't have any tokens available to claim.",
        variant: "destructive"
      });
      return;
    }
    
    // For demo purposes, we'll just show a success message
    toast({
      title: "All Tokens Claimed",
      description: `${totalTokensAvailable} NOISAI tokens have been claimed successfully.`,
    });
    
    // Update all panels to have 0 available tokens
    setPanels(prevPanels => 
      prevPanels.map(p => ({ ...p, tokensAvailable: 0 }))
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Business Panel Dashboard</h2>
          <p className="text-gray-400">{user?.fullName || "Business"}'s Energy Panels</p>
        </div>
        <Button 
          onClick={handleClaimAll}
          disabled={totalTokensAvailable <= 0}
          className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
        >
          <Wallet className="h-4 w-4" />
          Claim All Tokens ({totalTokensAvailable})
        </Button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-gray-400 text-sm">
              <Activity className="mr-2 h-4 w-4 text-green-500" />
              Panels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{panels.length}</div>
            <p className="text-xs text-gray-400 mt-1">
              {panels.filter(p => p.status === "Active").length} active panels
            </p>
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
            <div className="text-2xl font-bold">{totalEnergy} kWh</div>
            <p className="text-xs text-gray-400 mt-1">Total energy produced</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-gray-400 text-sm">
              <Coins className="mr-2 h-4 w-4 text-green-500" />
              Tokens Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTokensAvailable} NOISAI</div>
            <p className="text-xs text-gray-400 mt-1">Claimable tokens</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Business Panels */}
      <Card className="bg-gray-900 border-gray-800 text-white">
        <CardHeader>
          <CardTitle>Your Energy Panels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {panels.map(panel => (
              <div key={panel.id} className="border border-gray-800 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white">{panel.location}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          panel.status === 'Active' ? 'bg-green-900 text-green-400' :
                          panel.status === 'Maintenance' ? 'bg-yellow-900 text-yellow-400' :
                          'bg-red-900 text-red-400'
                        }`}>
                          {panel.status}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">Panel ID: {panel.id}</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Efficiency</span>
                        <span>{panel.efficiency}%</span>
                      </div>
                      <Progress value={panel.efficiency} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-400">Energy Generated</p>
                        <p className="font-medium">{panel.energyGenerated} kWh</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Tokens Available</p>
                        <p className="font-medium">{panel.tokensAvailable} NOISAI</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Button 
                      onClick={() => handleClaimStart(panel)} 
                      disabled={panel.tokensAvailable <= 0}
                      className={`${
                        panel.tokensAvailable > 0 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-gray-700'
                      } flex-shrink-0`}
                    >
                      Claim Tokens
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Claim Dialog */}
      <Dialog open={isClaimOpen} onOpenChange={setIsClaimOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Claim NOISAI Tokens</DialogTitle>
            <DialogDescription className="text-gray-400">
              You are about to claim {claimingPanel?.tokensAvailable || 0} NOISAI tokens from the {claimingPanel?.location || ''} panel.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Your Wallet Address
            </label>
            <input
              type="text"
              placeholder="0x..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-md w-full"
            />
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsClaimOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleClaimConfirm}
              disabled={isClaiming || !walletAddress}
              className="bg-green-600 hover:bg-green-700"
            >
              {isClaiming ? "Processing..." : "Claim Tokens"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
