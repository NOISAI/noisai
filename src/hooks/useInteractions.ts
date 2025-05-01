
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Interaction } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

// Sample mock data for fallback
const mockInteractions: Interaction[] = [
  {
    id: 'mock-1',
    investor_id: 'mock-investor-1',
    investor_name: 'John Doe',
    type: 'Call',
    date: '2025-04-25T10:00:00Z',
    notes: 'Discussed investment opportunities',
    follow_up: '2025-05-05T14:00:00Z',
    created_at: '2025-04-25T10:30:00Z'
  },
  {
    id: 'mock-2',
    investor_id: 'mock-investor-2',
    investor_name: 'Jane Smith',
    type: 'Email',
    date: '2025-04-22T15:30:00Z',
    notes: 'Sent investment proposal',
    follow_up: null,
    created_at: '2025-04-22T16:00:00Z'
  },
  {
    id: 'mock-3',
    investor_id: 'mock-investor-1',
    investor_name: 'John Doe',
    type: 'Meeting',
    date: '2025-04-20T09:00:00Z',
    notes: 'Initial consultation',
    follow_up: '2025-04-25T10:00:00Z',
    created_at: '2025-04-20T10:30:00Z'
  }
];

export const useInteractions = () => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchInteractions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch interactions from Supabase
      const { data, error: fetchError } = await supabase
        .from('interactions')
        .select(`
          *,
          investor:user_profiles(full_name)
        `)
        .order('date', { ascending: false });
      
      if (fetchError) {
        console.error("Database error:", fetchError);
        // Fall back to mock data if there's an error
        setInteractions(mockInteractions);
        toast({
          title: 'Using Demo Mode',
          description: 'Connected to sample interaction data',
        });
      } else if (data && data.length > 0) {
        // Format the data from the database
        const formattedData = data.map(item => ({
          id: item.id,
          investor_id: item.investor_id,
          investor_name: item.investor?.full_name || 'Unknown Investor',
          type: item.type,
          date: item.date,
          notes: item.notes,
          follow_up: item.follow_up,
          created_at: item.created_at
        }));
        setInteractions(formattedData);
      } else {
        // If no data returned, use mock data
        setInteractions(mockInteractions);
        toast({
          title: 'Using Demo Mode',
          description: 'Connected to sample interaction data',
        });
      }
    } catch (err: any) {
      console.error("Error in fetchInteractions:", err);
      setError(err.message);
      // Fall back to mock data
      setInteractions(mockInteractions);
      toast({
        title: 'Error',
        description: 'Failed to load interactions. Using demo data instead.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addInteraction = async (interaction: Omit<Interaction, 'id' | 'created_at' | 'investor_name'>) => {
    try {
      // Try to get investor name from user_profiles
      let investorName = 'Unknown Investor';
      const { data: investorData, error: investorError } = await supabase
        .from('user_profiles')
        .select('full_name')
        .eq('id', interaction.investor_id)
        .single();
      
      if (!investorError && investorData) {
        investorName = investorData.full_name;
      } else {
        console.error("Error fetching investor name:", investorError);
      }
      
      // Insert new interaction
      const { data, error } = await supabase
        .from('interactions')
        .insert([{
          investor_id: interaction.investor_id,
          type: interaction.type,
          date: interaction.date,
          notes: interaction.notes,
          follow_up: interaction.follow_up || null,
          created_at: new Date().toISOString()
        }])
        .select();
      
      if (error) {
        console.error("Error adding interaction:", error);
        throw error;
      }
      
      if (data && data.length > 0) {
        // Add the new interaction to the state with the investor name
        const newInteraction: Interaction = {
          ...data[0],
          investor_name: investorName
        };
        
        setInteractions(prev => [newInteraction, ...prev]);
        
        toast({
          title: 'Success',
          description: 'Interaction logged successfully',
        });
        
        return newInteraction;
      } else {
        throw new Error("No data returned from insert operation");
      }
    } catch (err: any) {
      console.error("Error in addInteraction:", err);
      toast({
        title: 'Error',
        description: `Failed to log interaction: ${err.message}`,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateInteraction = async (id: string, updates: Partial<Interaction>) => {
    try {
      // Only update fields that belong to the interactions table
      const interactionUpdates: any = {};
      if (updates.type) interactionUpdates.type = updates.type;
      if (updates.date) interactionUpdates.date = updates.date;
      if (updates.notes) interactionUpdates.notes = updates.notes;
      if ('follow_up' in updates) interactionUpdates.follow_up = updates.follow_up;
      if (updates.investor_id) interactionUpdates.investor_id = updates.investor_id;
      
      const { data, error } = await supabase
        .from('interactions')
        .update(interactionUpdates)
        .eq('id', id)
        .select();
      
      if (error) {
        console.error("Error updating interaction:", error);
        throw error;
      }
      
      if (data) {
        // Update the state with the updated interaction
        setInteractions(prev => 
          prev.map(interaction => 
            interaction.id === id ? { 
              ...interaction, 
              ...updates 
            } : interaction
          )
        );
        
        toast({
          title: 'Success',
          description: 'Interaction updated successfully',
        });
        
        return data[0];
      }
    } catch (err: any) {
      console.error("Error in updateInteraction:", err);
      toast({
        title: 'Error',
        description: `Failed to update interaction: ${err.message}`,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteInteraction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('interactions')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error("Error deleting interaction:", error);
        throw error;
      }
      
      // Remove the deleted interaction from the state
      setInteractions(prev => prev.filter(interaction => interaction.id !== id));
      
      toast({
        title: 'Success',
        description: 'Interaction deleted successfully',
      });
    } catch (err: any) {
      console.error("Error in deleteInteraction:", err);
      toast({
        title: 'Error',
        description: `Failed to delete interaction: ${err.message}`,
        variant: 'destructive',
      });
      throw err;
    }
  };

  // Fetch interactions on hook initialization
  useEffect(() => {
    fetchInteractions();
  }, []);

  return {
    interactions,
    loading,
    error,
    fetchInteractions,
    addInteraction,
    updateInteraction,
    deleteInteraction,
  };
};
