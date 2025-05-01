
import { useState, useEffect } from 'react';
import { Interaction } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchInteractions as fetchInteractionsService,
  addInteraction as addInteractionService,
  updateInteraction as updateInteractionService,
  deleteInteraction as deleteInteractionService
} from '@/services/interactionService';

export const useInteractions = () => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchInteractions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError, usedMockData } = await fetchInteractionsService();
      
      if (fetchError) {
        setError(fetchError);
        toast({
          title: 'Error',
          description: 'Failed to load interactions. Using demo data instead.',
          variant: 'destructive',
        });
      } else if (usedMockData) {
        toast({
          title: 'Using Demo Mode',
          description: 'Connected to sample interaction data',
        });
      }
      
      setInteractions(data);
    } finally {
      setLoading(false);
    }
  };

  const addInteraction = async (interaction: Omit<Interaction, 'id' | 'created_at' | 'investor_name'>) => {
    try {
      const { data } = await addInteractionService(interaction);
      
      setInteractions(prev => [data, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Interaction logged successfully',
      });
      
      return data;
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
      const { data } = await updateInteractionService(id, updates);
      
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
      
      return data;
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
      await deleteInteractionService(id);
      
      // Remove the deleted interaction from the state
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
