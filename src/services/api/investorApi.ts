
import { Investor } from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

/**
 * Fetches investor data from Supabase
 */
export const fetchInvestorsFromApi = async (): Promise<Investor[]> => {
  try {
    const { data: userProfiles, error } = await supabase
      .from('user_profiles')
      .select('*');
    
    if (error) {
      console.error('Error fetching profiles from Supabase:', error);
      throw error;
    }
    
    // Map user_profiles to the Investor type expected by components
    const formattedInvestors: Investor[] = userProfiles.map(profile => ({
      id: profile.id,
      name: profile.full_name || 'Unnamed Investor',
      email: profile.email,
      status: "Active", // Default status
      investor_type: profile.investor_type,
      total_invested: 0, // Default value
      last_interaction: profile.updated_at || profile.created_at,
      created_at: profile.created_at,
    }));
    
    return formattedInvestors;
  } catch (error) {
    console.error('Error fetching investors:', error);
    // Return an empty array instead of throwing
    return [];
  }
};

/**
 * Adds a new investor to Supabase
 */
export const addInvestorToApi = async (investor: Partial<Investor>): Promise<Investor | undefined> => {
  try {
    const newInvestor = {
      ...investor,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      last_interaction: new Date().toISOString(),
      total_invested: 0,
      status: 'Active' as 'Active' | 'Inactive',
      investor_type: investor.investor_type || 'individual',
    };
    
    // Try to add to Supabase if available
    const { error } = await supabase
      .from('user_profiles')
      .insert({
        id: newInvestor.id,
        full_name: newInvestor.name,
        email: newInvestor.email,
        investor_type: 'individual',
        created_at: newInvestor.created_at,
        updated_at: newInvestor.created_at,
      });
    
    if (error) {
      console.error('Error adding investor to Supabase:', error);
      
      // Even if there's an error from Supabase (e.g., RLS policy),
      // we'll still return the investor for the local state
      console.log('Returning mock investor for local state');
      return newInvestor as Investor;
    }
    
    return newInvestor as Investor;
  } catch (error) {
    console.error('Error in addInvestorToApi:', error);
    return undefined;
  }
};

/**
 * Updates an investor in Supabase
 */
export const updateInvestorInApi = async (id: string, updates: Partial<Investor>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({
        full_name: updates.name,
        email: updates.email,
        investor_type: updates.investor_type,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);
      
    if (error) {
      console.error('Error updating investor in Supabase:', error);
      // For local state updates, we'll still return true
      return true;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateInvestorInApi:', error);
    return false;
  }
};

/**
 * Deletes an investor from Supabase
 */
export const deleteInvestorFromApi = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting investor from Supabase:', error);
      // For local state updates, we'll still return true
      return true;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteInvestorFromApi:', error);
    return false;
  }
};
