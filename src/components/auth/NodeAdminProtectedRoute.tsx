
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useToast } from "@/hooks/use-toast";

type NodeAdminProtectedRouteProps = {
  children: React.ReactNode;
};

const NodeAdminProtectedRoute = ({ children }: NodeAdminProtectedRouteProps) => {
  const { user, isLoading, userRole } = useSupabaseAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  // Use a useEffect to show the toast only once when component mounts and conditions are met
  useEffect(() => {
    if (!isLoading && user && userRole !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area.",
        variant: "destructive"
      });
    }
  }, [isLoading, user, userRole, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/node-sign-in" replace state={{ from: location.pathname }} />;
  }
  
  // Check role-based access
  if (userRole !== 'admin') {
    return <Navigate to="/node-dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default NodeAdminProtectedRoute;
