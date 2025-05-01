
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { UserRole, rolePermissions, RolePermission } from "@/types/role";

// This hook will manage role permissions for the current user
export const useRolePermissions = () => {
  const { user, isLoaded } = useUser();
  const [userRole, setUserRole] = useState<UserRole>("user");
  const [permissions, setPermissions] = useState<RolePermission>(rolePermissions.user);

  useEffect(() => {
    if (isLoaded && user) {
      // In a real application, this would come from your database
      // For now, we're using email to determine roles
      const email = user.primaryEmailAddress?.emailAddress?.toLowerCase();
      
      if (email === "info@noisai.tech") {
        setUserRole("admin");
        setPermissions(rolePermissions.admin);
      } else if (email?.includes("dev@") || email?.includes("developer@")) {
        setUserRole("developer");
        setPermissions(rolePermissions.developer);
      } else if (email?.includes("business@")) {
        setUserRole("business");
        setPermissions(rolePermissions.business);
      } else if (email === "mraptis77@gmail.com") {
        setUserRole("user");
        setPermissions(rolePermissions.user);
      } else {
        setUserRole("user");
        setPermissions(rolePermissions.user);
      }
    }
  }, [user, isLoaded]);

  return {
    userRole,
    permissions,
    isLoaded
  };
};
