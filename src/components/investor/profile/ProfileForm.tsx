
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormValues, profileSchema } from "./profileSchema";

const ProfileForm = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [updating, setUpdating] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      email: "",
      investor_type: "individual",
      tax_id: "",
    },
  });

  // Create a profile update request instead of directly updating
  const onSubmit = async (values: ProfileFormValues) => {
    if (!user?.id) return;
    
    try {
      setUpdating(true);
      
      // Create a profile update request
      const { error } = await supabase
        .from("profile_update_requests")
        .insert({
          user_id: user.id,
          full_name: values.full_name,
          email: values.email,
          investor_type: values.investor_type,
          tax_id: values.tax_id,
          status: "pending",
          requested_at: new Date().toISOString(),
        });

      if (error) {
        console.error("Error creating profile update request:", error);
        toast({
          variant: "destructive",
          title: "Request failed",
          description: error.message,
        });
        return;
      }

      // Set flag to show success message
      setRequestSubmitted(true);

      toast({
        title: "Update request submitted",
        description: "Your profile update request has been sent for admin approval.",
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        variant: "destructive",
        title: "Request failed",
        description: "An unexpected error occurred",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      {requestSubmitted ? (
        <div className="bg-gray-800 p-6 rounded-md border border-gray-700 text-center">
          <h3 className="text-xl font-medium text-green-500 mb-2">Update Request Submitted</h3>
          <p className="text-gray-300 mb-4">
            Your profile update request has been submitted for admin approval. You will be notified once it's approved.
          </p>
          <Button 
            onClick={() => setRequestSubmitted(false)} 
            variant="outline" 
            className="border-gray-600"
          >
            Submit Another Request
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-amber-900/30 border border-amber-700/50 rounded-md p-4 mb-6">
              <p className="text-amber-200 text-sm">
                Profile updates require admin approval. Your changes will be reviewed before being applied to your account.
              </p>
            </div>
            
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
              {updating ? "Submitting..." : "Request Profile Update"}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default ProfileForm;
