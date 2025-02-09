
import { Zap, Activity, Battery, Coins, Users, ArrowLeftRight } from "lucide-react";
import { StatCard } from "@/components/stats/StatCard";
import { getRandomChange, calculateTokenChange, calculateUserNodeChange, calculateSupplyPercentage, formatTokenValue } from "@/utils/statsCalculations";

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
    </section>
  );
};
