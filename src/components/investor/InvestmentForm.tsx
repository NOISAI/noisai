
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Investment, investmentFormSchema, InvestmentFormData } from "@/types/investment";
import { sendInvestmentInterestEmail } from "@/services/emailService";

interface InvestmentFormProps {
  investment: Investment | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const InvestmentForm = ({ investment, onSuccess, onCancel }: InvestmentFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(investmentFormSchema),
    defaultValues: {
      amount: "10000",
      email: "",
    },
  });

  const handleInvest = async (data: InvestmentFormData) => {
    if (!investment) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare and send email
      await sendInvestmentInterestEmail({
        investorEmail: data.email,
        investmentName: investment.name,
        amount: data.amount,
      });
      
      toast({
        title: "Investment Request Submitted",
        description: "Your investment request has been sent to info@noisai.tech for review.",
      });
      
      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Error submitting investment:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your investment request. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleInvest)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Investment Amount ($)</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="number" 
                  min="10000"
                  placeholder="10000" 
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                Minimum investment is $10,000
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Your Email</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                We'll use this email to contact you about your investment
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        
        <div className="pt-4 text-sm text-gray-400">
          <p>By submitting this form, your investment request will be sent to info@noisai.tech for review.</p>
          <p className="mt-2">Our team will contact you with next steps for completing your investment.</p>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            type="button"
            variant="outline" 
            className="text-gray-400 border-gray-800 hover:bg-gray-800"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-black"
          >
            {isSubmitting ? "Submitting..." : "Submit Interest"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InvestmentForm;
