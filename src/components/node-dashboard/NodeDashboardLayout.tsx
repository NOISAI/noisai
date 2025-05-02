
import { Link } from "react-router-dom";
import { useUser, ClerkProvider } from "@clerk/clerk-react";
import { CLERK_CONFIG } from "@/config/apiKeys";

// Create a wrapper component that provides the Node Dashboard-specific Clerk context
const NodeDashboardClerkWrapper = ({ children }: { children: React.ReactNode }) => {
  // Only wrap with a new ClerkProvider if we have a different key
  if (CLERK_CONFIG.NODE_PUBLISHABLE_KEY !== CLERK_CONFIG.PUBLISHABLE_KEY) {
    return (
      <ClerkProvider 
        publishableKey={CLERK_CONFIG.NODE_PUBLISHABLE_KEY}
        appearance={{
          variables: {
            colorPrimary: "#22C55E"
          }
        }}
      >
        {children}
      </ClerkProvider>
    );
  }
  
  // If no separate key, just render the children with the existing Clerk context
  return <>{children}</>;
};

export default function NodeDashboardLayout({ 
  userRole, 
  children 
}: { 
  userRole: string;
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  
  return (
    <NodeDashboardClerkWrapper>
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-green-500">NOISAI Node Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link
                  to="/investor-dashboard"
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-medium text-white transition-colors"
                >
                  Back to Investor Dashboard
                </Link>
                
                <div className="bg-gray-800 px-3 py-2 rounded-md text-sm">
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </div>
                
                <div className="bg-gray-800 px-3 py-2 rounded-md text-sm truncate max-w-[200px]">
                  {email || 'User'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </NodeDashboardClerkWrapper>
  );
}
