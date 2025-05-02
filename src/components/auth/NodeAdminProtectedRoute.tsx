
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

type NodeAdminProtectedRouteProps = {
  children: React.ReactNode;
};

const NodeAdminProtectedRoute = ({ children }: NodeAdminProtectedRouteProps) => {
  const { user, isLoading } = useSupabaseAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          // In a real app, you would check admin status from the database
          // For now, we'll accept any valid user with a specific email pattern as admin
          if (user.email && (user.email.includes('admin') || user.email.includes('noisai'))) {
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
