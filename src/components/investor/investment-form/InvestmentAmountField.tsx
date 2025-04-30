
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

interface InvestmentAmountFieldProps {
  form: UseFormReturn<InvestmentFormData>;
}

const InvestmentAmountField = ({ form }: InvestmentAmountFieldProps) => {
  return (
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
  );
};

export default InvestmentAmountField;
