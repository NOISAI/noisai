import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import NoisaiView from "./NoisaiView";
import BusinessView from "./BusinessView";
import NodeDashboardLayout from "@/components/node-dashboard/NodeDashboardLayout";
import DashboardLoader from "@/components/node-dashboard/DashboardLoader";
import { useToast } from "@/hooks/use-toast";
import { OrientationPrompt } from "@/components/shared/OrientationPrompt";

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
  
  // Redirect admin users to the admin dashboard
  useEffect(() => {
    if (!isLoading && user && userRole === 'admin') {
      console.log("Redirecting admin to node-admin dashboard", { email: user.email, role: userRole });
      navigate("/node-admin", { replace: true });
    }
  }, [user, isLoading, userRole, navigate]);

  // Add debugging to see what's happening
  useEffect(() => {
    console.log("NodeDashboard state:", { 
      isLoading, 
      userEmail: user?.email, 
      userRole,
      isOnAdminPage: location.pathname === "/node-admin"
    });
  }, [isLoading, user, userRole, location]);

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (!user) {
    return <Navigate to="/node-sign-in" replace state={{ from: location.pathname }} />;
  }

  // Immediately redirect admin users if they somehow get to this component
  if (userRole === 'admin') {
    return <Navigate to="/node-admin" replace />;
  }

  // Determine which view to display for non-admin users
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
      <OrientationPrompt />
    </NodeDashboardLayout>
  );
}
