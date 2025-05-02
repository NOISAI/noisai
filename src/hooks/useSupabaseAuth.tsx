
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '@/types/role';

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
      
      // Determine other roles based on email patterns
      if (email.includes('business')) {
        setUserRole('business');
        return;
      }
      
      // Default to user role if no special conditions are met
      setUserRole('user');
    } catch (error) {
      console.error("Error determining user role:", error);
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
