
import { Loader2 } from "lucide-react";

interface LoadingIndicatorProps {
  message?: string;
}

export default function LoadingIndicator({ 
  message = "Loading..." 
}: LoadingIndicatorProps) {
  return (
    <div className="flex justify-center items-center py-8">
      <Loader2 className="h-6 w-6 animate-spin mr-2" />
      <span>{message}</span>
    </div>
  );
}
