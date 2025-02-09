
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/hero/HeroSection";
import { NetworkStats } from "@/components/stats/NetworkStats";
import { WhyChooseSection } from "@/components/features/WhyChooseSection";
import { BlockchainIntegration } from "@/components/features/BlockchainIntegration";
import { getRandomChange, calculateTokenChange, calculateUserNodeChange, calculateSupplyPercentage, formatTokenValue } from "@/utils/statsCalculations";
import "@/styles/animations.css";

export default function Index() {
  const [showContent, setShowContent] = useState(false);
  const [showLogoText, setShowLogoText] = useState(false);
  const [showRotation, setShowRotation] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const isMobile = useIsMobile();

  const [liveStats, setLiveStats] = useState({
    energyGenerated: 2.51,
    activeNodes: 1254,
    networkEfficiency: 94.8,
    tokens: 1000,
    activeUsers: 4532,
    dailyTransactions: 12496
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        energyGenerated: Math.max(0, +(prev.energyGenerated * (1 + getRandomChange())).toFixed(2)),
        activeNodes: Math.floor(calculateUserNodeChange(prev.activeNodes)),
        networkEfficiency: Math.min(100, Math.max(80, +(prev.networkEfficiency * (1 + getRandomChange() * 0.1)).toFixed(1))),
        tokens: Math.floor(calculateTokenChange(prev.tokens)),
        activeUsers: Math.floor(calculateUserNodeChange(prev.activeUsers)),
        dailyTransactions: Math.max(1000, Math.floor(prev.dailyTransactions * (1 + getRandomChange())))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    if (!isAnimating && !hasStarted) {
      setHasStarted(true);
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setShowContent(true);
        setIsAnimating(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    if (showContent) {
      setTimeout(() => {
        setShowRotation(true);
        setTimeout(() => {
          setShowLogoText(true);
        }, 500);
      }, 1000);
    }
  }, [showContent]);

  return (
    <main 
      className="relative w-screen min-h-screen bg-[#0B0F17]"
      onClick={handleStart}
    >
      {!showContent && (
        <div className="fixed inset-0">
          {isMobile && !hasStarted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-lg animate-pulse">Click anywhere to begin</p>
            </div>
          )}
        </div>
      )}

      {showContent && (
        <div className="relative w-full min-h-screen opacity-0 animate-[fade-in_1.5s_ease-out_forwards] px-4 md:px-0">
          <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <Header showRotation={showRotation} showLogoText={showLogoText} />
            <HeroSection />
            <NetworkStats 
              liveStats={liveStats}
              calculateSupplyPercentage={calculateSupplyPercentage}
              formatTokenValue={formatTokenValue}
            />
            <WhyChooseSection />
            <BlockchainIntegration />
          </div>
        </div>
      )}
    </main>
  );
}
