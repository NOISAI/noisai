
import { useState, useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { LiveStats } from "@/components/sections/LiveStats";
import { Features } from "@/components/sections/Features";
import { BlockchainIntegration } from "@/components/features/BlockchainIntegration";
import { TokenomicsSection } from "@/components/sections/TokenomicsSection";
import { SplineAnimationController } from "@/components/animation/SplineAnimationController";
import { useStatsController } from "@/components/stats/StatsController";
import { Footer } from "@/components/sections/Footer";

export default function Index() {
  const [showContent, setShowContent] = useState(false);
  const [showLogoText, setShowLogoText] = useState(false);
  const [showRotation, setShowRotation] = useState(false);
  const [spline, setSpline] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const liveStats = useStatsController();

  const onSplineLoad = (splineApp) => {
    console.log("Spline loaded");
    setSpline(splineApp);
    setIsLoaded(true);
  };

  const handleAnimationComplete = () => {
    setShowContent(true);
    setIsAnimating(false);
  };

  useEffect(() => {
    if (showContent) {
      setTimeout(() => {
        setShowRotation(true);
        setTimeout(() => {
          setShowLogoText(true);
        }, 500);
      }, 5000);
    }
  }, [showContent]);

  return (
    <main className="relative w-screen min-h-screen bg-black">
      <SplineAnimationController
        isLoaded={isLoaded}
        spline={spline}
        isAnimating={isAnimating}
        hasStarted={hasStarted}
        onAnimationComplete={handleAnimationComplete}
        onSplineLoad={onSplineLoad}
      />
      
      <div className="relative w-full min-h-screen opacity-0 animate-[fade-in_1.5s_ease-out_forwards] px-4 md:px-0">
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
          <HeroSection
            showContent={showContent}
            showRotation={showRotation}
            showLogoText={showLogoText}
            isLoaded={isLoaded}
            hasStarted={hasStarted}
            onSplineLoad={onSplineLoad}
          />

          {showContent && (
            <>
              <LiveStats liveStats={liveStats} />
              <section id="features">
                <Features />
              </section>
              <BlockchainIntegration />
              <section id="tokenomics">
                <TokenomicsSection />
              </section>
              <Footer />
            </>
          )}

          <style>
            {`
              @keyframes fade-in {
                from { 
                  opacity: 0;
                  transform: translateY(10px);
                }
                to { 
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              
              .bg-gradient-text {
                background: linear-gradient(to right, #ffffff 30%, #ffffff, #22e55c, #10b981, #059669, #047857);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-size: 400% 400%;
                animation: gradient 15s ease-in-out infinite;
              }

              .glass-panel {
                @apply bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl;
              }

              .glass-panel:hover {
                border-color: #22C55E;
                transform: scale(1.05) translateZ(20px);
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
        </div>
      </div>
    </main>
  );
}
