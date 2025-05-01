
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ProfileForm from "./ProfileForm";
import { ProfileFormValues } from "./profileSchema";
import { useForm } from "react-hook-form";

const ProfileLoader = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>();
  const [pendingRequest, setPendingRequest] = useState(false);

  // Check if a profile exists for the user and create one if it doesn't
  const ensureProfileExists = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      
      if (error) {
        console.error("Error checking profile:", error);
        return false;
      }
      
      // If profile doesn't exist, create one
      if (!data) {
        const { error: insertError } = await supabase
          .from("user_profiles")
          .insert({
            id: userId,
            full_name: user?.fullName || "",
            email: user?.primaryEmailAddress?.emailAddress || "",
            investor_type: "individual",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
          
        if (insertError) {
          console.error("Error creating profile:", insertError);
          return false;
        }
        
        return true;
      }
      
      return true;
    } catch (error) {
      console.error("Unexpected error:", error);
      return false;
    }
  };

  // Check for pending profile update requests
  const checkForPendingRequests = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profile_update_requests")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "pending")
        .maybeSingle();
        
      if (error) {
        console.error("Error checking pending requests:", error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error("Unexpected error checking requests:", error);
      return false;
    }
  };

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        
        // Ensure profile exists before fetching
        const profileExists = await ensureProfileExists(user.id);
        
        if (!profileExists) {
          toast({
            variant: "destructive",
            title: "Profile Error",
            description: "Could not load or create your profile.",
          });
          setLoading(false);
          return;
        }
        
        // Check for pending requests
        const hasPendingRequest = await checkForPendingRequests(user.id);
        setPendingRequest(hasPendingRequest);
        
        // Fetch profile data
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            variant: "destructive",
            title: "Failed to load profile",
            description: error.message,
          });
          return;
        }

        if (data) {
          form.reset({
            full_name: data.full_name || "",
            email: data.email || "",
            investor_type: data.investor_type as "individual" | "entity" | "fund",
            tax_id: data.tax_id || "",
          });
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, form, toast]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#22C55E]"></div>
      </div>
    );
  }

  if (pendingRequest) {
    return (
      <div className="bg-amber-900/30 border border-amber-700/50 rounded-md p-6 text-center">
        <h3 className="text-xl font-medium text-amber-400 mb-2">Profile Update Pending</h3>
        <p className="text-gray-300 mb-4">
          Your profile update request is currently under review. You'll be notified when it's approved.
        </p>
        <p className="text-sm text-gray-400">
          You cannot submit new profile updates until your current request is processed.
        </p>
      </div>
    );
  }

  return <ProfileForm />;
};

export default ProfileLoader;
