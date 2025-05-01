
import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import AdminGuide from "./AdminGuide";

export default function WelcomeAlert() {
  const [isVisible, setIsVisible] = useState(true);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  if (!isVisible) return null;

  return (
    <>
      <Alert className="bg-blue-900/20 border border-blue-800 mb-6 relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 h-7 w-7 text-blue-300 hover:text-blue-100 hover:bg-blue-800/50"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        <AlertTitle className="text-blue-300">Getting Started with the Admin Dashboard</AlertTitle>
        <AlertDescription className="text-blue-200">
          <p className="mb-2">Welcome to the NOISAI admin dashboard. Here you can manage investors, track interactions, monitor investments, and generate reports.</p>
          <Button 
            variant="link" 
            className="text-[#22C55E] p-0 h-auto font-normal flex items-center hover:text-[#22C55E]/80"
            onClick={() => setIsGuideOpen(true)}
          >
            View the admin guide <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </AlertDescription>
      </Alert>
      
      <AdminGuide open={isGuideOpen} onOpenChange={setIsGuideOpen} />
    </>
  );
}
