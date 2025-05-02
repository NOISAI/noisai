
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type UserRole = 'admin' | 'user' | null;

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Fetch role when session changes - but don't call directly in the auth callback
        if (currentSession?.user) {
          // Use setTimeout to avoid potential Supabase deadlocks
          setTimeout(() => {
            fetchUserRole(currentSession.user.id, currentSession.user.email || '');
          }, 0);
        } else {
          setUserRole(null);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Fetch role for existing session
      if (currentSession?.user) {
        fetchUserRole(currentSession.user.id, currentSession.user.email || '');
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserRole = async (userId: string, email: string) => {
    try {
      // Check if the email is info@noisai.tech first (hardcoded admin)
      if (email === 'info@noisai.tech') {
        setUserRole('admin');
        return;
      }
      
      // Instead of trying to query a non-existent table,
      // we'll use a different approach to determine role
      // This fixes the TypeScript error
      
      // In a real application, you would check role from a database table
      // or call an RPC function
      
      // Since we don't have a user_roles table defined in the Database type,
      // we'll use a simple email-based check as a workaround
      
      // Try to call has_role function if it exists, otherwise use a fallback
      try {
        const { data, error } = await supabase.rpc('has_role', {
          requested_user_id: userId,
          requested_role: 'admin'
        });
        
        if (error) {
          console.error("Error fetching user role:", error);
          // Fall back to email-based role assignment
          setUserRole(email === 'info@noisai.tech' ? 'admin' : 'user');
        } else if (data) {
          // If the has_role function returns true, user is admin
          setUserRole(data ? 'admin' : 'user');
        } else {
          setUserRole('user');
        }
      } catch (rpcError) {
        console.error("RPC function failed:", rpcError);
        // Fall back to email-based role assignment
        setUserRole(email === 'info@noisai.tech' ? 'admin' : 'user');
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      setUserRole('user'); // Default to user role on error
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    session,
    isLoading,
    signOut,
    userRole
  };
};
