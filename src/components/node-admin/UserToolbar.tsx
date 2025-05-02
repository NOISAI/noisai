
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import UserSearch from "./UserSearch";

interface UserToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddUserClick: () => void;
}

export default function UserToolbar({ 
  searchQuery, 
  setSearchQuery, 
  onAddUserClick 
}: UserToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <UserSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <Button 
        className="bg-[#22C55E] hover:bg-[#1ea853]"
        onClick={onAddUserClick}
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Add User
      </Button>
    </div>
  );
}
