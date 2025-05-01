
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Investor } from "@/types/admin";

export const investmentSchema = z.object({
  investor_id: z.string().min(1, "Investor is required"),
  amount: z.string().min(1, "Amount is required")
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a valid number greater than zero",
    }),
  date: z.string().min(1, "Date is required"),
  type: z.string().min(1, "Investment type is required"),
  status: z.enum(["Completed", "Processing", "Cancelled"]),
});

export type InvestmentFormValues = z.infer<typeof investmentSchema>;

interface InvestmentFormProps {
  investors: Investor[];
  defaultValues?: InvestmentFormValues;
  onSubmit: (data: InvestmentFormValues) => void;
  formRef?: React.RefObject<HTMLFormElement>;
}

export default function InvestmentForm({
  investors,
  defaultValues,
  onSubmit,
  formRef
}: InvestmentFormProps) {
  const form = useForm<InvestmentFormValues>({
    resolver: zodResolver(investmentSchema),
    defaultValues: defaultValues || {
      investor_id: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      type: "Seed Round",
      status: "Processing",
    }
  });

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="investor_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investor</FormLabel>
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select an investor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-900 border-gray-800">
                  {investors.map((investor) => (
                    <SelectItem key={investor.id} value={investor.id}>
                      {investor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount ($)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="10000" 
                  {...field} 
                  className="bg-gray-800 border-gray-700" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input 
                  type="date" 
                  {...field} 
                  className="bg-gray-800 border-gray-700" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Type</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Seed Round" 
                  {...field} 
                  className="bg-gray-800 border-gray-700" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-900 border-gray-800">
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
