
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Investment } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

export const useInvestments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const fetchInvestments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('investments')
        .select('*, investors(name)')
        .order('date', { ascending: false });
      
      if (error) throw error;
      
      const formattedData = data?.map(item => ({
        ...item,
        investor_name: item.investors.name
      })) || [];
      
      setInvestments(formattedData);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Error',
        description: `Failed to load investments: ${err.message}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addInvestment = async (investment: Omit<Investment, 'id' | 'created_at' | 'investor_name'>) => {
    try {
      // Get investor name
      const { data: investorData, error: investorError } = await supabase
        .from('investors')
        .select('name')
        .eq('id', investment.investor_id)
        .single();
      
      if (investorError) throw investorError;
      
      const { data, error } = await supabase
        .from('investments')
        .insert([{
          ...investment,
          created_at: new Date().toISOString(),
        }])
        .select();
      
      if (error) throw error;
      
      const newInvestment = {
        ...data![0],
        investor_name: investorData.name
      };
      
      setInvestments(prev => [newInvestment, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Investment added successfully',
      });
      
      return newInvestment;
    } catch (err: any) {
      toast({
        title: 'Error',
        description: `Failed to add investment: ${err.message}`,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateInvestment = async (id: string, updates: Partial<Investment>) => {
    try {
      const { data, error } = await supabase
        .from('investments')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      setInvestments(prev => 
        prev.map(investment => 
          investment.id === id ? { ...investment, ...updates } : investment
        )
      );
      
      toast({
        title: 'Success',
        description: 'Investment updated successfully',
      });
      
      return data?.[0];
    } catch (err: any) {
      toast({
        title: 'Error',
        description: `Failed to update investment: ${err.message}`,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteInvestment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('investments')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setInvestments(prev => prev.filter(investment => investment.id !== id));
      
      toast({
        title: 'Success',
        description: 'Investment deleted successfully',
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: `Failed to delete investment: ${err.message}`,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const getInvestmentStats = () => {
    const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const recentInvestments = investments.filter(
      inv => new Date(inv.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length;
    const averageInvestment = totalInvestment / (investments.length || 1);
    
    return {
      totalInvestment,
      recentInvestments,
      averageInvestment
    };
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  return {
    investments,
    loading,
    error,
    stats: getInvestmentStats(),
    fetchInvestments,
    addInvestment,
    updateInvestment,
    deleteInvestment,
  };
};
