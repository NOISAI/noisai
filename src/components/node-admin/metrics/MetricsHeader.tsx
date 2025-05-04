
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function MetricsHeader() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/node-admin" className="mr-4">
          <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="flex items-center">
          <img 
            src="/noisai-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
            alt="NOISAI Logo" 
            className="w-4 h-4 mr-2" 
          />
          <div>
            <h2 className="text-2xl font-bold text-white">Performance Metrics</h2>
            <div className="text-gray-400">
              <span>Monitor your node's performance and activity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
