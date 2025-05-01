
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

export const investorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  status: z.enum(["Active", "Inactive"]),
});

export type InvestorFormValues = z.infer<typeof investorSchema>;

interface InvestorFormProps {
  defaultValues?: InvestorFormValues;
  onSubmit: (data: InvestorFormValues) => void;
  formRef?: React.RefObject<HTMLFormElement>;
}

export default function InvestorForm({ defaultValues, onSubmit, formRef }: InvestorFormProps) {
  const form = useForm<InvestorFormValues>({
    resolver: zodResolver(investorSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      status: "Active",
    },
  });

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} className="bg-gray-800 border-gray-700" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} className="bg-gray-800 border-gray-700" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
