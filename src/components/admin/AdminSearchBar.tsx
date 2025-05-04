
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-8 gap-4 md:gap-0">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm md:text-base">Manage investors, track interactions, and generate reports</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div className="relative flex items-center w-full sm:w-auto">
          <Input 
            type="search" 
            placeholder="Search..." 
            className="bg-gray-900 border-gray-800 pl-8 w-full sm:w-48 md:w-64"
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
          className="bg-[#22C55E] hover:bg-[#1ea853] text-black w-full sm:w-auto"
          onClick={onAddInvestorClick}
        >
          <UserPlus size={16} className="mr-1" />
          {!isMobile || true ? "New Investor" : ""}
        </Button>
      </div>
    </div>
  );
}
