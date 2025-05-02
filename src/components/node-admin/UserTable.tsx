
import { NodeUser } from "./types";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserStatusBadge, UserActionButtons } from "./UserActions";

interface UserTableProps {
  users: NodeUser[];
  isLoading: boolean;
  onToggleStatus: (userId: string, currentStatus: "active" | "inactive") => void;
  onDeleteUser: (userId: string) => void;
  onEditUser: (userId: string) => void;
}

export default function UserTable({ 
  users, 
  isLoading, 
  onToggleStatus, 
  onDeleteUser,
  onEditUser
}: UserTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <p className="text-center py-8 text-gray-500 dark:text-gray-400">
        No users found matching your search.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              {/* Removed the checkbox from header */}
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.role === "node_operator" ? "default" : "outline"} 
                       className={user.role === "node_operator" ? "bg-[#22C55E] hover:bg-[#1ea853]" : ""}>
                  {user.role === "node_operator" ? "Operator" : "Viewer"}
                </Badge>
              </TableCell>
              <TableCell>
                <UserStatusBadge user={user} onToggleStatus={onToggleStatus} />
              </TableCell>
              <TableCell>
                {user.lastLogin === "Never" ? "Never" : new Date(user.lastLogin).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <UserActionButtons 
                  user={user} 
                  onDeleteUser={onDeleteUser} 
                  onEditUser={onEditUser} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
