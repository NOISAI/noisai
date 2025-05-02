
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import NoisaiView from "./NoisaiView";
import BusinessView from "./BusinessView";
import NodeDashboardLayout from "@/components/node-dashboard/NodeDashboardLayout";
import DashboardLoader from "@/components/node-dashboard/DashboardLoader";
import { useToast } from "@/hooks/use-toast";

export default function NodeDashboard() {
  const { user, isLoading, userRole } = useSupabaseAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  // For demonstration purposes, we'll determine the user's view based on email
  // In a production app, this would be purely role-based
  const canAccessNoisaiView = true;  // Allow all regular users to access NOISAI view
  const canAccessBusinessView = user?.email?.includes("business");

  useEffect(() => {
    if (user && !canAccessNoisaiView && !canAccessBusinessView) {
      toast({
        title: "Limited Access",
        description: "You have limited permissions. Contact support for assistance.",
        variant: "default"
      });
    }
    
    // Redirect admin users to the admin dashboard
    if (user?.email === "info@noisai.tech" || userRole === "admin") {
      window.location.href = "/node-admin";
    }
  }, [user, toast, userRole]);

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
      {renderDashboardView()}
    </NodeDashboardLayout>
  );
}
