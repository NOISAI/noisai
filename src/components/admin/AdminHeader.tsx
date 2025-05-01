
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface AdminHeaderProps {
  onExitAdmin: () => void;
}

export default function AdminHeader({ onExitAdmin }: AdminHeaderProps) {
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Logged in as:</span>
            <span className="font-medium text-white">{user?.primaryEmailAddress?.emailAddress}</span>
          </div>
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white"
            onClick={onExitAdmin}
          >
            Exit Admin Mode
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="block md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        <div className="md:hidden border-t border-gray-800 py-3 px-4">
          <div className="flex flex-col gap-3">
            <div className="text-sm text-gray-400">
              <span>Logged in as:</span>
              <span className="font-medium text-white block mt-1">{user?.primaryEmailAddress?.emailAddress}</span>
            </div>
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white justify-start w-full"
              onClick={onExitAdmin}
            >
              Exit Admin Mode
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
