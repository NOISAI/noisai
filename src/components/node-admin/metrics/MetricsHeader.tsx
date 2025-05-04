
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MetricsHeader() {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Link to="/node-admin">
          <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700">
            <ArrowLeft className="h-4 w-4" />
            {!isMobile && "Back to Dashboard"}
          </Button>
        </Link>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Performance Metrics</h2>
          <div className="text-gray-400 text-sm">
            <span>Monitor performance and activity</span>
          </div>
        </div>
      </div>
    </div>
  );
}
