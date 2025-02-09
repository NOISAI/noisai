
import { useState, useEffect } from "react";
import { getRandomChange, calculateTokenChange, calculateUserNodeChange } from "@/utils/statsCalculations";

export interface LiveStatsData {
  energyGenerated: number;
  activeNodes: number;
  networkEfficiency: number;
  tokens: number;
  activeUsers: number;
  dailyTransactions: number;
}

export const useStatsController = () => {
  const [liveStats, setLiveStats] = useState<LiveStatsData>({
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

  return liveStats;
};
