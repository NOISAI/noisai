
import { z } from "zod";

// Schema for investment form validation
export const investmentFormSchema = z.object({
  amount: z.string().min(1, "Investment amount is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Must be a valid number",
    })
    .refine((val) => Number(val) >= 10000, {
      message: "Minimum investment is $10,000",
    }),
  email: z.string().email("Please enter a valid email address"),
});

// Type for form data based on the schema
export type InvestmentFormData = z.infer<typeof investmentFormSchema>;

// Investment data type
export interface Investment {
  id: number;
  name: string;
  amount: number;
  target: number;
  raised: number;
  date: string;
  status: string;
  roi: string;
  endDate: string;
}
