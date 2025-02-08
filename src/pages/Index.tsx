
import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { Motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Github, Link } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";

export default function Index() {
  const [showContent, setShowContent] = useState(false);
  const [showLogoText, setShowLogoText] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Handle Spline load error
  const onSplineError = () => {
    console.error("Spline failed to load");
    setSplineError(true);
    setShowContent(true);
    toast({
      variant: "destructive",
      title: "3D Scene Load Error",
      description: "Failed to load 3D scene. Showing regular content instead.",
    });
  };

  // Show logo text after content appears
  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => {
        setShowLogoText(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showContent]);

  return (
    <main 
      className="w-screen h-screen bg-[#0B0F17]"
    >
      {/* 3D Scene */}
      {!splineError && (
        <div className="absolute inset-0">
          <Spline
            scene="https://prod.spline.design/rGP8VoiJZXNCrcRD/scene.splinecode"
            className="w-full h-full"
            onError={onSplineError}
            onLoad={() => {
              console.log("Spline loaded successfully");
              setShowContent(true);
            }}
          />
        </div>
      )}

      {/* Content */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-full h-full flex flex-col items-center justify-center px-4">
          <div