
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import NoisaiView from "./NoisaiView";
import BusinessView from "./BusinessView";
import NodeDashboardLayout from "@/components/node-dashboard/NodeDashboardLayout";
import DashboardLoader from "@/components/node-dashboard/DashboardLoader";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function NodeDashboard() {
  const { user, isLoading, userRole, signOut } = useSupabaseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // For demonstration purposes, we'll determine the user's view based on email
  // In a production app, this would be purely role-based
  const canAccessNoisaiView = true;  // Allow all regular users to access NOISAI view
  const canAccessBusinessView = user?.email?.includes("business");

  useEffect(() => {
    // Only show toast when user is loaded and has limited access
    if (user && !canAccessNoisaiView && !canAccessBusinessView) {
      toast({
        title: "Limited Access",
        description: "You have limited permissions. Contact support for assistance.",
        variant: "default"
      });
    }
  }, [user, canAccessNoisaiView, canAccessBusinessView, toast]);
  
  // Redirect admin users to the admin dashboard - use navigate instead of window.location
  useEffect(() => {
    if (user && !isLoading && userRole === 'admin') {
      navigate("/node-admin", { replace: true });
    }
  }, [user, isLoading, userRole, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out",
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

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (!user) {
    return <Navigate to="/node-sign-in" replace state={{ from: location.pathname }} />;
  }

  // Determine which view to display
  const renderDashboardView = () => {
    if (canAccessNoisaiView) {
      return <NoisaiView />;
    } else if (canAccessBusinessView) {
      return <BusinessView />;
    } else {
      return (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-green-500 mb-4">Welcome to NOISAI Node</h2>
          <p className="text-gray-400">Your dashboard view is loading...</p>
        </div>
      );
    }
  };

  return (
    <NodeDashboardLayout userRole="user">
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSignOut}
          className="border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
      {renderDashboardView()}
    </NodeDashboardLayout>
  );
}
