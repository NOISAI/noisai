import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { Motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Github, Link, Zap, Activity, Battery, Coins, Users, Waves } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Index() {
  const [showContent, setShowContent] = useState(false);
  const [showLogoText, setShowLogoText] = useState(false);
  const [showRotation, setShowRotation] = useState(false);
  const [spline, setSpline] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const isMobile = useIsMobile();

  const onSplineLoad = (splineApp) => {
    console.log("Spline loaded");
    setSpline(splineApp);
    setIsLoaded(true);
  };

  const handleStart = () => {
    if (isLoaded && spline && !isAnimating && !hasStarted) {
      setHasStarted(true);
      try {
        console.log("Starting animation");
        spline.emitEvent('mouseDown');
        setIsAnimating(true);

        const timer = setTimeout(() => {
          console.log("25 seconds elapsed, showing content");
          setShowContent(true);
          setIsAnimating(false);
        }, 25000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error starting animation:", error);
        setShowContent(true);
        setIsAnimating(false);
      }
    }
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

      {showContent && (
        <div className="relative w-full min-h-screen opacity-0 animate-[fade-in_1.5s_ease-out_forwards] px-4 md:px-0">
          <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <div className="absolute top-8 left-8">
              <div className="flex items-center gap-2">
                <div className={`transition-transform duration-1000 ${
                  !showRotation ? '-rotate-90' : 'rotate-0'
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

            <div className={`w-full ${isMobile ? 'h-[340px] mt-16' : 'h-[400px] mt-8'}`}>
              <Spline
                scene="https://prod.spline.design/WPMa2X2U2NClGTaW/scene.splinecode"
                className="w-full h-full"
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

            <section className="w-full max-w-7xl mx-auto mt-20 px-4">
              <h2 className="text-4xl font-bold text-center text-white mb-12">Live Network Stats</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 transform transition-transform hover:scale-105 hover:translate-z-10 shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-[#22C55E]/10 rounded-lg">
                      <Zap className="w-6 h-6 text-[#22C55E]" />
                    </div>
                    <span className="text-[#22C55E] text-sm">+12.5% ↗</span>
                  </div>
                  <h3 className="text-gray-100 text-lg mb-2">Energy Generated</h3>
                  <p className="text-4xl font-bold text-[#22C55E] mb-2">2.51 MWh</p>
                  <p className="text-gray-300 text-sm">Total network energy production</p>
                </div>

                <div className="glass-panel p-6 transform transition-transform hover:scale-105 hover:translate-z-10 shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-[#22C55E]/10 rounded-lg">
                      <Activity className="w-6 h-6 text-[#22C55E]" />
                    </div>
                    <span className="text-[#22C55E] text-sm">+8.3% ↗</span>
                  </div>
                  <h3 className="text-gray-100 text-lg mb-2">Active Nodes</h3>
                  <p className="text-4xl font-bold text-[#22C55E] mb-2">1254</p>
                  <p className="text-gray-300 text-sm">Connected energy harvesting devices</p>
                </div>

                <div className="glass-panel p-6 transform transition-transform hover:scale-105 hover:translate-z-10 shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-[#22C55E]/10 rounded-lg">
                      <Battery className="w-6 h-6 text-[#22C55E]" />
                    </div>
                    <span className="text-[#22C55E] text-sm">+2.1% ↗</span>
                  </div>
                  <h3 className="text-gray-100 text-lg mb-2">Network Efficiency</h3>
                  <p className="text-4xl font-bold text-[#22C55E] mb-2">94.8%</p>
                  <p className="text-gray-300 text-sm">Sound to energy conversion rate</p>
                </div>

                <div className="glass-panel p-6 transform transition-transform hover:scale-105 hover:translate-z-10 shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-[#22C55E]/10 rounded-lg">
                      <Coins className="w-6 h-6 text-[#22C55E]" />
                    </div>
                    <span className="text-[#22C55E] text-sm">+15.4% ↗</span>
                  </div>
                  <h3 className="text-gray-100 text-lg mb-2">NOISAI Tokens</h3>
                  <p className="text-4xl font-bold text-[#22C55E] mb-2">157375</p>
                  <p className="text-gray-300 text-sm">Total tokens in circulation</p>
                </div>

                <div className="glass-panel p-6 transform transition-transform hover:scale-105 hover:translate-z-10 shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-[#22C55E]/10 rounded-lg">
                      <Users className="w-6 h-6 text-[#22C55E]" />
                    </div>
                    <span className="text-[#22C55E] text-sm">+5.7% ↗</span>
                  </div>
                  <h3 className="text-gray-100 text-lg mb-2">Active Users</h3>
                  <p className="text-4xl font-bold text-[#22C55E] mb-2">4532</p>
                  <p className="text-gray-300 text-sm">Current network participants</p>
                </div>

                <div className="glass-panel p-6 transform transition-transform hover:scale-105 hover:translate-z-10 shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-[#22C55E]/10 rounded-lg">
                      <Waves className="w-6 h-6 text-[#22C55E]" />
                    </div>
                    <span className="text-[#22C55E] text-sm">+10.2% ↗</span>
                  </div>
                  <h3 className="text-gray-100 text-lg mb-2">Daily Transactions</h3>
                  <p className="text-4xl font-bold text-[#22C55E] mb-2">12496</p>
                  <p className="text-gray-300 text-sm">Energy credit transfers per day</p>
                </div>
              </div>
            </section>
          </div>
        </div>
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
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: border-color 0.3s ease;
          }

          .glass-panel:hover {
            border-color: #22C55E;
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
