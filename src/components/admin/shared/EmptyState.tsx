
import React from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = "No Data Available", 
  description = "There are no records to display at this time.", 
  icon 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-xl font-medium text-gray-300 mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md">{description}</p>
    </div>
  );
};

export default EmptyState;
