
import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Mock data for wallets
const mockWallets = [
  { id: 1, name: "Ethereum Wallet", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", balance: "2.5 ETH" },
  { id: 2, name: "Bitcoin Wallet", address: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5", balance: "0.15 BTC" },
];

interface WalletManagementProps {
  walletAddress: string | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
}

const WalletManagement = ({ walletAddress, isConnecting, connectWallet }: WalletManagementProps) => {
  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>Connected Wallets</CardTitle>
        <CardDescription>Manage your cryptocurrency wallets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {walletAddress && (
            <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-[#22C55E]" />
                  <span className="font-semibold">MetaMask Wallet</span>
                </div>
                <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">Connected</span>
              </div>
              <p className="text-sm text-gray-400 break-all">{walletAddress}</p>
            </div>
          )}
          
          {mockWallets.map(wallet => (
            <div key={wallet.id} className="bg-gray-800 p-4 rounded-md border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-[#22C55E]" />
                  <span className="font-semibold">{wallet.name}</span>
                </div>
                <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">Connected</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{wallet.address}</p>
              <p className="text-sm font-semibold">Balance: <span className="text-[#22C55E]">{wallet.balance}</span></p>
            </div>
          ))}
          
          {!walletAddress && (
            <div className="bg-gray-800 p-6 rounded-md border border-dashed border-gray-700 flex flex-col items-center justify-center">
              <Wallet className="w-12 h-12 text-gray-600 mb-4" />
              <p className="text-gray-400 mb-4 text-center">Connect your MetaMask wallet to manage your investments</p>
              <Button 
                onClick={connectWallet}
                disabled={isConnecting}
                className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-black"
              >
                {isConnecting ? "Connecting..." : "Connect MetaMask"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletManagement;
