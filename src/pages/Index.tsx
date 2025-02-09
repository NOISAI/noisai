
import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "./index/components/Logo";
import { Hero } from "./index/components/Hero";
import { NetworkStats } from "./index/components/NetworkStats";
import { Features } from "./index/components/Features";
import { 
  getRandomChange, 
  calculateTokenChange, 
  calculateUserNodeChange, 
  calculateSupplyPercentage 
} from "./index/utils/statsUtils";

export default function Index() {
  const [showContent, setShowContent] = useState(false);
  const [showLogoText, setShowLogoText] = useState(false);
  const [showRotation, setShowRotation] = useState(false);
  const [spline, setSpline] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
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

  const onSplineLoad = (splineApp) => {
    console.log("Spline loaded");
    setSpline(splineApp);
    setIsLoaded(true);
    
    if (isMobile) {
      setTimeout(() => {
        handleStart();
      }, 1000);
    }
  };

  const handleStart = () => {
    if (isLoaded && spline && !isAnimating && !hasStarted) {
      setHasStarted(true);
      try {
        console.log("Starting animation");
        spline.emitEvent('mouseDown');
        setIsAnimating(true);
        
        setTimeout(() => {
          console.log("Animation complete, showing content");
          setShowContent(true);
          setIsAnimating(false);
        }, 25000);
      } catch (error) {
        console.error("Error starting animation:", error);
        setShowContent(true);
        setIsAnimating(false);
      }
    }
  };

  useEffect(() => {
    if (showContent) {
      const initialDelay = isMobile ? 2000 : 5000;
      
      setTimeout(() => {
        setShowRotation(true);
        setTimeout(() => {
          setShowLogoText(true);
        }, 500);
      }, initialDelay);
    }
  }, [showContent, isMobile]);

  return (
    <main 
      className="relative w-screen min-h-screen bg-[#0B0F17]"
      onClick={handleStart}
    >
      {!showContent && (
        <div className="fixed inset-0">
          <Spline
            scene="https://prod.spline.design/rGP8VoiJZXNCrcRD/scene.splinecode"
            className="w-full h-full"
            onLoad={onSplineLoad}
          />
        </div>
      )}

      <div 
        className={`relative w-full min-h-screen ${
          showContent ? 'opacity-0 animate-[fade-in_1.5s_ease-out_forwards]' : 'opacity-0'
        } px-4 md:px-0`}
      >
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
          <Logo showRotation={showRotation} showLogoText={showLogoText} />
          <Hero />
          <NetworkStats 
            liveStats={liveStats}
            getRandomChange={getRandomChange}
            calculateSupplyPercentage={calculateSupplyPercentage}
          />
          <Features />
        </div>
      </div>

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
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            transform-style: preserve-3d;
            perspective: 1000px;
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
    </main>
  );
}
