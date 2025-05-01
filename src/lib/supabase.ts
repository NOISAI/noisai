
import { createClient } from '@supabase/supabase-js';

// Use the Supabase client from the integrations folder instead
import { supabase } from '@/integrations/supabase/client';

// Export the client for backward compatibility
export { supabase };
