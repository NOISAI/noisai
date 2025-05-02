
import { useState } from "react";
import { Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface PanelCardProps {
  id: number;
  name: string;
  status: string;
  uptime: string;
  lastSync: string;
  avgNoise: number;
  peakNoise: number;
  carbonOffset: number;
  availableTokens: number;
}

export function PanelCard({
  id,
  name,
  status,
  uptime,
  lastSync,
  avgNoise,
  peakNoise,
  carbonOffset,
  availableTokens
}: PanelCardProps) {
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const { toast } = useToast();

  const handleClaimClick = () => {
    if (availableTokens <= 0) {
      toast({
        title: "No Tokens Available",
        description: "You don't have any tokens available to claim for this panel.",
        variant: "destructive"
      });
      return;
    }
    setIsClaimDialogOpen(true);
  };

  const handleClaimConfirm = async () => {
    setIsClaiming(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsClaiming(false);
      setIsClaimDialogOpen(false);
      
      toast({
        title: "Tokens Claimed Successfully",
        description: `${availableTokens} NOISAI tokens have been sent to your wallet.`,
      });
    }, 1500);
  };

  return (
    <>
      <Card key={id} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 card-enhanced">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-900 dark:text-white">{name}</h4>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
              status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 
              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}>
              {status}
            </span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-300 mb-4">
            <p>Uptime: {uptime}</p>
            <p>Last sync: {lastSync}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18.5V9.5M12 9.5L7 14.5M12 9.5L17 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V6.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="dark:text-gray-300">Avg: {avgNoise} dB</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-red-600 dark:text-red-400 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18.5V9.5M12 9.5L7 14.5M12 9.5L17 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V6.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="dark:text-gray-300">Peak: {peakNoise} dB</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-4">
            <div className="flex items-center">
              <Leaf className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-sm dark:text-gray-300">Carbon offset: {carbonOffset} kg</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Available tokens: {availableTokens}</span>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={handleClaimClick}
              disabled={availableTokens <= 0}
              className={`${
                availableTokens > 0 
                  ? 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/40 dark:hover:bg-blue-800/60 text-blue-800 dark:text-blue-300' 
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              Claim
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Claim Dialog */}
      <Dialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Claim NOISAI Tokens</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-300">
              You are about to claim {availableTokens} NOISAI tokens from the {name} panel.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tokens will be sent to your connected wallet address. This action cannot be undone.
            </p>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsClaimDialogOpen(false)}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleClaimConfirm}
              disabled={isClaiming}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isClaiming ? "Processing..." : "Confirm Claim"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
