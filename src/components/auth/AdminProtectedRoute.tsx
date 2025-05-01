
import { useUser, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

type AdminProtectedRouteProps = {
  children: React.ReactNode;
};

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  
  // Check if user is signed in and has admin email
  const isAdmin = isSignedIn && user?.primaryEmailAddress?.emailAddress === "info@noisai.tech";

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
