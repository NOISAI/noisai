
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

type AdminProtectedRouteProps = {
  children: React.ReactNode;
};

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { isSignedIn, userId, user } = useAuth();
  
  // Check if user is signed in and has admin email
  const isAdmin = isSignedIn && user?.primaryEmailAddress?.emailAddress === "mraptis77@gmail.com";

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/investor-dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
