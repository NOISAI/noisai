
import { useState, useEffect } from 'react';
import { Investor } from '@/types/admin';
import { 
  fetchInvestors, 
  addInvestorToSupabase, 
  updateInvestorInSupabase,
  deleteInvestorFromSupabase
} from '@/services/investorService';

export const useInvestors = () => {
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
  const addInvestor = async (investor: Partial<Investor>) => {
    const newInvestor = await addInvestorToSupabase(investor);
    if (newInvestor) {
      setInvestors(prev => [...prev, newInvestor]);
      return newInvestor;
    }
    return undefined;
  };

  // Update an existing investor
  const updateInvestor = async (id: string, updates: Partial<Investor>) => {
    const success = await updateInvestorInSupabase(id, updates);
    
    if (success) {
      // Update local state
      setInvestors(prev => prev.map(investor => 
        investor.id === id ? { ...investor, ...updates } : investor
      ));
    }
  };

  // Delete an investor
  const deleteInvestor = async (id: string) => {
    const success = await deleteInvestorFromSupabase(id);
    
    if (success) {
      // Update local state
      setInvestors(prev => prev.filter(investor => investor.id !== id));
    }
  };

  // Toggle investor status
  const toggleInvestorStatus = async (id: string, currentStatus: 'Active' | 'Inactive') => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      // Update local state only as Supabase doesn't have a status field
      setInvestors(prev => prev.map(investor => 
        investor.id === id ? { ...investor, status: newStatus as 'Active' | 'Inactive' } : investor
      ));
      
      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      return false;
    }
  };

  return { investors, loading, addInvestor, updateInvestor, deleteInvestor, toggleInvestorStatus };
};
