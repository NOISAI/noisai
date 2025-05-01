
import { useState, useEffect } from 'react';
import { Investor } from '@/types/admin';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Mock data for fallback or development
const mockInvestors: Investor[] = [
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

export const useInvestors = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from Supabase first
        const { data: userProfiles, error } = await supabase
          .from('user_profiles')
          .select('*');
        
        if (error) {
          console.error('Error fetching profiles from Supabase:', error);
          // Fall back to mock data if there's an error
          setInvestors(mockInvestors);
          return;
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
          
          setInvestors(formattedInvestors);
        } else {
          // Fall back to mock data if no profiles found
          setInvestors(mockInvestors);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setInvestors(mockInvestors);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, []);

  const addInvestor = async (investor: Partial<Investor>) => {
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
        return;
      }
      
      // Update local state
      setInvestors(prev => [...prev, newInvestor as Investor]);
      
      toast({
        title: "Investor added",
        description: `${newInvestor.name} has been added successfully.`,
      });
      
      return newInvestor;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Failed to add investor",
        description: "An unexpected error occurred",
      });
    }
  };

  const updateInvestor = async (id: string, updates: Partial<Investor>) => {
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
        return;
      }
      
      // Update local state
      setInvestors(prev => prev.map(investor => 
        investor.id === id ? { ...investor, ...updates } : investor
      ));
      
      toast({
        title: "Investor updated",
        description: `Investor has been updated successfully.`,
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Failed to update investor",
        description: "An unexpected error occurred",
      });
    }
  };

  const deleteInvestor = async (id: string) => {
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
        return;
      }
      
      // Update local state
      setInvestors(prev => prev.filter(investor => investor.id !== id));
      
      toast({
        title: "Investor deleted",
        description: `Investor has been deleted successfully.`,
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Failed to delete investor",
        description: "An unexpected error occurred",
      });
    }
  };

  const toggleInvestorStatus = async (id: string, currentStatus: 'Active' | 'Inactive') => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      // Update local state only as Supabase doesn't have a status field
      setInvestors(prev => prev.map(investor => 
        investor.id === id ? { ...investor, status: newStatus as 'Active' | 'Inactive' } : investor
      ));
      
      toast({
        title: "Status updated",
        description: `Investor status has been set to ${newStatus}.`,
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Failed to update status",
        description: "An unexpected error occurred",
      });
    }
  };

  return { investors, loading, addInvestor, updateInvestor, deleteInvestor, toggleInvestorStatus };
};
