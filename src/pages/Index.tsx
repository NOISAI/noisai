import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { Motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Github, Link, Zap, Activity, Battery, Coins, Users, ArrowLeftRight, Brain, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { StatCard } from "@/components/stats/StatCard";
import { FeatureCard } from "@/components/features/FeatureCard";
import { BlockchainIntegration } from "@/components/features/BlockchainIntegration";
import { Header } from "@/components/layout/Header";
import { getRandomChange, calculateTokenChange, calculateUserNodeChange, calculateSupplyPercentage, formatTokenValue } from "@/utils/statsCalculations";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Index() {
  const [showContent, setShowContent] = useState(false);
  const [showLogoText, setShowLogoText] = useState(false);
  const [showRotation, setShowRotation] = useState(false);
  const [spline, setSpline] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showTokenomics, setShowTokenomics] = useState(true);
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
          {isMobile && !hasStarted && isLoaded && (
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
                <StatCard
                  icon={Zap}
                  title="Energy Generated"
                  value={`${liveStats.energyGenerated} MWh`}
                  description="Total network energy production"
                  change={`${getRandomChange() > 0 ? '+' : ''}${(getRandomChange() * 20).toFixed(1)}% ↗`}
                />
                <StatCard
                  icon={Activity}
                  title="Active Nodes"
                  value={liveStats.activeNodes}
                  description="Connected energy harvesting devices"
                  change={`${getRandomChange() > 0 ? '+' : ''}${(getRandomChange() * 20).toFixed(1)}% ↗`}
                />
                <StatCard
                  icon={Battery}
                  title="Network Efficiency"
                  value={`${liveStats.networkEfficiency}%`}
                  description="Sound to energy conversion rate"
                  change={`${getRandomChange() > 0 ? '+' : ''}${(getRandomChange() * 20).toFixed(1)}% ↗`}
                />
                <StatCard
                  icon={Coins}
                  title="NOISAI Tokens"
                  value={formatTokenValue(liveStats.tokens)}
                  description={`${calculateSupplyPercentage(liveStats.tokens)}% of total supply`}
                  change={`${getRandomChange() > 0 ? '+' : ''}${(getRandomChange() * 20).toFixed(1)}% ↗`}
                />
                <StatCard
                  icon={Users}
                  title="Active Users"
                  value={liveStats.activeUsers}
                  description="Current network participants"
                  change={`${getRandomChange() > 0 ? '+' : ''}${(getRandomChange() * 20).toFixed(1)}% ↗`}
                />
                <StatCard
                  icon={ArrowLeftRight}
                  title="Daily Transactions"
                  value={liveStats.dailyTransactions}
                  description="Energy credit transfers per day"
                  change={`${getRandomChange() > 0 ? '+' : ''}${(getRandomChange() * 20).toFixed(1)}% ↗`}
                />
              </div>
            </section>

            <section className="w-full max-w-7xl mx-auto mt-32 px-4">
              <h2 className="text-4xl font-bold text-center text-white mb-16">Why Choose NOISAI?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<img 
                    src="/lovable-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
                    alt="NOISAI Logo" 
                    className="w-8 h-8"
                  />}
                  title="Sound Energy Harvesting"
                  description="Innovative technology that captures and converts ambient sound waves into usable electrical energy"
                />
                <FeatureCard
                  icon={<Brain className="w-8 h-8 text-[#22C55E]" />}
                  title="AI-Powered Optimization"
                  description="Advanced AI algorithms maximize energy conversion efficiency and system performance"
                />
                <FeatureCard
                  icon={<Coins className="w-8 h-8 text-[#22C55E]" />}
                  title="Tokenized Energy Credits"
                  description="Earn and trade energy credits on our blockchain network, creating a decentralized energy marketplace"
                />
              </div>
            </section>

            <BlockchainIntegration />

            <section className="w-full max-w-7xl mx-auto mt-32 px-4">
              <div className="h-[600px] w-full">
                <Spline 
                  scene="https://prod.spline.design/Wfx6S6vnF-LjKSSy/scene.splinecode"
                />
              </div>
            </section>

            <section className="w-full max-w-4xl mx-auto mt-20 px-4">
              <h2 className="text-3xl font-bold text-center text-white mb-8">Tokenomics</h2>
              
              <Collapsible className="w-full">
                <CollapsibleTrigger className="w-full">
                  <div className="w-full bg-[#1A1F2C] rounded-lg hover:bg-[#1A1F2C]/80 transition-colors">
                    <div className="flex items-center justify-between p-4">
                      <h3 className="text-lg font-semibold text-white">NOIS Token Distribution</h3>
                      <ChevronDown className="w-5 h-5 text-white transition-transform duration-200" />
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-2">
                  <div className="bg-[#1A1F2C] rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-white">Initial Distribution</TableHead>
                            <TableHead className="text-right text-white">Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-gray-300">Community Rewards</TableCell>
                            <TableCell className="text-right text-[#22C55E]">40%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-gray-300">Development Fund</TableCell>
                            <TableCell className="text-right text-[#22C55E]">25%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-gray-300">Team & Advisors</TableCell>
                            <TableCell className="text-right text-[#22C55E]">15%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-gray-300">Ecosystem Growth</TableCell>
                            <TableCell className="text-right text-[#22C55E]">20%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-white">Token Utility</TableHead>
                            <TableHead className="text-right"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-gray-300">Governance voting rights</TableCell>
                            <TableCell className="text-right">•</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-gray-300">Energy credit trading</TableCell>
                            <TableCell className="text-right">•</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-gray-300">Network fee payments</TableCell>
                            <TableCell className="text-right">•</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-gray-300">Staking rewards</TableCell>
                            <TableCell className="text-right">•</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-gray-300">Protocol participation</TableCell>
                            <TableCell className="text-right">•</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </section>

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
      )}
    </main>
  );
}
