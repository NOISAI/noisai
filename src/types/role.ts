
// Define role types for the application
export type UserRole = 'admin' | 'user' | null;

export interface RolePermission {
  canAccessNoisaiView: boolean;
  canAccessBusinessView: boolean;
  canManagePanels: boolean;
  canClaimTokens: boolean;
  canExportData: boolean;
}

// Define role-based permissions
export const rolePermissions: Record<Exclude<UserRole, null>, RolePermission> = {
  admin: {
    canAccessNoisaiView: true,
    canAccessBusinessView: true,
    canManagePanels: true,
    canClaimTokens: false,
    canExportData: true
  },
  user: {
    canAccessNoisaiView: true,
    canAccessBusinessView: false,
    canManagePanels: false,
    canClaimTokens: true,
    canExportData: false
  }
};
