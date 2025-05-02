
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/integrations/supabase/client";

type NodeAdminProtectedRouteProps = {
  children: React.ReactNode;
};

const NodeAdminProtectedRoute = ({ children }: NodeAdminProtectedRouteProps) => {
  const { user, isLoading } = useSupabaseAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          // In a real app, you would check admin status from the database
          // For now, we'll use an email-based check similar to the current app
          if (user.email?.toLowerCase().includes("admin@noisai.tech")) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      }
      setCheckingAdmin(false);
    };
    
    if (user) {
      checkAdminStatus();
    } else if (!isLoading) {
      setCheckingAdmin(false);
    }
  }, [user, isLoading]);

  if (isLoading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/node-sign-in" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/node-dashboard" replace />;
  }

  return <>{children}</>;
};

export default NodeAdminProtectedRoute;
