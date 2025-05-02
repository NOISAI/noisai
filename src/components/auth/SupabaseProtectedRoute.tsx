
import { Navigate, useLocation } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

interface SupabaseProtectedRouteProps {
  children: React.ReactNode;
}

const SupabaseProtectedRoute = ({ children }: SupabaseProtectedRouteProps) => {
  const { user, isLoading } = useSupabaseAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/node-sign-in" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default SupabaseProtectedRoute;
