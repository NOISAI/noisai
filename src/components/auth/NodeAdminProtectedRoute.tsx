
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useToast } from "@/hooks/use-toast";

type NodeAdminProtectedRouteProps = {
  children: React.ReactNode;
};

const NodeAdminProtectedRoute = ({ children }: NodeAdminProtectedRouteProps) => {
  const { user, isLoading, userRole } = useSupabaseAuth();
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      // If user exists and role is loaded, check admin status
      if (user && !isLoading) {
        // Check if the email is info@noisai.tech
        if (user.email === 'info@noisai.tech' || userRole === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
      setCheckingAdmin(false);
    };
    
    checkAdminStatus();
  }, [user, isLoading, userRole]);

  useEffect(() => {
    // Show toast only when we've finished checking and user isn't an admin
    if (!checkingAdmin && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area.",
        variant: "destructive"
      });
    }
  }, [checkingAdmin, user, isAdmin, toast]);

  if (isLoading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/node-sign-in" replace state={{ from: location.pathname }} />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/node-dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default NodeAdminProtectedRoute;
