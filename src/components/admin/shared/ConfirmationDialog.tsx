
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

interface ConfirmationDialogProps {
  title: string;
  description: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
  isSubmitting: boolean;
  confirmLabel?: string;
  confirmLoadingLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
}

export default function ConfirmationDialog({
  title,
  description,
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
  isSubmitting,
  confirmLabel = "Confirm",
  confirmLoadingLabel = "Processing...",
  cancelLabel = "Cancel",
  variant = "danger",
}: ConfirmationDialogProps) {
  const getConfirmButtonClass = () => {
    switch (variant) {
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white";
      case "warning":
        return "bg-amber-600 hover:bg-amber-700 text-white";
      case "info":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      default:
        return "bg-red-600 hover:bg-red-700 text-white";
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
            onClick={onCancel}
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className={getConfirmButtonClass()}
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {confirmLoadingLabel}
              </>
            ) : (
              <>{confirmLabel}</>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
