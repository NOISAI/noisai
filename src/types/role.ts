
// Define role types for the application
export type UserRole = 'admin' | 'business' | 'developer' | 'user';

export interface RolePermission {
  canAccessNoisaiView: boolean;
  canAccessBusinessView: boolean;
  canManagePanels: boolean;
  canClaimTokens: boolean;
  canExportData: boolean;
}

// Define role-based permissions
export const rolePermissions: Record<UserRole, RolePermission> = {
  admin: {
    canAccessNoisaiView: true,
    canAccessBusinessView: false,
    canManagePanels: true,
    canClaimTokens: false,
    canExportData: true
  },
  business: {
    canAccessNoisaiView: false,
    canAccessBusinessView: true,
    canManagePanels: false,
    canClaimTokens: true,
    canExportData: true
  },
  developer: {
    canAccessNoisaiView: true,
    canAccessBusinessView: true,
    canManagePanels: true,
    canClaimTokens: true,
    canExportData: true
  },
  user: {
    canAccessNoisaiView: false,
    canAccessBusinessView: false,
    canManagePanels: false,
    canClaimTokens: false,
    canExportData: false
  }
};
