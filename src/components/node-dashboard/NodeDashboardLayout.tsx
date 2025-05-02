
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

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
  );
}
