
import { ReactNode } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CrudDialogProps {
  title: string;
  description: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitLabel: string;
  submitLoadingLabel?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function CrudDialog({
  title,
  description,
  isOpen,
  onOpenChange,
  onCancel,
  onSubmit,
  isSubmitting,
  submitLabel,
  submitLoadingLabel = "Saving...",
  children,
  size = "md",
}: CrudDialogProps) {
  const maxWidthClass = 
    size === "sm" ? "max-w-sm" : 
    size === "lg" ? "max-w-2xl" : 
    "max-w-md";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`bg-gray-900 border-gray-800 text-white ${maxWidthClass}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        {children}
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-700"
            type="button"
          >
            Cancel
          </Button>
          <Button 
            onClick={onSubmit}
            className="bg-[#22C55E] hover:bg-[#1ea853] text-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {submitLoadingLabel}
              </>
            ) : (
              <>{submitLabel}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
