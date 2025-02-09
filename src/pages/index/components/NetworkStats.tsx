
import { useState, useEffect } from "react";
import { Zap, Activity, Battery, Coins, Users, ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface NetworkStatsProps {
  liveStats: {
    energyGenerated: number;
    activeNodes: number;
    networkEfficiency: number;
    tokens: number;
    activeUsers: number;
    dailyTransactions: number;
  };
  getRandomChange: () => number;
  calculateSupplyPercentage: (currentTokens: number) => string;
}

export const NetworkStats = ({ liveStats, getRandomChange, calculateSupplyPercentage }: NetworkStatsProps) => {
  return (
    <section className="w-full max-w-7xl mx-auto mt-20 px-4">
      <h2 className="text-4xl font-bold text-center text-white mb-12">Live Network Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 transform transition-all duration-300 hover:scale-105 hover:translate-z-10 shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#22C55E]/10 rounded-lg">
              <Zap className="w-6 h-6 text-[#22C55E]" />
            </div>
            <span className="text-[#22C55E] text-sm">{getRandomChange() > 0 ? '+' : ''}{(getRandomChange() * 20).toFixed(1)}% ↗</span>
          </div>
          <h3 className="text-white text-lg mb-2">Energy Generated</h3>
          <p className="text-4xl font-bold text-[#22C55E] mb-2">{liveStats.energyGenerated} MWh</p>
          <p className="text-gray-300 text-sm">Total network energy production</p>
        </div>

        <div className="glass-panel p-6 transform transition-all duration-300 hover:scale-105 hover:translate-z-10 shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#22C55E]/10 rounded-lg">
              <Activity className="w-6 h-6 text-[#22C55E]" />
            </div>
            <span className="text-[#22C55E] text-sm">{getRandomChange() > 0 ? '+' : ''}{(getRandomChange() * 20).toFixed(1)}% ↗</span>
          </div>
          <h3 className="text-white text-lg mb-2">Active Nodes</h3>
          <p className="text-4xl font-bold text-[#22C55E] mb-2">{liveStats.activeNodes}</p>
          <p className="text-gray-300 text-sm">Connected energy harvesting devices</p>
        </div>

        <div className="glass-panel p-6 transform transition-all duration-300 hover:scale-105 hover:translate-z-10 shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#22C55E]/10 rounded-lg">
              <Battery className="w-6 h-6 text-[#22C55E]" />
            </div>
            <span className="text-[#22C55E] text-sm">{getRandomChange() > 0 ? '+' : ''}{(getRandomChange() * 20).toFixed(1)}% ↗</span>
          </div>
          <h3 className="text-white text-lg mb-2">Network Efficiency</h3>
          <p className="text-4xl font-bold text-[#22C55E] mb-2">{liveStats.networkEfficiency}%</p>
          <p className="text-gray-300 text-sm">Sound to energy conversion rate</p>
        </div>

        <div className="glass-panel p-6 transform transition-all duration-300 hover:scale-105 hover:translate-z-10 shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#22C55E]/10 rounded-lg">
              <Coins className="w-6 h-6 text-[#22C55E]" />
            </div>
            <span className="text-[#22C55E] text-sm">{getRandomChange() > 0 ? '+' : ''}{(getRandomChange() * 20).toFixed(1)}% ↗</span>
          </div>
          <h3 className="text-white text-lg mb-2">NOISAI Tokens</h3>
          <div>
            <p className="text-4xl font-bold text-[#22C55E] mb-2">
              {liveStats.tokens >= 1000000 
                ? `${(liveStats.tokens / 1000000).toFixed(2)}M`
                : `${(liveStats.tokens / 1000).toFixed(1)}K`
              }
            </p>
            <p className="text-sm text-[#22C55E]/80 mb-2">
              {calculateSupplyPercentage(liveStats.tokens)}% of max supply
            </p>
          </div>
          <p className="text-gray-300 text-sm">Total tokens in circulation</p>
        </div>

        <div className="glass-panel p-6 transform transition-all duration-300 hover:scale-105 hover:translate-z-10 shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#22C55E]/10 rounded-lg">
              <Users className="w-6 h-6 text-[#22C55E]" />
            </div>
            <span className="text-[#22C55E] text-sm">{getRandomChange() > 0 ? '+' : ''}{(getRandomChange() * 20).toFixed(1)}% ↗</span>
          </div>
          <h3 className="text-white text-lg mb-2">Active Users</h3>
          <p className="text-4xl font-bold text-[#22C55E] mb-2">{liveStats.activeUsers}</p>
          <p className="text-gray-300 text-sm">Current network participants</p>
        </div>

        <div className="glass-panel p-6 transform transition-all duration-300 hover:scale-105 hover:translate-z-10 shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#22C55E]/10 rounded-lg">
              <div className="flex space-x-1">
                <ArrowDownLeft className="w-6 h-6 text-[#22C55E]" />
                <ArrowUpRight className="w-6 h-6 text-[#22C55E]" />
              </div>
            </div>
            <span className="text-[#22C55E] text-sm">{getRandomChange() > 0 ? '+' : ''}{(getRandomChange() * 20).toFixed(1)}% ↗</span>
          </div>
          <h3 className="text-white text-lg mb-2">Daily Transactions</h3>
          <p className="text-4xl font-bold text-[#22C55E] mb-2">{liveStats.dailyTransactions}</p>
          <p className="text-gray-300 text-sm">Energy credit transfers per day</p>
        </div>
      </div>
    </section>
  );
};
