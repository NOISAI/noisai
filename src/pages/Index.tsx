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
      {!splineError && !showContent && (
        <div className="absolute inset-0 transition-opacity duration-1000">
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
          <div className="absolute top-8 left-8">
            <div className="flex items-center gap-2">
              <div className={`transition-transform duration-1000 ${
                !showLogoText ? '-rotate-90' : 'rotate-0'
              }`}>
                <img 
                  src="/lovable-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
                  alt="NOISAI Logo" 
                  className="w-8 h-8"
                />
              </div>
              <span 
                className={`text-[#22C55E] text-2xl font-bold transition-opacity duration-500
                  ${showLogoText ? 'opacity-100' : 'opacity-0'}`}
              >
                NOISAI
              </span>
            </div>
          </div>

          <Motion className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl mx-auto leading-tight bg-gradient-text animate-gradient-x">
              Sound Waves to Clean Energy
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Revolutionary technology that converts ambient sound into renewable electricity, powered by blockchain and AI
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white px-8 py-6 text-lg h-auto"
              >
                <Link className="mr-2 h-5 w-5" />
                Invest on NOISAI
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg h-auto"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>
          </Motion>
        </div>
      </div>

      <style>
        {`
          .bg-gradient-text {
            background: linear-gradient(to right, #ffffff 30%, #ffffff, #22e55c, #10b981, #059669, #047857);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 400% 400%;
            animation: gradient 15s ease-in-out infinite;
          }

          @keyframes gradient {
            0% { background-position: 0% 50%; }
            16.66% { background-position: 0% 50%; }
            33.33% { background-position: 25% 50%; }
            50% { background-position: 50% 50%; }
            66.66% { background-position: 75% 50%; }
            83.33% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </main>
  );
}
