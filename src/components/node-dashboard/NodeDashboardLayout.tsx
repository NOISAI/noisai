
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { UserRole, rolePermissions } from "@/types/role";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Network, LayoutDashboard, BarChart3, Settings } from "lucide-react";

interface NodeDashboardLayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
}

export default function NodeDashboardLayout({ children, userRole }: NodeDashboardLayoutProps) {
  const location = useLocation();
  const { user } = useUser();
  const permissions = rolePermissions[userRole];
  
  const navigation = [
    {
      name: "NOISAI View",
      href: "/node-dashboard/noisai",
      icon: BarChart3,
      visible: permissions.canAccessNoisaiView,
    },
    {
      name: "Business View",
      href: "/node-dashboard/business",
      icon: LayoutDashboard,
      visible: permissions.canAccessBusinessView,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/noisai-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
                alt="NOISAI Logo" 
                className="w-8 h-8 mr-2" 
              />
              <span className="text-[#22C55E] text-xl font-bold">NOISAI</span>
            </Link>
            <span className="ml-3 text-white bg-gray-800 px-3 py-1 rounded-full text-xs font-medium">
              Node Dashboard
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="flex flex-col text-right">
                <span className="font-medium text-white text-sm">{user?.fullName || user?.username}</span>
                <span className="text-xs text-gray-400">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
              </div>
            </div>
            <UserButton />
          </div>
        </div>
      </header>
      
      {/* Sidebar and Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-gray-900 min-h-[calc(100vh-65px)]">
          <div className="p-4">
            <div className="flex items-center text-white mb-8">
              <Network className="mr-2 h-5 w-5 text-[#22C55E]" />
              <h3 className="font-medium">Node Management</h3>
            </div>
            
            <nav className="space-y-1">
              {navigation
                .filter(item => item.visible)
                .map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                      location.pathname === item.href
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    {item.name}
                  </Link>
                ))}
            </nav>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex overflow-x-auto py-3 px-4 border-b border-gray-800 bg-gray-900 w-full">
          {navigation
            .filter(item => item.visible)
            .map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap mr-2",
                  location.pathname === item.href
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className="mr-2 h-5 w-5" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
        </div>
        
        {/* Content */}
        <div className="flex-grow p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
