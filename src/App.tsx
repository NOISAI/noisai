
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SignedIn, SignedOut, ClerkLoaded, useUser } from "@clerk/clerk-react";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import SupabaseSignIn from "./pages/Auth/SupabaseSignIn";
import SupabaseSignUp from "./pages/Auth/SupabaseSignUp";
import InvestorDashboard from "./pages/InvestorDashboard";
import Investments from "./pages/Investments"; // Import the Investments page
import AdminDashboard from "./pages/AdminDashboard";
import NodeDashboard from "./pages/NodeDashboard";
import NodeAdmin from "./pages/NodeAdmin";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";
import SupabaseProtectedRoute from "./components/auth/SupabaseProtectedRoute";
import NodeAdminProtectedRoute from "./components/auth/NodeAdminProtectedRoute";

const queryClient = new QueryClient();

// Route component with location state for proper redirects
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <ClerkLoaded>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
      </SignedOut>
    </ClerkLoaded>
  );
};

// Route component to prevent admins from accessing investor dashboard
const InvestorProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const location = useLocation();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "info@noisai.tech";
  
  return (
    <ClerkLoaded>
      <SignedIn>
        {isAdmin ? <Navigate to="/admin-dashboard" replace /> : children}
      </SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
      </SignedOut>
    </ClerkLoaded>
  );
};

// Added component to redirect authenticated users to appropriate dashboard based on permissions
const AuthRedirect = () => {
  const { user } = useUser();
  const { permissions, isLoaded } = useRolePermissions();
  const isAdmin = user?.primaryEmailAddress?.emailAddress?.toLowerCase() === "info@noisai.tech";
  
  if (!isLoaded) return <div>Loading...</div>;
  
  return (
    <ClerkLoaded>
      <SignedIn>
        {isAdmin ? 
          <Navigate to="/admin-dashboard" replace /> : 
          <Navigate to="/investor-dashboard" replace />
        }
      </SignedIn>
      <SignedOut>
        <Index />
      </SignedOut>
    </ClerkLoaded>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          
          {/* Clerk authentication for investor dashboard */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route 
            path="/investor-dashboard" 
            element={
              <InvestorProtectedRoute>
                <InvestorDashboard />
              </InvestorProtectedRoute>
            } 
          />
          {/* Add the Investments route with the same protection as the investor dashboard */}
          <Route 
            path="/investments" 
            element={
              <InvestorProtectedRoute>
                <Investments />
              </InvestorProtectedRoute>
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } 
          />
          
          {/* Supabase authentication for node dashboards */}
          <Route path="/node-sign-in" element={<SupabaseSignIn />} />
          <Route path="/node-sign-up" element={<SupabaseSignUp />} />
          <Route 
            path="/node-dashboard" 
            element={
              <SupabaseProtectedRoute>
                <NodeDashboard />
              </SupabaseProtectedRoute>
            } 
          />
          <Route 
            path="/node-admin/*" 
            element={
              <NodeAdminProtectedRoute>
                <NodeAdmin />
              </NodeAdminProtectedRoute>
            } 
          />
          
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
