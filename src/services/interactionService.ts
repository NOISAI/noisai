
import { supabase } from '@/lib/supabase';
import { Interaction } from '@/types/admin';
import { mockInteractions } from '@/data/mockInteractions';

/**
 * Fetches all interactions from the database
 * Falls back to mock data if there's an error or no data
 */
export async function fetchInteractions() {
  try {
    // Use type assertion to bypass TypeScript errors related to missing table
    const { data, error } = await (supabase
      .from('interactions' as any)
      .select('*')
      .order('date', { ascending: false }) as any);
    
    if (error) {
      console.error("Database error:", error);
      return { data: mockInteractions, error: null, usedMockData: true };
    }
    
    if (data && data.length > 0) {
      // Format the data from the database with type assertion
      const formattedData = data.map((item: any) => ({
        id: item.id,
        investor_id: item.investor_id,
        investor_name: item.investor_name || 'Unknown Investor',
        type: item.type,
        date: item.date,
        notes: item.notes,
        follow_up: item.follow_up,
        created_at: item.created_at
      } as Interaction));
      
      return { data: formattedData, error: null, usedMockData: false };
    }
    
    // If no data returned, use mock data
    return { data: mockInteractions, error: null, usedMockData: true };
  } catch (err: any) {
    console.error("Error in fetchInteractions:", err);
    return { data: mockInteractions, error: err.message, usedMockData: true };
  }
}

/**
 * Adds a new interaction to the database
 */
export async function addInteraction(interaction: Omit<Interaction, 'id' | 'created_at' | 'investor_name'>) {
  try {
    // Try to insert new interaction using any type to avoid TypeScript errors
    const { data, error } = await (supabase
      .from('interactions' as any)
      .insert([{
        investor_id: interaction.investor_id,
        type: interaction.type,
        date: interaction.date,
        notes: interaction.notes,
        follow_up: interaction.follow_up || null
      }])
      .select() as any);
    
    if (error) {
      console.error("Error adding interaction:", error);
      throw error;
    }
    
    if (data && data.length > 0) {
      // Add the new interaction to the state
      const newInteraction: Interaction = {
        ...data[0],
        investor_name: 'New Investor' // Default name if we can't fetch the real one
      };
      
      // Try to get the investor's name
      try {
        const { data: userData } = await supabase
          .from('user_profiles')
          .select('full_name')
          .eq('id', interaction.investor_id)
          .single();
          
        if (userData) {
          newInteraction.investor_name = userData.full_name;
        }
      } catch (nameError) {
        console.error("Could not fetch investor name:", nameError);
      }
      
      return { data: newInteraction, error: null };
    } else {
      throw new Error("No data returned from insert operation");
    }
  } catch (err: any) {
    console.error("Error in addInteraction:", err);
    throw err;
  }
}

/**
 * Updates an existing interaction in the database
 */
export async function updateInteraction(id: string, updates: Partial<Interaction>) {
  try {
    // Only update fields that belong to the interactions table
    const interactionUpdates: any = {};
    if (updates.type) interactionUpdates.type = updates.type;
    if (updates.date) interactionUpdates.date = updates.date;
    if (updates.notes) interactionUpdates.notes = updates.notes;
    if ('follow_up' in updates) interactionUpdates.follow_up = updates.follow_up;
    if (updates.investor_id) interactionUpdates.investor_id = updates.investor_id;
    
    const { data, error } = await (supabase
      .from('interactions' as any)
      .update(interactionUpdates)
      .eq('id', id)
      .select() as any);
    
    if (error) {
      console.error("Error updating interaction:", error);
      throw error;
    }
    
    if (data) {
      return { data: data[0], error: null };
    }
    
    throw new Error("No data returned from update operation");
  } catch (err: any) {
    console.error("Error in updateInteraction:", err);
    throw err;
  }
}

/**
 * Deletes an interaction from the database
 */
export async function deleteInteraction(id: string) {
  try {
    const { error } = await (supabase
      .from('interactions' as any)
      .delete()
      .eq('id', id) as any);
    
    if (error) {
      console.error("Error deleting interaction:", error);
      throw error;
    }
    
    return { success: true, error: null };
  } catch (err: any) {
    console.error("Error in deleteInteraction:", err);
    throw err;
  }
}
