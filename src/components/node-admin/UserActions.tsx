
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NodeUser } from "./types";

interface UserActionsProps {
  user: NodeUser;
  onToggleStatus: (userId: string, currentStatus: "active" | "inactive") => void;
  onDeleteUser: (userId: string) => void;
}

export function UserStatusBadge({ user, onToggleStatus }: { 
  user: NodeUser; 
  onToggleStatus: (userId: string, currentStatus: "active" | "inactive") => void;
}) {
  return (
    <Badge 
      className={`cursor-pointer ${user.status === "active" 
        ? "bg-green-100 text-green-800 hover:bg-green-200" 
        : "bg-red-100 text-red-800 hover:bg-red-200"}`}
      variant={user.status === "active" ? "default" : "destructive"}
      onClick={() => onToggleStatus(user.id, user.status)}
    >
      {user.status === "active" ? "Active" : "Inactive"}
    </Badge>
  );
}

export function UserActionButtons({ user, onDeleteUser }: { 
  user: NodeUser; 
  onDeleteUser: (userId: string) => void;
}) {
  return (
    <div className="text-right space-x-2">
      <Button variant="ghost" size="icon" className="hover:text-[#22C55E]">
        <Edit className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-red-500 hover:text-red-600"
        onClick={() => onDeleteUser(user.id)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
