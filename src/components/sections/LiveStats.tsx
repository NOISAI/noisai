
import { Zap, Activity, Battery, Coins, Users, ArrowLeftRight, Network } from "lucide-react";
import { StatCard } from "@/components/stats/StatCard";
import { getRandomChange, calculateTokenChange, calculateUserNodeChange, calculateSupplyPercentage, formatTokenValue } from "@/utils/statsCalculations";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LiveStatsProps {
  liveStats: {
    energyGenerated: number;
    activeNodes: number;
    networkEfficiency: number;
    tokens: number;
    activeUsers: number;
    dailyTransactions: number;
  };
}

export const LiveStats = ({ liveStats }: LiveStatsProps) => {
  return (
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
      
      {/* Become a Node Section */}
      <div className="mt-16 py-8 bg-black/30 rounded-xl border border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center px-6">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-white mb-2">Join Our Network Nodes</h3>
            <p className="text-gray-300 max-w-lg">Power our decentralized energy ecosystem by becoming a node in the NOISAI network and earn rewards.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center px-4 py-3 bg-gray-800 rounded-lg">
              <Network className="text-green-500 mr-2 w-5 h-5" />
              <div>
                <div className="text-sm text-gray-400">Active Nodes</div>
                <div className="font-bold text-green-500">{liveStats.activeNodes}+</div>
              </div>
            </div>
            <Link to="/sign-up">
              <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white font-medium">
                Become a Node
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
