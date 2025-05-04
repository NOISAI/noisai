
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/node-admin" className="mr-4">
          <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#22C55E]">Node User Management</h1>
      </div>
    </div>
  );
}
