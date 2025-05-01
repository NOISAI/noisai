
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SignedIn, SignedOut, ClerkLoaded, useUser } from "@clerk/clerk-react";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import InvestorDashboard from "./pages/InvestorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NodeDashboard from "./pages/NodeDashboard";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkLoaded>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </ClerkLoaded>
  );
};

// Route component to prevent admins from accessing investor dashboard
const InvestorProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "info@noisai.tech";
  
  return (
    <ClerkLoaded>
      <SignedIn>
        {isAdmin ? <Navigate to="/admin-dashboard" replace /> : children}
      </SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
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
          <Route 
            path="/admin-dashboard" 
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/node-dashboard/*" 
            element={
              <ProtectedRoute>
                <NodeDashboard />
              </ProtectedRoute>
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
