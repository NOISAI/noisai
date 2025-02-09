
import { Button } from "@/components/ui/button";
import { Github, Link } from "lucide-react";
import { Motion } from "@/components/ui/motion";
import Spline from "@splinetool/react-spline";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroSectionProps {
  onSplineLoad: (splineApp: any) => void;
}

export const HeroSection = ({ onSplineLoad }: HeroSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className={`w-full ${isMobile ? 'h-[340px] mt-16' : 'h-[400px] mt-8'}`}>
        <Spline
          scene="https://prod.spline.design/WPMa2X2U2NClGTaW/scene.splinecode"
          className="w-full h-full"
          onLoad={onSplineLoad}
        />
      </div>

      <Motion className="text-center space-y-6 md:space-y-8 mt-8 md:mt-0">
        <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 max-w-4xl mx-auto leading-tight bg-gradient-text animate-gradient-x px-4">
          Sound Waves to Clean Energy
        </h1>
        <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-12 px-4">
          Revolutionary technology that converts ambient sound into renewable electricity, powered by blockchain and AI
        </p>
        <div className="flex flex-wrap justify-center gap-4 px-4">
          <Button
            className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg h-auto w-full md:w-auto"
          >
            <Link className="mr-2 h-5 w-5" />
            Invest on NOISAI
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg h-auto w-full md:w-auto"
          >
            <Github className="mr-2 h-5 w-5" />
            View on GitHub
          </Button>
        </div>
      </Motion>
    </>
  );
};

