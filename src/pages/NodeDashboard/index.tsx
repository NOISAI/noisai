
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import NoisaiView from "./NoisaiView";
import BusinessView from "./BusinessView";
import NodeDashboardLayout from "@/components/node-dashboard/NodeDashboardLayout";
import DashboardLoader from "@/components/node-dashboard/DashboardLoader";
import { useToast } from "@/hooks/use-toast";

export default function NodeDashboard() {
  const { user, isLoading } = useSupabaseAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  // For demonstration purposes, we'll determine the user role based on email
  // In a production app, you would fetch this from your database
  const userRole = user?.email?.includes("admin") ? "admin" : "user";
  
  // Check if user should see NOISAI or Business view based on email domain
  // This is a simplified approach - in production, use proper role-based permissions
  const canAccessNoisaiView = true;  // Allow all users to access NOISAI view for now
  const canAccessBusinessView = user?.email?.includes("business");

  useEffect(() => {
    if (user && !canAccessNoisaiView && !canAccessBusinessView) {
      toast({
        title: "Limited Access",
        description: "You have limited permissions. Contact support for assistance.",
        variant: "default"
      });
    }
  }, [user, toast]);

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
    <NodeDashboardLayout userRole={userRole}>
      {renderDashboardView()}
    </NodeDashboardLayout>
  );
}
