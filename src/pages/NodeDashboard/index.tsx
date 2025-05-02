
import { useEffect } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { useToast } from "@/hooks/use-toast";
import NoisaiView from "./NoisaiView";
import BusinessView from "./BusinessView";
import NodeDashboardLayout from "@/components/node-dashboard/NodeDashboardLayout";
import DashboardLoader from "@/components/node-dashboard/DashboardLoader";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";

export default function NodeDashboard() {
  const { permissions, isLoaded, userRole } = useRolePermissions();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useClerk();

  // Check permissions on mount and redirect to appropriate view
  useEffect(() => {
    if (isLoaded) {
      if (!permissions.canAccessNoisaiView && !permissions.canAccessBusinessView) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the node dashboard",
          variant: "destructive"
        });
        navigate("/");
        return;
      }

      // Set default landing view based on permissions
      if (permissions.canAccessNoisaiView) {
        navigate("/node-dashboard/noisai", { replace: true });
      } else if (permissions.canAccessBusinessView) {
        navigate("/node-dashboard/business", { replace: true });
      }
    }
  }, [isLoaded, permissions, navigate, toast]);

  if (!isLoaded) {
    return <DashboardLoader />;
  }

  return (
    <>
      <SignedIn>
        <NodeDashboardLayout userRole={userRole}>
          <Routes>
            {permissions.canAccessNoisaiView && (
              <Route path="/noisai" element={<NoisaiView />} />
            )}
            {permissions.canAccessBusinessView && (
              <Route path="/business" element={<BusinessView />} />
            )}
            <Route path="*" element={
              <Navigate 
                to={permissions.canAccessNoisaiView ? "/node-dashboard/noisai" : "/node-dashboard/business"} 
                replace 
              />
            } />
          </Routes>
        </NodeDashboardLayout>
      </SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
}
