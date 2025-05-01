
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Interaction } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

export const useInteractions = () => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchInteractions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('interactions')
        .select('*, investors(name)')
        .order('date', { ascending: false });
      
      if (error) throw error;
      
      const formattedData = data?.map(item => ({
        ...item,
        investor_name: item.investors.name
      })) || [];
      
      setInteractions(formattedData);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Error',
        description: `Failed to load interactions: ${err.message}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addInteraction = async (interaction: Omit<Interaction, 'id' | 'created_at' | 'investor_name'>) => {
    try {
      // Get investor name
      const { data: investorData, error: investorError } = await supabase
        .from('investors')
        .select('name')
        .eq('id', interaction.investor_id)
        .single();
      
      if (investorError) throw investorError;
      
      const { data, error } = await supabase
        .from('interactions')
        .insert([{
          ...interaction,
          created_at: new Date().toISOString(),
        }])
        .select();
      
      if (error) throw error;
      
      const newInteraction = {
        ...data![0],
        investor_name: investorData.name
      };
      
      setInteractions(prev => [newInteraction, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Interaction logged successfully',
      });
      
      return newInteraction;
    } catch (err: any) {
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
      const { data, error } = await supabase
        .from('interactions')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      setInteractions(prev => 
        prev.map(interaction => 
          interaction.id === id ? { ...interaction, ...updates } : interaction
        )
      );
      
      toast({
        title: 'Success',
        description: 'Interaction updated successfully',
      });
      
      return data?.[0];
    } catch (err: any) {
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
      
      if (error) throw error;
      
      setInteractions(prev => prev.filter(interaction => interaction.id !== id));
      
      toast({
        title: 'Success',
        description: 'Interaction deleted successfully',
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: `Failed to delete interaction: ${err.message}`,
        variant: 'destructive',
      });
      throw err;
    }
  };

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
