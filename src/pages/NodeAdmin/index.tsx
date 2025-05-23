
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Users, Lock, BarChart3, Server, Activity } from "lucide-react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import UserManagement from "@/components/node-admin/UserManagement";
import SecuritySettings from "@/components/node-admin/SecuritySettings";
import MetricsDashboard from "@/components/node-admin/MetricsDashboard";
import NodeConfiguration from "@/components/node-admin/NodeConfiguration";
import SystemLogs from "@/components/node-admin/SystemLogs";
import { useIsMobile } from "@/hooks/use-mobile";
import { OrientationPrompt } from "@/components/shared/OrientationPrompt";

export default function NodeAdmin() {
  const { user, signOut, userRole } = useSupabaseAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of the Node Admin Dashboard",
      });
      navigate("/"); // Redirect to home page instead of node-sign-in
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "An error occurred while signing out",
        variant: "destructive",
      });
    }
  };

  const renderDashboard = () => (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img 
                src="/noisai-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
                alt="NOISAI Logo" 
                className="w-8 h-8 mr-2"
              />
              <h1 className="text-xl sm:text-2xl font-bold text-[#22C55E] truncate max-w-[200px] sm:max-w-none">
                {isMobile ? "NOISAI Admin" : "NOISAI Node Admin Dashboard"}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {!isMobile && (
                <>
                  <div className="bg-green-900 text-green-300 px-3 py-2 rounded-md text-sm">
                    Admin
                  </div>
                  
                  <div className="hidden sm:block bg-gray-800 px-3 py-2 rounded-md text-sm truncate max-w-[100px] md:max-w-[200px]">
                    {user?.email || 'Admin'}
                  </div>
                </>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4 mr-0 sm:mr-2" />
                {!isMobile ? "Sign Out" : ""}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-xl font-semibold mb-4 sm:mb-6">Node Administration</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Users className="h-5 w-5 mr-2" />
                Node User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4">Manage node users, permissions and access control</p>
              <Link to="/node-admin/users">
                <Button className="w-full sm:w-auto bg-[#22C55E] hover:bg-[#1ea853]">
                  Manage Users
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Lock className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4">Configure security settings, authentication options</p>
              <Link to="/node-admin/security">
                <Button className="w-full sm:w-auto bg-[#22C55E] hover:bg-[#1ea853]">
                  Security Settings
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <BarChart3 className="h-5 w-5 mr-2" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4">View node performance data and statistics</p>
              <Link to="/node-admin/metrics">
                <Button className="w-full sm:w-auto bg-[#22C55E] hover:bg-[#1ea853]">
                  View Metrics
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Server className="h-5 w-5 mr-2" />
                Node Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4">Configure node settings and parameters</p>
              <Link to="/node-admin/config">
                <Button className="w-full sm:w-auto bg-[#22C55E] hover:bg-[#1ea853]">
                  Configure Node
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Activity className="h-5 w-5 mr-2" />
                System Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4">View system activity and event logs</p>
              <Link to="/node-admin/logs">
                <Button className="w-full sm:w-auto bg-[#22C55E] hover:bg-[#1ea853]">
                  View Logs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <OrientationPrompt />
    </div>
  );
  
  return (
    <Routes>
      <Route path="/" element={renderDashboard()} />
      <Route path="/users" element={<><UserManagement /><OrientationPrompt /></>} />
      <Route path="/security" element={<><SecuritySettings /><OrientationPrompt /></>} />
      <Route path="/metrics" element={<><MetricsDashboard /><OrientationPrompt /></>} />
      <Route path="/config" element={<><NodeConfiguration /><OrientationPrompt /></>} />
      <Route path="/logs" element={<><SystemLogs /><OrientationPrompt /></>} />
    </Routes>
  );
}
