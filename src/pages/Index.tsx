
import { HeroSection } from "@/components/sections/HeroSection";
import { LiveStats } from "@/components/sections/LiveStats";
import { Features } from "@/components/sections/Features";
import { BlockchainIntegration } from "@/components/features/BlockchainIntegration";
import { TokenomicsSection } from "@/components/sections/TokenomicsSection";
import { Footer } from "@/components/layout/Footer";
import { GlobalStyles } from "@/components/styles/GlobalStyles";
import { useAnimationState } from "@/hooks/useAnimationState";
import { useLiveStats } from "@/hooks/useLiveStats";

export default function Index() {
  const {
    showContent,
    showLogoText,
    showRotation,
    isLoaded,
    hasStarted,
    handleStart,
    onSplineLoad
  } = useAnimationState();

  const liveStats = useLiveStats();

  return (
    <main 
      className="relative w-screen min-h-screen bg-black"
      onClick={handleStart}
    >
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

          <GlobalStyles />
        </div>
      </div>
    </main>
  );
}
