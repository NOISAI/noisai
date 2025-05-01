
import { useState, useEffect } from 'react';
import { Investment } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchInvestments as fetchInvestmentsService,
  addInvestment as addInvestmentService,
  updateInvestment as updateInvestmentService,
  deleteInvestment as deleteInvestmentService
} from '@/services/investmentService';

export const useInvestments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const fetchInvestments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError, usedMockData } = await fetchInvestmentsService();
      
      if (fetchError) {
        setError(fetchError);
        toast({
          title: 'Error',
          description: 'Failed to load investments. Using demo data instead.',
          variant: 'destructive',
        });
      } else if (usedMockData) {
        toast({
          title: 'Using Demo Mode',
          description: 'Connected to sample investment data',
        });
      }
      
      setInvestments(data);
    } finally {
      setLoading(false);
    }
  };

  const addInvestment = async (investment: Omit<Investment, 'id' | 'created_at' | 'investor_name'>) => {
    try {
      const { data, error: addError } = await addInvestmentService(investment);
      
      if (addError) {
        toast({
          title: 'Warning',
          description: 'Connected to demo mode. Changes won\'t be saved.',
          variant: 'destructive',
        });
      }
      
      setInvestments(prev => [data, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Investment added successfully',
      });
      
      return data;
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
      const { data, error: updateError } = await updateInvestmentService(id, updates);
      
      if (updateError) {
        toast({
          title: 'Warning',
          description: 'Connected to demo mode. Changes won\'t be saved.',
          variant: 'destructive',
        });
      }
      
      if (data) {
        setInvestments(prev => 
          prev.map(investment => 
            investment.id === id ? { ...investment, ...updates } : investment
          )
        );
      }
      
      toast({
        title: 'Success',
        description: 'Investment updated successfully',
      });
      
      return data;
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
      const { error: deleteError } = await deleteInvestmentService(id);
      
      if (deleteError) {
        toast({
          title: 'Warning',
          description: 'Connected to demo mode. Changes won\'t be saved.',
          variant: 'destructive',
        });
      }
      
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
