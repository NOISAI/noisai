
import { Investor } from '@/types/admin';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Mock data for fallback or development
export const mockInvestors: Investor[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    total_invested: 250000,
    last_interaction: "2025-04-25T09:30:00Z",
    created_at: "2025-01-15T08:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Active",
    total_invested: 500000,
    last_interaction: "2025-04-27T14:15:00Z",
    created_at: "2025-02-20T10:30:00Z",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    status: "Inactive",
    total_invested: 100000,
    last_interaction: "2025-03-10T16:45:00Z",
    created_at: "2025-03-05T09:15:00Z",
  }
];

/**
 * Fetches investor data from Supabase
 */
export const fetchInvestors = async (): Promise<Investor[]> => {
  try {
    // Try to fetch from Supabase first
    const { data: userProfiles, error } = await supabase
      .from('user_profiles')
      .select('*');
    
    if (error) {
      console.error('Error fetching profiles from Supabase:', error);
      // Fall back to mock data if there's an error
      return mockInvestors;
    }
    
    if (userProfiles && userProfiles.length > 0) {
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
    } else {
      // Fall back to mock data if no profiles found
      return mockInvestors;
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return mockInvestors;
  }
};

/**
 * Adds a new investor to Supabase
 */
export const addInvestorToSupabase = async (investor: Partial<Investor>): Promise<Investor | undefined> => {
  try {
    const newInvestor = {
      ...investor,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
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
      toast({
        variant: "destructive",
        title: "Failed to add investor",
        description: error.message,
      });
      return undefined;
    }
    
    toast({
      title: "Investor added",
      description: `${newInvestor.name} has been added successfully.`,
    });
    
    return newInvestor as Investor;
  } catch (error) {
    console.error('Unexpected error:', error);
    toast({
      variant: "destructive",
      title: "Failed to add investor",
      description: "An unexpected error occurred",
    });
    return undefined;
  }
};

/**
 * Updates an investor in Supabase
 */
export const updateInvestorInSupabase = async (id: string, updates: Partial<Investor>): Promise<boolean> => {
  try {
    // Try to update in Supabase if available
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
      toast({
        variant: "destructive",
        title: "Failed to update investor",
        description: error.message,
      });
      return false;
    }
    
    toast({
      title: "Investor updated",
      description: `Investor has been updated successfully.`,
    });

    return true;
  } catch (error) {
    console.error('Unexpected error:', error);
    toast({
      variant: "destructive",
      title: "Failed to update investor",
      description: "An unexpected error occurred",
    });
    return false;
  }
};

/**
 * Deletes an investor from Supabase
 */
export const deleteInvestorFromSupabase = async (id: string): Promise<boolean> => {
  try {
    // Try to delete from Supabase if available
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting investor from Supabase:', error);
      toast({
        variant: "destructive",
        title: "Failed to delete investor",
        description: error.message,
      });
      return false;
    }
    
    toast({
      title: "Investor deleted",
      description: `Investor has been deleted successfully.`,
    });

    return true;
  } catch (error) {
    console.error('Unexpected error:', error);
    toast({
      variant: "destructive",
      title: "Failed to delete investor",
      description: "An unexpected error occurred",
    });
    return false;
  }
};
