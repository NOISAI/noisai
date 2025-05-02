
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { PanelHeader } from "./PanelHeader";
import { PanelStats } from "./PanelStats";
import { ClaimTokenDialog } from "./ClaimTokenDialog";

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
  onTokensClaimed?: (panelId: number) => void;
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
  availableTokens,
  onTokensClaimed
}: PanelCardProps) {
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const { toast } = useToast();
  const { walletAddress, connectWallet } = useWalletConnection();

  const handleClaimClick = async () => {
    if (availableTokens <= 0) {
      toast({
        title: "No Tokens Available",
        description: "You don't have any tokens available to claim for this panel.",
        variant: "destructive"
      });
      return;
    }
    
    // If wallet is not connected, directly trigger MetaMask popup
    if (!walletAddress) {
      try {
        await connectWallet();
        // Only open claim dialog if wallet connection was successful
        if (window.ethereum && await window.ethereum.request({ method: 'eth_accounts' }).then(accounts => accounts.length > 0)) {
          setIsClaimDialogOpen(true);
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        toast({
          title: "Wallet Connection Failed",
          description: "Please make sure MetaMask is installed and unlocked.",
          variant: "destructive"
        });
      }
      return;
    }
    
    // If already connected, proceed to open dialog
    setIsClaimDialogOpen(true);
  };

  const handleClaimSuccess = () => {
    // Notify parent component about claimed tokens
    if (onTokensClaimed) {
      onTokensClaimed(id);
    }
  };

  return (
    <>
      <Card key={id} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 card-enhanced">
        <CardContent className="p-6">
          <PanelHeader
            name={name}
            status={status}
            uptime={uptime}
            lastSync={lastSync}
          />
          
          <PanelStats
            avgNoise={avgNoise}
            peakNoise={peakNoise}
            carbonOffset={carbonOffset}
            availableTokens={availableTokens}
            onClaimClick={handleClaimClick}
          />
        </CardContent>
      </Card>

      <ClaimTokenDialog
        isOpen={isClaimDialogOpen}
        setIsOpen={setIsClaimDialogOpen}
        walletAddress={walletAddress}
        availableTokens={availableTokens}
        panelName={name}
        onClaimSuccess={handleClaimSuccess}
      />
    </>
  );
}
