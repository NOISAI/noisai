
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CrudDialog from "@/components/admin/shared/CrudDialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define the form schema with validation
const addUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["node_operator", "node_viewer"], {
    required_error: "Please select a role",
  }),
  status: z.enum(["active", "inactive"], {
    required_error: "Please select a status",
  }),
});

type AddUserFormValues = z.infer<typeof addUserSchema>;

interface AddUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (userData: AddUserFormValues) => void;
}

export default function AddUserDialog({
  isOpen,
  onOpenChange,
  onAddUser,
}: AddUserDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form with default values
  const form = useForm<AddUserFormValues>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      email: "",
      role: "node_viewer",
      status: "active",
    },
  });

  const handleSubmit = async (values: AddUserFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real application, this would be an API call to create the user
      onAddUser(values);
      form.reset();
    } finally {
      setIsSubmitting(false);
      onOpenChange(false);
    }
  };

  return (
    <CrudDialog
      title="Add New User"
      description="Create a new user account for node access."
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onCancel={() => {
        form.reset();
        onOpenChange(false);
      }}
      onSubmit={form.handleSubmit(handleSubmit)}
      isSubmitting={isSubmitting}
      submitLabel="Add User"
      submitLoadingLabel="Adding..."
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="user@example.com" 
                    {...field} 
                    autoComplete="off"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Role Selection */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white">Role</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="node_operator">Node Operator</SelectItem>
                    <SelectItem value="node_viewer">Node Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Status Selection */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white">Status</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="active" />
                      <FormLabel htmlFor="active" className="text-white font-normal">
                        Active
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inactive" id="inactive" />
                      <FormLabel htmlFor="inactive" className="text-white font-normal">
                        Inactive
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </CrudDialog>
  );
}
