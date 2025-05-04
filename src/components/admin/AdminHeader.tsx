
import { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AdminHeader() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of the admin portal."
      });
      navigate("/");  // Redirect to home page
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "There was an issue signing you out. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <header className="border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/noisai-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
            alt="NOISAI Logo" 
            className="w-8 h-8 mr-2" 
          />
          <div>
            <span className="text-[#22C55E] text-xl font-bold">NOISAI</span>
            <span className="ml-2 text-gray-400 text-sm hidden sm:inline">Admin Portal</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3 text-sm">
            <Avatar className="h-8 w-8 border border-gray-700">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
              <AvatarFallback className="bg-gray-800 text-gray-400">
                <UserCircle className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-white">{user?.fullName || user?.username}</span>
              <span className="text-xs text-gray-400">{user?.primaryEmailAddress?.emailAddress}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="block md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 py-3 px-4 animate-fade-in">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-8 w-8 border border-gray-700">
                <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                <AvatarFallback className="bg-gray-800 text-gray-400">
                  <UserCircle className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-white">{user?.fullName || user?.username}</span>
                <span className="text-xs text-gray-400">{user?.primaryEmailAddress?.emailAddress}</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white justify-start w-full"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
