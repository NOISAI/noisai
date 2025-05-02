
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function UserHeader() {
  return (
    <div className="flex items-center justify-between">
      <Link 
        to="/node-admin" 
        className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Admin Dashboard
      </Link>
      
      <h1 className="text-2xl font-bold text-[#22C55E]">Node User Management</h1>
    </div>
  );
}
