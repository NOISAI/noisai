
import { z } from "zod";

// Create a schema for form validation
export const profileSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  investor_type: z.enum(["individual", "entity", "fund"], {
    required_error: "Please select an investor type",
  }),
  tax_id: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
