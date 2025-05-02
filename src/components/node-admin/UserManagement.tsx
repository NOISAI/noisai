
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Search, UserPlus, Trash, Pencil, Lock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import AddUserDialog from "./AddUserDialog";

type NodeUser = {
  id: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
};

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

  const handleAddUser = (userData: {
    email: string;
    role: string;
    status: "active" | "inactive";
  }) => {
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
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
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
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <p className="text-center py-8 text-gray-500 dark:text-gray-400">
              No users found matching your search.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "node_operator" ? "default" : "outline"}>
                          {user.role === "node_operator" ? "Operator" : "Viewer"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`cursor-pointer ${user.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"}`}
                          variant={user.status === "active" ? "default" : "destructive"}
                          onClick={() => handleToggleStatus(user.id, user.status)}
                        >
                          {user.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.lastLogin === "Never" ? "Never" : new Date(user.lastLogin).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
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
