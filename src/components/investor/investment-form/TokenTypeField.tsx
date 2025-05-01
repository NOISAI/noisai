
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { InvestmentFormData } from "@/types/investment";

interface TokenTypeFieldProps {
  form: UseFormReturn<InvestmentFormData>;
}

const TokenTypeField = ({ form }: TokenTypeFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="tokenType"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Token Type</FormLabel>
          <Select 
            defaultValue={field.value} 
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-gray-800 text-white border-gray-700">
              <SelectItem value="ETH">ETH (Sepolia)</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription className="text-gray-400">
            Investments are accepted in ETH on the Sepolia test network
          </FormDescription>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default TokenTypeField;
