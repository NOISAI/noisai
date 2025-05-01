
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onAddInvestorClick: () => void;
}

export default function AdminSearchBar({
  searchQuery,
  onSearchChange,
  onSearch,
  onAddInvestorClick
}: AdminSearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400">Manage investors, track interactions, and generate reports</p>
      </div>
      <div className="mt-4 md:mt-0 flex gap-2">
        <div className="relative flex items-center">
          <Input 
            type="search" 
            placeholder="Search..." 
            className="bg-gray-900 border-gray-800 pl-8 w-48 md:w-64"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
          <Search 
            className="absolute left-2.5 h-4 w-4 text-gray-400 cursor-pointer" 
            onClick={onSearch} 
          />
        </div>
        <Button 
          className="bg-[#22C55E] hover:bg-[#1ea853] text-black"
          onClick={onAddInvestorClick}
        >
          <UserPlus size={16} className="mr-1" />
          New Investor
        </Button>
      </div>
    </div>
  );
}
