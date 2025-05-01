
import { Investor } from "./admin";

// Types specific to investor operations
export type InvestorToggleStatus = (id: string, currentStatus: 'Active' | 'Inactive') => Promise<boolean>;
export type InvestorCrudOperations = {
  add: (investor: Partial<Investor>) => Promise<Investor | undefined>;
  update: (id: string, updates: Partial<Investor>) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  toggleStatus: InvestorToggleStatus;
};
