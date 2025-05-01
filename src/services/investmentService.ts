
import { supabase } from "@/lib/supabase";
import { Investment } from "@/types/admin";
import { mockInvestments } from "@/data/mockInvestments";

// Fetch all investments
export const fetchInvestments = async (): Promise<{
  data: Investment[];
  error: string | null;
  usedMockData: boolean;
}> => {
  try {
    // Since we know the investments table doesn't exist yet, we'll use mock data
    // In a real implementation, this would query a real investments table
    
    // This is just to show intent - we know it will fail in the current database state
    const { data, error } = await supabase
      .from('investments')
      .select('*, investor:investor_id(name)')
      .order('date', { ascending: false });
    
    if (error) {
      console.error("Supabase error:", error);
      // Fall back to mock data
      return {
        data: mockInvestments,
        error: error.message,
        usedMockData: true
      };
    }
    
    // Format the data
    const formattedData = data.map(item => ({
      id: item.id,
      investor_id: item.investor_id,
      investor_name: item.investor?.name || 'Unknown',
      amount: item.amount,
      date: item.date,
      type: item.type,
      status: item.status,
      created_at: item.created_at
    }));
    
    return {
      data: formattedData,
      error: null,
      usedMockData: false
    };
  } catch (err: any) {
    console.error("Failed to fetch investments:", err);
    // Fall back to mock data
    return {
      data: mockInvestments,
      error: err.message,
      usedMockData: true
    };
  }
};

// Add a new investment
export const addInvestment = async (investment: Omit<Investment, 'id' | 'created_at' | 'investor_name'>): Promise<{
  data: Investment;
  error: string | null;
}> => {
  try {
    // In a real implementation, this would insert into the investments table
    const { data, error } = await supabase
      .from('investments')
      .insert([{
        ...investment,
        created_at: new Date().toISOString(),
      }])
      .select('*, investor:investor_id(name)')
      .single();
    
    if (error) throw error;
    
    // Format the returned data
    const formattedData = {
      id: data.id,
      investor_id: data.investor_id,
      investor_name: data.investor?.name || 'Unknown',
      amount: data.amount,
      date: data.date,
      type: data.type,
      status: data.status,
      created_at: data.created_at
    };
    
    return {
      data: formattedData,
      error: null
    };
  } catch (err: any) {
    console.error("Failed to add investment:", err);
    
    // Simulate a successful response with mock data in development
    const mockId = `mock-${Date.now()}`;
    const newInvestment: Investment = {
      id: mockId,
      investor_id: investment.investor_id,
      investor_name: 'Unknown', // In a mock environment, we don't have the investor name
      amount: investment.amount,
      date: investment.date,
      type: investment.type,
      status: investment.status,
      created_at: new Date().toISOString()
    };
    
    return {
      data: newInvestment,
      error: err.message
    };
  }
};

// Update an existing investment
export const updateInvestment = async (id: string, updates: Partial<Investment>): Promise<{
  data: Investment | null;
  error: string | null;
}> => {
  try {
    // In a real implementation, this would update the investments table
    const { data, error } = await supabase
      .from('investments')
      .update(updates)
      .eq('id', id)
      .select('*, investor:investor_id(name)')
      .single();
    
    if (error) throw error;
    
    // Format the returned data
    const formattedData = {
      id: data.id,
      investor_id: data.investor_id,
      investor_name: data.investor?.name || 'Unknown',
      amount: data.amount,
      date: data.date,
      type: data.type,
      status: data.status,
      created_at: data.created_at
    };
    
    return {
      data: formattedData,
      error: null
    };
  } catch (err: any) {
    console.error("Failed to update investment:", err);
    
    // For development purposes, return a simulated successful update
    // In production, this would properly handle the error
    const updatedInvestment = mockInvestments.find(i => i.id === id);
    
    if (updatedInvestment) {
      const updatedData = {
        ...updatedInvestment,
        ...updates
      };
      
      return {
        data: updatedData as Investment,
        error: err.message
      };
    }
    
    return {
      data: null,
      error: err.message
    };
  }
};

// Delete an investment
export const deleteInvestment = async (id: string): Promise<{
  error: string | null;
}> => {
  try {
    // In a real implementation, this would delete from the investments table
    const { error } = await supabase
      .from('investments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return {
      error: null
    };
  } catch (err: any) {
    console.error("Failed to delete investment:", err);
    
    // For development purposes, pretend the delete succeeded
    return {
      error: err.message
    };
  }
};
