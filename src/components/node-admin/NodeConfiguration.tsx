import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NodeConfiguration() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [networkSettings, setNetworkSettings] = useState({
    maxConnections: 50,
    bandwidth: 10,
    syncInterval: 15,
    enableAutoUpdates: true,
    networkMode: "standard"
  });

  const [hardwareSettings, setHardwareSettings] = useState({
    cpuAllocation: 70,
    memoryAllocation: 60,
    diskSpaceLimit: 100,
    enablePowerSaving: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    firewallEnabled: true,
    encryptionLevel: "high",
    autoBlockThreshold: 5,
    allowRemoteAccess: false
  });

  const handleNetworkChange = (name: string, value: any) => {
    setNetworkSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleHardwareChange = (name: string, value: any) => {
    setHardwareSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (name: string, value: any) => {
    setSecuritySettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to a database or API
    toast({
      title: "Settings Saved",
      description: "Your node configuration has been updated successfully.",
    });
    
    // Navigate back to the admin dashboard after saving
    navigate("/node-admin");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/node-admin" className="mr-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white">Node Configuration</h2>
            <p className="text-gray-400">Configure node settings and parameters</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="network" className="w-full">
        <TabsList className="grid grid-cols-3 bg-gray-800 mb-6">
          <TabsTrigger value="network" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
            Network
          </TabsTrigger>
          <TabsTrigger value="hardware" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
            Hardware
          </TabsTrigger>
          <TabsTrigger value="security" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="network" className="mt-0">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Network Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxConnections" className="text-white">Maximum Connections</Label>
                  <Input
                    id="maxConnections"
                    type="number"
                    value={networkSettings.maxConnections}
                    onChange={(e) => handleNetworkChange("maxConnections", parseInt(e.target.value))}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <p className="text-sm text-gray-400">Maximum number of peer connections</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bandwidth" className="text-white">Bandwidth Limit (Mbps)</Label>
                  <Input
                    id="bandwidth"
                    type="number"
                    value={networkSettings.bandwidth}
                    onChange={(e) => handleNetworkChange("bandwidth", parseInt(e.target.value))}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <p className="text-sm text-gray-400">Maximum bandwidth allocation in Mbps</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="syncInterval" className="text-white">Sync Interval (minutes)</Label>
                  <Input
                    id="syncInterval"
                    type="number"
                    value={networkSettings.syncInterval}
                    onChange={(e) => handleNetworkChange("syncInterval", parseInt(e.target.value))}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <p className="text-sm text-gray-400">How often the node syncs with the network</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="networkMode" className="text-white">Network Mode</Label>
                  <Select 
                    value={networkSettings.networkMode}
                    onValueChange={(value) => handleNetworkChange("networkMode", value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select network mode" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1F2C] border-gray-700 text-white">
                      <SelectItem value="light">Light (Low resource usage)</SelectItem>
                      <SelectItem value="standard">Standard (Balanced)</SelectItem>
                      <SelectItem value="full">Full (Maximum performance)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-400">Node's operation mode</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableAutoUpdates"
                  checked={networkSettings.enableAutoUpdates}
                  onCheckedChange={(checked) => handleNetworkChange("enableAutoUpdates", checked)}
                />
                <Label htmlFor="enableAutoUpdates" className="text-white">Enable Automatic Updates</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hardware" className="mt-0">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Hardware Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="cpuAllocation" className="text-white">CPU Allocation (%)</Label>
                    <span className="text-gray-400">{hardwareSettings.cpuAllocation}%</span>
                  </div>
                  <Slider
                    id="cpuAllocation"
                    min={10}
                    max={100}
                    step={5}
                    value={[hardwareSettings.cpuAllocation]}
                    onValueChange={(value) => handleHardwareChange("cpuAllocation", value[0])}
                    className="[&>span]:bg-[#22C55E]"
                  />
                  <p className="text-sm text-gray-400">Percentage of CPU resources allocated to the node</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="memoryAllocation" className="text-white">Memory Allocation (%)</Label>
                    <span className="text-gray-400">{hardwareSettings.memoryAllocation}%</span>
                  </div>
                  <Slider
                    id="memoryAllocation"
                    min={10}
                    max={100}
                    step={5}
                    value={[hardwareSettings.memoryAllocation]}
                    onValueChange={(value) => handleHardwareChange("memoryAllocation", value[0])}
                    className="[&>span]:bg-[#22C55E]"
                  />
                  <p className="text-sm text-gray-400">Percentage of memory resources allocated to the node</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="diskSpaceLimit" className="text-white">Disk Space Limit (GB)</Label>
                  <Input
                    id="diskSpaceLimit"
                    type="number"
                    value={hardwareSettings.diskSpaceLimit}
                    onChange={(e) => handleHardwareChange("diskSpaceLimit", parseInt(e.target.value))}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <p className="text-sm text-gray-400">Maximum disk space usage in GB</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enablePowerSaving"
                    checked={hardwareSettings.enablePowerSaving}
                    onCheckedChange={(checked) => handleHardwareChange("enablePowerSaving", checked)}
                  />
                  <Label htmlFor="enablePowerSaving" className="text-white">Enable Power Saving Mode</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-0">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="encryptionLevel" className="text-white">Encryption Level</Label>
                  <Select 
                    value={securitySettings.encryptionLevel}
                    onValueChange={(value) => handleSecurityChange("encryptionLevel", value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select encryption level" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1F2C] border-gray-700 text-white">
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="maximum">Maximum</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-400">Level of encryption for node communications</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="autoBlockThreshold" className="text-white">Auto-block Threshold</Label>
                  <Input
                    id="autoBlockThreshold"
                    type="number"
                    value={securitySettings.autoBlockThreshold}
                    onChange={(e) => handleSecurityChange("autoBlockThreshold", parseInt(e.target.value))}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <p className="text-sm text-gray-400">Number of failed attempts before blocking</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="firewallEnabled"
                  checked={securitySettings.firewallEnabled}
                  onCheckedChange={(checked) => handleSecurityChange("firewallEnabled", checked)}
                />
                <Label htmlFor="firewallEnabled" className="text-white">Enable Node Firewall</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="allowRemoteAccess"
                  checked={securitySettings.allowRemoteAccess}
                  onCheckedChange={(checked) => handleSecurityChange("allowRemoteAccess", checked)}
                />
                <Label htmlFor="allowRemoteAccess" className="text-white">Allow Remote Access</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button 
          className="bg-[#22C55E] hover:bg-[#1ea853] text-white" 
          onClick={handleSaveSettings}
        >
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
