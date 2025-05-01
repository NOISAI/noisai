
import { toast } from "@/hooks/use-toast";

export const notifyInvestorAdded = (name: string) => {
  toast({
    title: "Investor added",
    description: `${name} has been added successfully.`,
  });
};

export const notifyInvestorUpdated = () => {
  toast({
    title: "Investor updated",
    description: `Investor has been updated successfully.`,
  });
};

export const notifyInvestorDeleted = () => {
  toast({
    title: "Investor deleted",
    description: `Investor has been deleted successfully.`,
  });
};

export const notifyError = (title: string, message: string) => {
  toast({
    variant: "destructive",
    title,
    description: message,
  });
};
