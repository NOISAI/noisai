
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserHeader from "./UserHeader";
import UserToolbar from "./UserToolbar";
import UserTable from "./UserTable";
import AddUserDialog from "./AddUserDialog";
import EditUserDialog from "./EditUserDialog";
import { useUserManagement } from "./hooks/useUserManagement";
import { useIsMobile } from "@/hooks/use-mobile";

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
  
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <UserHeader />
      
      <UserToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddUserClick={() => setIsAddUserDialogOpen(true)}
      />
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg">Node Users</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
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
