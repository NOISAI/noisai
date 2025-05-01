
import { Investor } from '@/types/admin';
import { 
  fetchInvestorsFromApi, 
  addInvestorToApi,
  updateInvestorInApi,
  deleteInvestorFromApi 
} from './api/investorApi';
import { mockInvestors } from './mock/investorMock';
import { 
  notifyInvestorAdded, 
  notifyInvestorUpdated, 
  notifyInvestorDeleted, 
  notifyError 
} from './notifications/investorNotifications';

/**
 * Fetches investor data from Supabase
 */
export const fetchInvestors = async (): Promise<Investor[]> => {
  try {
    // Try to fetch from Supabase first
    const investors = await fetchInvestorsFromApi();
    return investors;
  } catch (error) {
    console.error('Error fetching investors:', error);
    // Fall back to mock data if there's an error
    return mockInvestors;
  }
};

/**
 * Adds a new investor to Supabase
 */
export const addInvestorToSupabase = async (investor: Partial<Investor>): Promise<Investor | undefined> => {
  try {
    const newInvestor = await addInvestorToApi(investor);
    
    if (newInvestor) {
      notifyInvestorAdded(newInvestor.name);
      return newInvestor;
    }
    return undefined;
  } catch (error) {
    console.error('Unexpected error:', error);
    notifyError("Failed to add investor", "An unexpected error occurred");
    return undefined;
  }
};

/**
 * Updates an investor in Supabase
 */
export const updateInvestorInSupabase = async (id: string, updates: Partial<Investor>): Promise<boolean> => {
  try {
    const success = await updateInvestorInApi(id, updates);
    
    if (success) {
      notifyInvestorUpdated();
    } else {
      notifyError("Failed to update investor", "Database operation failed");
    }
    
    return success;
  } catch (error) {
    console.error('Unexpected error:', error);
    notifyError("Failed to update investor", "An unexpected error occurred");
    return false;
  }
};

/**
 * Deletes an investor from Supabase
 */
export const deleteInvestorFromSupabase = async (id: string): Promise<boolean> => {
  try {
    const success = await deleteInvestorFromApi(id);
    
    if (success) {
      notifyInvestorDeleted();
    } else {
      notifyError("Failed to delete investor", "Database operation failed");
    }
    
    return success;
  } catch (error) {
    console.error('Unexpected error:', error);
    notifyError("Failed to delete investor", "An unexpected error occurred");
    return false;
  }
};
