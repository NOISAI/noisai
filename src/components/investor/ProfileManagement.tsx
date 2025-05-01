
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Create a schema for form validation
const profileSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  investor_type: z.enum(["individual", "entity", "fund"], {
    required_error: "Please select an investor type",
  }),
  tax_id: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileManagement = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      email: "",
      investor_type: "individual",
      tax_id: "",
    },
  });

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

  // Update user profile
  const onSubmit = async (values: ProfileFormValues) => {
    if (!user?.id) return;
    
    try {
      setUpdating(true);
      
      const { error } = await supabase
        .from("user_profiles")
        .update({
          full_name: values.full_name,
          email: values.email,
          investor_type: values.investor_type,
          tax_id: values.tax_id,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating profile:", error);
        toast({
          variant: "destructive",
          title: "Update failed",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An unexpected error occurred",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>Investor Profile</CardTitle>
        <CardDescription>Manage your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#22C55E]"></div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-400">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-400">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        type="email" 
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="investor_type"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-400">Investor Type</FormLabel>
                    <FormControl>
                      <select 
                        {...field}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                      >
                        <option value="individual">Individual</option>
                        <option value="entity">Entity/Company</option>
                        <option value="fund">Investment Fund</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tax_id"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-400">Tax ID / SSN</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit"
                disabled={updating}
                className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-black"
              >
                {updating ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileManagement;
