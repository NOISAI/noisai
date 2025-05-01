
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  additionalActions?: React.ReactNode;
}

export default function ActionButtons({ 
  onEdit, 
  onDelete,
  additionalActions 
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-end space-x-1">
      <Button 
        variant="ghost" 
        className="h-8 w-8 p-0"
        onClick={onEdit}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        className="h-8 w-8 p-0 text-red-500"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      {additionalActions}
    </div>
  );
}
