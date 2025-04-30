import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useClerk } from "@clerk/clerk-react";
import { 
  Wallet, 
  ChartPie, 
  History, 
  FileText, 
  DollarSign, 
  Briefcase,
  User,
  BarChart,
  PiggyBank,
  LineChart
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for the investor dashboard
const mockInvestments = [
  { id: 1, name: "NOISAI Seed Round", amount: 50000, date: "2025-01-15", status: "Active", roi: "+12.5%" },
  { id: 2, name: "NOISAI Series A", amount: 75000, date: "2025-02-28", status: "Pending", roi: "0%" },
];

const mockInteractions = [
  { id: 1, date: "2025-04-20", type: "Meeting", description: "Q1 Investor Update Meeting", status: "Completed" },
  { id: 2, date: "2025-03-10", type: "Email", description: "Investment Opportunity Details", status: "Completed" },
  { id: 3, date: "2025-02-15", type: "Document", description: "Signed Investment Agreement", status: "Completed" },
];

const mockDocuments = [
  { id: 1, name: "Investment Contract.pdf", type: "Contract", date: "2025-01-15", size: "2.4 MB" },
  { id: 2, name: "Q1 Financial Report.pdf", type: "Report", date: "2025-04-05", size: "3.7 MB" },
  { id: 3, name: "Term Sheet.pdf", type: "Agreement", date: "2025-01-10", size: "1.2 MB" },
];

const mockWallets = [
  { id: 1, name: "Ethereum Wallet", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", balance: "2.5 ETH" },
  { id: 2, name: "Bitcoin Wallet", address: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5", balance: "0.15 BTC" },
];

export default function InvestorDashboard() {
  const { toast } = useToast();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // Welcome toast when dashboard loads
    toast({
      title: "Welcome to your investor dashboard",
      description: "This is where you'll manage your NOISAI investments.",
    });
  }, [toast]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setIsConnecting(true);
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          toast({
            title: "Wallet Connected",
            description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`,
          });
        }
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
        toast({
          title: "Connection Failed",
          description: "Could not connect to MetaMask. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsConnecting(false);
      }
    } else {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask browser extension to connect your wallet.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // In a real app, this would send the file to a server
      toast({
        title: "Document Uploaded",
        description: `${selectedFile.name} has been successfully uploaded.`,
      });
      setSelectedFile(null);
    }
  };

  const handleSellPosition = (investmentId: number) => {
    toast({
      title: "Sell Order Initiated",
      description: "Your sell request has been submitted. Our team will contact you shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/noisai-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
              alt="NOISAI Logo" 
              className="w-8 h-8 mr-2" 
            />
            <span className="text-[#22C55E] text-xl font-bold">NOISAI</span>
          </div>
          <div className="flex items-center space-x-4">
            {walletAddress ? (
              <div className="text-sm text-gray-400 flex items-center bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800">
                <Wallet className="w-4 h-4 mr-2 text-[#22C55E]" />
                <span>{walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}</span>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="flex items-center text-[#22C55E] border-gray-800 hover:bg-gray-900"
                onClick={connectWallet}
                disabled={isConnecting}
              >
                <Wallet className="w-4 h-4 mr-2" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">Investor Dashboard</h1>
        
        <Tabs defaultValue="portfolio" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 lg:grid-cols-6 mb-8 bg-gray-900 border border-gray-800">
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
            <TabsTrigger value="wallets" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
              <Wallet className="w-4 h-4 mr-2" /> Wallets
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
              <User className="w-4 h-4 mr-2" /> Profile
            </TabsTrigger>
          </TabsList>
          
          {/* Portfolio Overview Tab */}
          <TabsContent value="portfolio" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PiggyBank className="w-5 h-5 mr-2 text-[#22C55E]" />
                    Total Investments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$125,000</p>
                  <p className="text-sm text-gray-400">Across 2 projects</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="w-5 h-5 mr-2 text-[#22C55E]" />
                    Current Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$140,625</p>
                  <p className="text-sm text-green-500">+12.5% ROI</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-[#22C55E]" />
                    Active Deals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">2</p>
                  <p className="text-sm text-gray-400">1 Pending, 1 Active</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gray-900 border border-gray-800">
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
                <CardDescription>Your current investment portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border border-gray-800 rounded-md bg-gray-950 mb-4">
                  <p className="text-gray-400">Portfolio visualization coming soon</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-800 p-4 rounded-md">
                    <p className="text-sm text-gray-400">NOISAI Tokens</p>
                    <p className="text-xl font-bold">50,000</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-md">
                    <p className="text-sm text-gray-400">Equity Share</p>
                    <p className="text-xl font-bold">0.5%</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-md">
                    <p className="text-sm text-gray-400">First Investment</p>
                    <p className="text-xl font-bold">Jan 15, 2025</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-md">
                    <p className="text-sm text-gray-400">Investor Status</p>
                    <p className="text-xl font-bold text-[#22C55E]">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments">
            <Card className="bg-gray-900 border border-gray-800">
              <CardHeader>
                <CardTitle>Your Investments</CardTitle>
                <CardDescription>Details of individual investments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Name</TableHead>
                      <TableHead className="text-gray-400">Amount</TableHead>
                      <TableHead className="text-gray-400">Date</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">ROI</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInvestments.map(investment => (
                      <TableRow key={investment.id} className="border-gray-800">
                        <TableCell className="font-medium">{investment.name}</TableCell>
                        <TableCell>${investment.amount.toLocaleString()}</TableCell>
                        <TableCell>{investment.date}</TableCell>
                        <TableCell>
                          <span className={investment.status === 'Active' ? 'text-green-500' : 'text-yellow-500'}>
                            {investment.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={investment.roi.startsWith('+') ? 'text-green-500' : 'text-gray-400'}>
                            {investment.roi}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-[#22C55E] border-gray-800 hover:bg-gray-800"
                              >
                                <DollarSign className="w-4 h-4 mr-1" />
                                Sell
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-900 border border-gray-800">
                              <DialogHeader>
                                <DialogTitle className="text-white">Sell Investment Position</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to sell your position in {investment.name}?
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <p className="text-sm text-gray-400 mb-2">Current value: ${parseInt(investment.roi) + investment.amount}</p>
                                <p className="text-sm text-gray-400">Expected return: ${investment.amount}</p>
                              </div>
                              <DialogFooter>
                                <Button 
                                  variant="outline" 
                                  className="text-gray-400 border-gray-800 hover:bg-gray-800"
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  onClick={() => handleSellPosition(investment.id)}
                                  className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-black"
                                >
                                  Confirm Sale
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interaction History Tab */}
          <TabsContent value="interactions">
            <Card className="bg-gray-900 border border-gray-800">
              <CardHeader>
                <CardTitle>Interaction History</CardTitle>
                <CardDescription>Record of past interactions with NOISAI</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Date</TableHead>
                      <TableHead className="text-gray-400">Type</TableHead>
                      <TableHead className="text-gray-400">Description</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInteractions.map(interaction => (
                      <TableRow key={interaction.id} className="border-gray-800">
                        <TableCell>{interaction.date}</TableCell>
                        <TableCell>{interaction.type}</TableCell>
                        <TableCell>{interaction.description}</TableCell>
                        <TableCell>
                          <span className="text-green-500">
                            {interaction.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Document Management Tab */}
          <TabsContent value="documents">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 bg-gray-900 border border-gray-800">
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>View and download important documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="text-gray-400">Name</TableHead>
                        <TableHead className="text-gray-400">Type</TableHead>
                        <TableHead className="text-gray-400">Date</TableHead>
                        <TableHead className="text-gray-400">Size</TableHead>
                        <TableHead className="text-gray-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockDocuments.map(document => (
                        <TableRow key={document.id} className="border-gray-800">
                          <TableCell className="font-medium">{document.name}</TableCell>
                          <TableCell>{document.type}</TableCell>
                          <TableCell>{document.date}</TableCell>
                          <TableCell>{document.size}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-[#22C55E] border-gray-800 hover:bg-gray-800"
                            >
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardHeader>
                  <CardTitle>Upload Document</CardTitle>
                  <CardDescription>Share documents with NOISAI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="file" className="text-gray-400">Select File</Label>
                      <Input 
                        id="file" 
                        type="file" 
                        onChange={handleFileChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="documentType" className="text-gray-400">Document Type</Label>
                      <select 
                        id="documentType" 
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                      >
                        <option>Contract</option>
                        <option>ID Verification</option>
                        <option>Tax Document</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <Button 
                      onClick={handleFileUpload}
                      disabled={!selectedFile}
                      className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-black"
                    >
                      Upload Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Wallets Tab */}
          <TabsContent value="wallets">
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
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-gray-900 border border-gray-800">
              <CardHeader>
                <CardTitle>Investor Profile</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-400">Full Name</Label>
                    <Input 
                      id="name" 
                      defaultValue="John Doe" 
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-400">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue="john.doe@example.com" 
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="investorType" className="text-gray-400">Investor Type</Label>
                    <select 
                      id="investorType" 
                      defaultValue="individual"
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                    >
                      <option value="individual">Individual</option>
                      <option value="entity">Entity/Company</option>
                      <option value="fund">Investment Fund</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="taxId" className="text-gray-400">Tax ID / SSN</Label>
                    <Input 
                      id="taxId" 
                      defaultValue="XXX-XX-1234" 
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <Button 
                    className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-black"
                  >
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
