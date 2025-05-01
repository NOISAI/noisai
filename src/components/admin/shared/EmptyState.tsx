
import React from "react";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  // New optional props to handle the different use cases
  type?: string;
  isSearching?: boolean;
  searchQuery?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title,
  description, 
  icon,
  type,
  isSearching,
  searchQuery
}) => {
  // Generate dynamic title and description based on props
  let displayTitle = title || "No Data Available";
  let displayDescription = description || "There are no records to display at this time.";
  
  // Override with type-specific messaging if provided
  if (type && isSearching && searchQuery) {
    displayTitle = `No ${type} found`;
    displayDescription = `No results found for "${searchQuery}". Try another search term.`;
  } else if (type) {
    displayTitle = `No ${type} Available`;
    displayDescription = `There are no ${type.toLowerCase()} to display at this time.`;
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon ? (
        <div className="mb-4">{icon}</div>
      ) : (
        <div className="mb-4 text-gray-400">
          <AlertCircle className="h-12 w-12 mx-auto" />
        </div>
      )}
      <h3 className="text-xl font-medium text-gray-300 mb-2">{displayTitle}</h3>
      <p className="text-gray-400 max-w-md">{displayDescription}</p>
    </div>
  );
};

export default EmptyState;
