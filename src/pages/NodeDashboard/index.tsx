
import { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { useToast } from "@/hooks/use-toast";
import NoisaiView from "./NoisaiView";
import BusinessView from "./BusinessView";
import NodeDashboardLayout from "@/components/node-dashboard/NodeDashboardLayout";
import DashboardLoader from "@/components/node-dashboard/DashboardLoader";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export default function NodeDashboard() {
  const { permissions, isLoaded, userRole } = useRolePermissions();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check permissions on mount
  useEffect(() => {
    if (isLoaded) {
      if (!permissions.canAccessNoisaiView && !permissions.canAccessBusinessView) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the node dashboard",
          variant: "destructive"
        });
        navigate("/");
      }
    }
  }, [isLoaded, permissions, navigate, toast]);

  if (!isLoaded) {
    return <DashboardLoader />;
  }

  // Determine which view to display based on permissions
  const renderDashboardView = () => {
    if (permissions.canAccessNoisaiView) {
      return <NoisaiView />;
    } else if (permissions.canAccessBusinessView) {
      return <BusinessView />;
    } else {
      // This should never happen due to the useEffect redirect above,
      // but included as a fallback
      return (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h2>
          <p className="text-gray-400">You don't have permission to view this dashboard.</p>
        </div>
      );
    }
  };

  return (
    <>
      <SignedIn>
        <NodeDashboardLayout userRole={userRole}>
          {renderDashboardView()}
        </NodeDashboardLayout>
      </SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
      </SignedOut>
    </>
  );
}
