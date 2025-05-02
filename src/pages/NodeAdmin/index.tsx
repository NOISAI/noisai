
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Users, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NodeAdmin() {
  const { user, signOut } = useSupabaseAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of the Node Admin Dashboard",
      });
      navigate("/node-sign-in");
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "An error occurred while signing out",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-500">NOISAI Node Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800 px-3 py-2 rounded-md text-sm">
                Admin
              </div>
              
              <div className="bg-gray-800 px-3 py-2 rounded-md text-sm truncate max-w-[200px]">
                {user?.email || 'Admin'}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-semibold mb-6">Node Administration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Node User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">Manage node users, permissions and access control</p>
              <Button className="bg-green-600 hover:bg-green-700">
                Manage Users
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">Configure security settings, authentication options</p>
              <Button className="bg-green-600 hover:bg-green-700">
                Security Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
