import { useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { LiveStats } from "@/components/sections/LiveStats";
import { Features } from "@/components/sections/Features";
import { BlockchainIntegration } from "@/components/features/BlockchainIntegration";
import { TokenomicsSection } from "@/components/sections/TokenomicsSection";
import { SplineAnimationController } from "@/components/animation/SplineAnimationController";
import { StatsController } from "@/components/stats/StatsController";
import { Footer } from "@/components/layout/Footer";

export default function Index() {
  const [showContent, setShowContent] = useState(false);
  const [showLogoText, setShowLogoText] = useState(false);
  const [showRotation, setShowRotation] = useState(false);
  const [spline, setSpline] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSplineLoad = (splineApp: any) => {
    setSpline(splineApp);
    setIsLoaded(true);
  };

  const handleAnimationComplete = () => {
    setShowContent(true);
    setTimeout(() => {
      setShowRotation(true);
      setTimeout(() => {
        setShowLogoText(true);
      }, 500);
    }, 5000);
  };

  return (
    <main className="relative w-screen min-h-screen bg-black">
      <div className="relative w-full min-h-screen opacity-0 animate-[fade-in_1.5s_ease-out_forwards] px-4 md:px-0">
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
          <SplineAnimationController
            onLoadComplete={handleSplineLoad}
            onAnimationComplete={handleAnimationComplete}
            showContent={showContent}
          />

          <HeroSection
            showContent={showContent}
            showRotation={showRotation}
            showLogoText={showLogoText}
            isLoaded={isLoaded}
            hasStarted={!!spline}
            onSplineLoad={() => {}}
          />

          {showContent && (
            <>
              <StatsController>
                {(liveStats) => (
                  <>
                    <LiveStats liveStats={liveStats} />
                    <section id="features">
                      <Features />
                    </section>
                    <BlockchainIntegration />
                    <section id="tokenomics">
                      <TokenomicsSection />
                    </section>
                    <Footer showContent={showContent} />
                  </>
                )}
              </StatsController>
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
