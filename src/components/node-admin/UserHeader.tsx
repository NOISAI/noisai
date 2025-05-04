
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function UserHeader() {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Link to="/node-admin" className="mb-2 sm:mb-0 sm:mr-4">
          <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700">
            <ArrowLeft className="h-4 w-4" />
            {!isMobile && "Back to Dashboard"}
          </Button>
        </Link>
        <div className="flex items-center">
          <img 
            src="/noisai-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
            alt="NOISAI Logo" 
            className="w-6 h-6 mr-2" 
          />
          <h1 className="text-xl sm:text-2xl font-bold text-[#22C55E]">Node User Management</h1>
        </div>
      </div>
    </div>
  );
}
