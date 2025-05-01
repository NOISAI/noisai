
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  width?: string;
  onEnterPress?: () => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  placeholder = "Search...",
  width = "w-64",
  onEnterPress,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder={placeholder}
        className={`bg-gray-900 border-gray-800 pl-8 ${width}`}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Search 
        className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
      />
    </div>
  );
}
