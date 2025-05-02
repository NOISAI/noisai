
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

export default function NodeDashboardLayout({ 
  userRole, 
  children 
}: { 
  userRole: string;
  children: React.ReactNode;
}) {
  const { user } = useSupabaseAuth();
  const email = user?.email;
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">NOISAI Node</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/investor-dashboard"
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-800 transition-colors"
              >
                Back to Investor Dashboard
              </Link>
              
              <div className="bg-green-100 px-3 py-2 rounded-md text-sm text-green-800">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </div>
              
              <div className="bg-gray-100 px-3 py-2 rounded-md text-sm truncate max-w-[200px] text-gray-800">
                {email || 'User'}
              </div>
              
              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                {email ? email.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
