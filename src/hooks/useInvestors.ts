
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Investor } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

export const useInvestors = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchInvestors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('investors')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setInvestors(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Error',
        description: `Failed to load investors: ${err.message}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addInvestor = async (investor: Omit<Investor, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('investors')
        .insert([{
          ...investor,
          total_invested: investor.total_invested || 0,
          created_at: new Date().toISOString(),
        }])
        .select();
      
      if (error) throw error;
      
      setInvestors(prev => [data![0], ...prev]);
      toast({
        title: 'Success',
        description: 'Investor added successfully',
      });
      
      return data?.[0];
    } catch (err: any) {
      toast({
        title: 'Error',
        description: `Failed to add investor: ${err.message}`,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateInvestor = async (id: string, updates: Partial<Investor>) => {
    try {
      const { data, error } = await supabase
        .from('investors')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      setInvestors(prev => 
        prev.map(investor => 
          investor.id === id ? { ...investor, ...updates } : investor
        )
      );
      
      toast({
        title: 'Success',
        description: 'Investor updated successfully',
      });
      
      return data?.[0];
    } catch (err: any) {
      toast({
        title: 'Error',
        description: `Failed to update investor: ${err.message}`,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteInvestor = async (id: string) => {
    try {
      const { error } = await supabase
        .from('investors')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setInvestors(prev => prev.filter(investor => investor.id !== id));
      
      toast({
        title: 'Success',
        description: 'Investor deleted successfully',
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: `Failed to delete investor: ${err.message}`,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const toggleInvestorStatus = async (id: string, currentStatus: 'Active' | 'Inactive') => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    return updateInvestor(id, { status: newStatus });
  };

  useEffect(() => {
    fetchInvestors();
  }, []);

  return {
    investors,
    loading,
    error,
    fetchInvestors,
    addInvestor,
    updateInvestor,
    deleteInvestor,
    toggleInvestorStatus
  };
};
