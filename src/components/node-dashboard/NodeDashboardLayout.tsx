
import { Link } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function NodeDashboardLayout({ 
  userRole, 
  children 
}: { 
  userRole: string;
  children: React.ReactNode;
}) {
  const { user, signOut } = useSupabaseAuth();
  const email = user?.email;
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out",
      });
      navigate("/"); // Redirect to home page instead of node-sign-in
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "An error occurred while signing out",
        variant: "destructive",
      });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Navigation */}
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <img 
                  src="/noisai-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
                  alt="NOISAI Logo" 
                  className="w-8 h-8 mr-2"
                />
                <h1 className="text-2xl font-bold text-primary-green dark:text-primary-light">NOISAI Node</h1>
              </div>
              
              {isMobile ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleMobileMenu}
                  className="p-1"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              ) : (
                <div className="flex items-center space-x-4">                
                  <Link
                    to="/investor-dashboard"
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors"
                  >
                    Back to Investor Dashboard
                  </Link>
                  
                  <div className="bg-green-100 dark:bg-green-800/30 px-3 py-2 rounded-md text-sm text-green-800 dark:text-green-400">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md text-sm truncate max-w-[200px] text-gray-800 dark:text-gray-200">
                    {email || 'User'}
                  </div>
                  
                  <div className="h-8 w-8 rounded-full bg-primary-green flex items-center justify-center text-white font-medium">
                    {email ? email.charAt(0).toUpperCase() : 'U'}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-primary-light dark:hover:text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            {isMobile && mobileMenuOpen && (
              <div className="py-4 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/investor-dashboard"
                  className="block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors"
                >
                  Back to Investor Dashboard
                </Link>
                
                <div className="flex items-center justify-between">
                  <div className="bg-green-100 dark:bg-green-800/30 px-3 py-2 rounded-md text-sm text-green-800 dark:text-green-400">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md text-sm truncate max-w-[200px] text-gray-800 dark:text-gray-200">
                    {email || 'User'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-green flex items-center justify-center text-white font-medium mr-3">
                      {email ? email.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="text-sm">{email}</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-primary-light dark:hover:text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {children}
        </div>
        
        <div className="fixed bottom-6 right-6">
          <ThemeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
}
