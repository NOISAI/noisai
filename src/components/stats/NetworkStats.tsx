
import { Zap, Activity, Battery, Coins, Users, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { useLiveStats, calculateSupplyPercentage } from "./useLiveStats";

export const NetworkStats = () => {
  const { liveStats, getRandomChange } = useLiveStats();

  return (
    <section className="w-full max-w-7xl mx-auto mt-20 px-4">
      <h2 className="text-4xl font-bold text-center text-white mb-12">Live Network Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon={<Zap className="w-6 h-6 text-[#22C55E]" />}
          title="Energy Generated"
          value={`${liveStats.energyGenerated} MWh`}
          description="Total network energy production"
          change={`${getRandomChange() > 0 ? '+' : ''}${(getRandomChange() * 20).toFixed(1)}% ↗`}
        />

        <StatsCard
          icon={<Activity className="w-6 h-6 text-[#22C55E]" />}
          title="Active Nodes"
          value={liveStats.activeNodes}
          description="Connected energy harvesting devices"
          change={`${getRandomChange() > 0 ? '+' : ''}${(getRandomChange() * 20).toFixed(1)}% ↗`}
        />

        <StatsCard
          icon={<Battery className="w-6 h-6 text-[#22C55E]" />}
          title="Network Efficiency"
          value={`${liveStats.networkEfficiency}%`}
          description="Sound to energy conversion rate"
          change={`${getRandomChange() > 0 ? '+' : ''}${(getRandomChange() * 20).toFixed(1)}% ↗`}
        />

        <StatsCard
          icon={<Coins className="w-6 h-6 text-[#22C55E]" />}
          title="NOISAI Tokens"
          value={liveStats.tokens >= 1000000 
            ? `${(liveStats.tokens / 1000000).toFixed(2)}M`
            : `${(liveStats.tokens / 1000).toFixed(1)}K`}
          description="Total tokens in circulation"
          change={`${getRandomChange() > 0 ? '+' : ''}${(getRandomChange() * 20).toFixed(1)}% ↗`}
        />

        <StatsCard
          icon={<Users className="w-6 h-6 text-[#22C55E]" />}
          title="Active Users"
          value={liveStats.activeUsers}
          description="Current network participants"
          change={`${getRandomChange() > 0 ? '+' : ''}${(getRandomChange() * 20).toFixed(1)}% ↗`}
        />

        <StatsCard
          icon={
            <div className="flex space-x-1">
              <ArrowDownLeft className="w-6 h-6 text-[#22C55E]" />
              <ArrowUpRight className="w-6 h-6 text-[#22C55E]" />
            </div>
          }
          title="Daily Transactions"
          value={liveStats.dailyTransactions}
          description="Energy credit transfers per day"
          change={`${getRandomChange() > 0 ? '+' : ''}${(getRandomChange() * 20).toFixed(1)}% ↗`}
        />
      </div>
    </section>
  );
};

