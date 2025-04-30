
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { InvestmentFormData } from "@/types/investment";

interface EmailFieldProps {
  form: UseFormReturn<InvestmentFormData>;
}

const EmailField = ({ form }: EmailFieldProps) => {
  return (
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
  );
};

export default EmailField;
