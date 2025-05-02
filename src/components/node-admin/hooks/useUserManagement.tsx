
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { NodeUser, UserFormData } from "../types";

export function useUserManagement() {
  const [users, setUsers] = useState<NodeUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<NodeUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<NodeUser | null>(null);
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
    
    // Update filtered users
    const updatedFiltered = filteredUsers.map(user => 
      user.id === userId ? { ...user, status: newStatus as "active" | "inactive" } : user
    );
    
    setFilteredUsers(updatedFiltered);
    
    toast({
      title: "User status updated",
      description: `User has been ${newStatus === "active" ? "activated" : "deactivated"}`,
    });
  };
  
  const handleDeleteUser = (userId: string) => {
    // Remove the user from the list
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    
    // Update filtered users
    const updatedFiltered = filteredUsers.filter(user => user.id !== userId);
    setFilteredUsers(updatedFiltered);
    
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
    } else if (
      newUser.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newUser.role.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      setFilteredUsers([...filteredUsers, newUser]);
    }
    
    toast({
      title: "User added",
      description: `${userData.email} has been added as a ${userData.role.replace('_', ' ')}`,
    });
  };

  const handleEditClick = (userId: string) => {
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setCurrentUser(userToEdit);
      setIsEditUserDialogOpen(true);
    }
  };
  
  const handleEditUser = (userId: string, userData: UserFormData) => {
    // Update the user in the list
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, ...userData } : user
    );
    
    setUsers(updatedUsers);
    
    // Update filtered users
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
      title: "User updated",
      description: `${userData.email} has been updated`,
    });
  };

  return {
    users: filteredUsers,
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
  };
}
