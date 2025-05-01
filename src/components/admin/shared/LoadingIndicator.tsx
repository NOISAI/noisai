
import { Loader2 } from "lucide-react";

interface LoadingIndicatorProps {
  message?: string;
  error?: string;
}

export default function LoadingIndicator({ 
  message = "Loading...",
  error 
}: LoadingIndicatorProps) {
  return (
    <div className="flex flex-col justify-center items-center py-8">
      {error ? (
        <div className="text-center p-4 rounded-md bg-red-950/30 border border-red-900">
          <p className="text-red-400 font-medium mb-1">Error</p>
          <p className="text-red-300">{error}</p>
        </div>
      ) : (
        <div className="flex items-center">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
