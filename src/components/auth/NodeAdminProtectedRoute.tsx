
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type NodeAdminProtectedRouteProps = {
  children: React.ReactNode;
};

const NodeAdminProtectedRoute = ({ children }: NodeAdminProtectedRouteProps) => {
  const { user, isLoading } = useSupabaseAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          // First check if the email is info@noisai.tech
          if (user.email === 'info@noisai.tech') {
            setIsAdmin(true);
          } else {
            // As a backup, check the role in the database
            const { data, error } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', user.id)
              .single();
            
            if (error) {
              console.error("Error checking admin status:", error);
              setIsAdmin(false);
            } else if (data && data.role === 'admin') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/node-sign-in" replace state={{ from: location.pathname }} />;
  }
  
  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access the admin area.",
      variant: "destructive"
    });
    return <Navigate to="/node-dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default NodeAdminProtectedRoute;
