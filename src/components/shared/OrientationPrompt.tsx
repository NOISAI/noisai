
import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function OrientationPrompt() {
  const isMobile = useIsMobile();
  const [isPortrait, setIsPortrait] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    // Check initial orientation
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!isMobile || !isPortrait || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-black bg-opacity-80 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-[90%] border border-gray-700">
      <div className="bg-green-900 rounded-full p-2">
        <RotateCcw className="h-5 w-5 text-green-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">For better experience, rotate your device to landscape mode</p>
      </div>
      <button 
        onClick={() => setDismissed(true)} 
        className="text-gray-400 hover:text-white ml-2"
      >
        &times;
      </button>
    </div>
  );
}
