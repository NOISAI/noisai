
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserHeader from "./UserHeader";
import UserToolbar from "./UserToolbar";
import UserTable from "./UserTable";
import AddUserDialog from "./AddUserDialog";
import EditUserDialog from "./EditUserDialog";
import { useUserManagement } from "./hooks/useUserManagement";

export default function UserManagement() {
  const {
    users,
    isLoading,
    searchQuery,
    setSearchQuery,
    isAddUserDialogOpen,
    setIsAddUserDialogOpen,
    isEditUserDialogOpen,
    setIsEditUserDialogOpen,
    currentUser,
    handleToggleStatus,
    handleDeleteUser,
    handleAddUser,
    handleEditClick,
    handleEditUser
  } = useUserManagement();
  
  return (
    <div className="space-y-6">
      <UserHeader />
      
      <UserToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddUserClick={() => setIsAddUserDialogOpen(true)}
      />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Node Users</CardTitle>
        </CardHeader>
        <CardContent>
          <UserTable 
            users={users}
            isLoading={isLoading}
            onToggleStatus={handleToggleStatus}
            onDeleteUser={handleDeleteUser}
            onEditUser={handleEditClick}
          />
        </CardContent>
      </Card>

      <AddUserDialog
        isOpen={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
        onAddUser={handleAddUser}
      />

      <EditUserDialog
        user={currentUser}
        isOpen={isEditUserDialogOpen}
        onOpenChange={setIsEditUserDialogOpen}
        onEditUser={handleEditUser}
      />
    </div>
  );
}
