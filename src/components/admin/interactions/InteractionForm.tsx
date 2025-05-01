
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Investor } from "@/types/admin";

export const interactionSchema = z.object({
  investor_id: z.string().min(1, "Investor is required"),
  type: z.enum(["Call", "Email", "Meeting"]),
  date: z.string().min(1, "Date is required"),
  notes: z.string().min(1, "Notes are required"),
  follow_up: z.string().optional(),
});

export type InteractionFormValues = z.infer<typeof interactionSchema>;

interface InteractionFormProps {
  investors: Investor[];
  defaultValues?: InteractionFormValues;
  onSubmit: (data: InteractionFormValues) => void;
  formRef?: React.RefObject<HTMLFormElement>;
}

export default function InteractionForm({ 
  investors, 
  defaultValues, 
  onSubmit, 
  formRef 
}: InteractionFormProps) {
  const form = useForm<InteractionFormValues>({
    resolver: zodResolver(interactionSchema),
    defaultValues: defaultValues || {
      investor_id: "",
      type: "Call",
      date: new Date().toISOString().split('T')[0],
      notes: "",
      follow_up: "",
    },
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select interaction type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-900 border-gray-800">
                  <SelectItem value="Call">Call</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
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
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter interaction details..." 
                  {...field} 
                  className="bg-gray-800 border-gray-700 min-h-[80px]" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="follow_up"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Follow-Up Date (Optional)</FormLabel>
              <FormControl>
                <Input 
                  type="date" 
                  {...field} 
                  className="bg-gray-800 border-gray-700" 
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                Set a date if follow-up is needed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
