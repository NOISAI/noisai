
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormValues, profileSchema } from "./profileSchema";

const ProfileForm = () => {
  const { toast } = useToast();
  const { user } = useUser();
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
  );
};

export default ProfileForm;
