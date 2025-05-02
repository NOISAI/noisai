
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

import AddUserDialog from "./AddUserDialog";
import UserSearch from "./UserSearch";
import UserTable from "./UserTable";
import { NodeUser, UserFormData } from "./types";

export default function UserManagement() {
  const [users, setUsers] = useState<NodeUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<NodeUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // In a production app, this would be a call to Supabase to get real users
        // For this demo, we'll use mock data
        const mockUsers: NodeUser[] = [
          {
            id: "1",
            email: "node_user1@example.com",
            role: "node_operator",
            status: "active",
            lastLogin: "2025-05-01T10:30:00",
          },
          {
            id: "2",
            email: "node_user2@example.com",
            role: "node_viewer",
            status: "active",
            lastLogin: "2025-04-29T08:15:00",
          },
          {
            id: "3",
            email: "node_user3@example.com",
            role: "node_operator",
            status: "inactive",
            lastLogin: "2025-03-15T14:20:00",
          }
        ];
        
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error fetching users",
          description: "Could not load user data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, [toast]);
  
  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) => 
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);
  
  const handleToggleStatus = (userId: string, currentStatus: "active" | "inactive") => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    
    // Update the user list with the new status
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus as "active" | "inactive" } : user
    );
    
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers.filter(
      (user) => 
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    
    toast({
      title: "User status updated",
      description: `User has been ${newStatus === "active" ? "activated" : "deactivated"}`,
    });
  };
  
  const handleDeleteUser = (userId: string) => {
    // Remove the user from the list
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers.filter(
      (user) => 
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    
    toast({
      title: "User deleted",
      description: "User has been removed from the system",
    });
  };

  const handleAddUser = (userData: UserFormData) => {
    // Generate a unique ID for the new user
    const newUserId = (users.length + 1).toString();
    
    // Create a new user object
    const newUser: NodeUser = {
      id: newUserId,
      email: userData.email,
      role: userData.role,
      status: userData.status,
      lastLogin: "Never"
    };
    
    // Add the new user to the list
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    // Update filtered users if there's a search query active
    if (searchQuery.trim() === "") {
      setFilteredUsers(updatedUsers);
    } else {
      setFilteredUsers(updatedUsers.filter(
        (user) => 
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.role.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
    
    toast({
      title: "User added",
      description: `${userData.email} has been added as a ${userData.role.replace('_', ' ')}`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link 
          to="/node-admin" 
          className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Admin Dashboard
        </Link>
        
        <h1 className="text-2xl font-bold text-green-500">Node User Management</h1>
      </div>
      
      <div className="flex items-center justify-between">
        <UserSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => setIsAddUserDialogOpen(true)}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Node Users</CardTitle>
        </CardHeader>
        <CardContent>
          <UserTable 
            users={filteredUsers}
            isLoading={isLoading}
            onToggleStatus={handleToggleStatus}
            onDeleteUser={handleDeleteUser}
          />
        </CardContent>
      </Card>

      <AddUserDialog
        isOpen={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
        onAddUser={handleAddUser}
      />
    </div>
  );
}
