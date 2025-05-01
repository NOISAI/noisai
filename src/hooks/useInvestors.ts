
import { useState, useEffect } from 'react';
import { Investor } from '@/types/admin';
import { InvestorCrudOperations } from '@/types/investor';
import { 
  fetchInvestors, 
  addInvestorToSupabase, 
  updateInvestorInSupabase,
  deleteInvestorFromSupabase
} from '@/services/investorService';

export const useInvestors = (): {
  investors: Investor[];
  loading: boolean;
} & InvestorCrudOperations => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch investors on component mount
  useEffect(() => {
    const getInvestors = async () => {
      try {
        setLoading(true);
        const data = await fetchInvestors();
        setInvestors(data);
      } catch (error) {
        console.error('Error in useInvestors:', error);
      } finally {
        setLoading(false);
      }
    };

    getInvestors();
  }, []);

  // Add a new investor
  const add = async (investor: Partial<Investor>) => {
    try {
      const newInvestor = await addInvestorToSupabase(investor);
      
      if (newInvestor) {
        // Add to local state
        setInvestors(prev => [...prev, newInvestor]);
        return newInvestor;
      }
      return undefined;
    } catch (error) {
      console.error('Error adding investor:', error);
      return undefined;
    }
  };

  // Update an existing investor
  const update = async (id: string, updates: Partial<Investor>) => {
    try {
      const success = await updateInvestorInSupabase(id, updates);
      
      if (success) {
        // Update local state
        setInvestors(prev => prev.map(investor => 
          investor.id === id ? { ...investor, ...updates } : investor
        ));
      }
      
      return success;
    } catch (error) {
      console.error('Error updating investor:', error);
      return false;
    }
  };

  // Delete an investor
  const deleteInvestor = async (id: string) => {
    try {
      const success = await deleteInvestorFromSupabase(id);
      
      if (success) {
        // Update local state
        setInvestors(prev => prev.filter(investor => investor.id !== id));
      }
      
      return success;
    } catch (error) {
      console.error('Error deleting investor:', error);
      return false;
    }
  };

  // Toggle investor status
  const toggleStatus = async (id: string, currentStatus: 'Active' | 'Inactive') => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      // Update local state
      setInvestors(prev => prev.map(investor => 
        investor.id === id ? { ...investor, status: newStatus as 'Active' | 'Inactive' } : investor
      ));
      
      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      return false;
    }
  };

  return { 
    investors, 
    loading, 
    add, 
    update, 
    delete: deleteInvestor, 
    toggleStatus 
  };
};
