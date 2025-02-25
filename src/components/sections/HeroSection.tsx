
import { Motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Github, Link } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { useIsMobile } from "@/hooks/use-mobile";
import { Header } from "@/components/layout/Header";

interface HeroSectionProps {
  showContent: boolean;
  showRotation: boolean;
  showLogoText: boolean;
  isLoaded: boolean;
  hasStarted: boolean;
  onSplineLoad: (splineApp: any) => void;
}

export const HeroSection = ({
  showContent,
  showRotation,
  showLogoText,
  isLoaded,
  hasStarted,
  onSplineLoad
}: HeroSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {!showContent && (
        <div className="fixed inset-0">
          <Spline
            scene="https://prod.spline.design/rGP8VoiJZXNCrcRD/scene.splinecode"
            className="w-full h-full"
            onLoad={onSplineLoad}
          />
          {isMobile && !hasStarted && isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-lg animate-pulse">Click anywhere to begin</p>
            </div>
          )}
        </div>
      )}

      {showContent && (
        <>
          <Header showRotation={showRotation} showLogoText={showLogoText} />

          <div className="mt-32 w-full h-[450px] md:h-[400px] mb-8">
            <Spline 
              scene="https://prod.spline.design/Wfx6S6vnF-LjKSSy/scene.splinecode"
              className="w-full h-full"
            />
          </div>

          <Motion className="text-center space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 max-w-4xl mx-auto leading-[1.4] md:leading-[1.4] bg-gradient-text animate-gradient-x px-4">
              Sound Waves to Clean Energy
            </h1>
            <h3 className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-12 px-4">
              Revolutionary technology that converts ambient sound into renewable electricity, powered by blockchain and AI
            </h3>
            <div className="flex flex-wrap justify-center gap-4 px-4">
              <Button
                className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg h-auto w-full md:w-auto"
              >
                <Link className="mr-2 h-5 w-5" />
                Invest in NOISAI
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg h-auto w-full md:w-auto"
                onClick={() => window.open('https://github.com/NOISAI', '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>
          </Motion>
        </>
      )}
    </>
  );
};
