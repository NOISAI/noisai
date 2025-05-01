
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
    // Since there's no "investments" table yet in our Supabase schema,
    // we'll use the mock data directly
    return {
      data: mockInvestments,
      error: "Investments table does not exist yet. Using mock data.",
      usedMockData: true
    };
    
    /* For future use when the investments table exists:
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
    
    // Format the data with proper type assertion
    const formattedData = data.map(item => ({
      id: item.id,
      investor_id: item.investor_id || '',
      investor_name: item.investor?.name || 'Unknown',
      amount: item.amount || 0,
      date: item.date || new Date().toISOString().split('T')[0],
      type: item.type || '',
      status: item.status || 'Processing',
      created_at: item.created_at
    })) as Investment[];
    
    return {
      data: formattedData,
      error: null,
      usedMockData: false
    };
    */
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
      error: "Using mock data - no investments table exists yet."
    };
  } catch (err: any) {
    console.error("Failed to add investment:", err);
    
    // Still return a mock investment for the demo
    const mockId = `mock-${Date.now()}`;
    const newInvestment: Investment = {
      id: mockId,
      investor_id: investment.investor_id,
      investor_name: 'Unknown',
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
    // For development purposes, return a simulated successful update
    const updatedInvestment = mockInvestments.find(i => i.id === id);
    
    if (updatedInvestment) {
      const updatedData = {
        ...updatedInvestment,
        ...updates
      };
      
      return {
        data: updatedData as Investment,
        error: "Using mock data - no investments table exists yet."
      };
    }
    
    return {
      data: null,
      error: "Investment not found"
    };
  } catch (err: any) {
    console.error("Failed to update investment:", err);
    
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
    // For development purposes, pretend the delete succeeded
    return {
      error: "Using mock data - no investments table exists yet."
    };
  } catch (err: any) {
    console.error("Failed to delete investment:", err);
    
    return {
      error: err.message
    };
  }
};
