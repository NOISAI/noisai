
import { ArrowRight } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function WelcomeAlert() {
  return (
    <Alert className="bg-blue-900/20 border border-blue-800 mb-6">
      <AlertTitle className="text-blue-300">Getting Started with the Admin Dashboard</AlertTitle>
      <AlertDescription className="text-blue-200">
        <p className="mb-2">Welcome to the NOISAI admin dashboard. Here you can manage investors, track interactions, monitor investments, and generate reports.</p>
        <Button 
          variant="link" 
          className="text-[#22C55E] p-0 h-auto font-normal flex items-center hover:text-[#22C55E]/80"
        >
          View the admin guide <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
