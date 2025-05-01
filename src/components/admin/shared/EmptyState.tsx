
import { ReactNode } from "react";
import { TrendingUp, Users, Phone, FileText } from "lucide-react";

interface EmptyStateProps {
  type: "investors" | "interactions" | "investments" | "reports" | "generic";
  isSearching: boolean;
  searchQuery?: string;
  customMessage?: string;
  customIcon?: ReactNode;
}

export default function EmptyState({ 
  type, 
  isSearching, 
  searchQuery = "",
  customMessage,
  customIcon
}: EmptyStateProps) {
  const getIcon = () => {
    if (customIcon) return customIcon;
    
    switch (type) {
      case "investors":
        return <Users className="h-12 w-12 text-gray-500 mb-2" />;
      case "interactions":
        return <Phone className="h-12 w-12 text-gray-500 mb-2" />;
      case "investments":
        return <TrendingUp className="h-12 w-12 text-gray-500 mb-2" />;
      case "reports":
        return <FileText className="h-12 w-12 text-gray-500 mb-2" />;
      default:
        return null;
    }
  };

  const getMessage = () => {
    if (customMessage) return customMessage;
    
    if (isSearching) {
      return `No ${type} match your search for "${searchQuery}"`;
    }
    
    switch (type) {
      case "investors":
        return "No investors found. Add your first investor!";
      case "interactions":
        return "No interactions found. Log your first interaction!";
      case "investments":
        return "No investments found. Add your first investment!";
      case "reports":
        return "No reports found. Generate your first report!";
      default:
        return "No data found";
    }
  };

  return (
    <div className="text-center py-8">
      {getIcon()}
      <p className="text-gray-400">{getMessage()}</p>
    </div>
  );
}
