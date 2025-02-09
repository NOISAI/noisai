
import { useState, useEffect } from "react";

interface LiveStats {
  energyGenerated: number;
  activeNodes: number;
  networkEfficiency: number;
  tokens: number;
  activeUsers: number;
  dailyTransactions: number;
}

const getRandomChange = () => {
  return (Math.random() * 2 - 1) * 0.5;
};

const calculateTokenChange = (currentTokens: number) => {
  const baseGrowthRate = 0.005 + (Math.random() * 0.015);
  const growthMultiplier = currentTokens < 1000000 ? 2 : 1;
  const change = currentTokens * baseGrowthRate * growthMultiplier;
  return Math.min(210000000, currentTokens + change);
};

const calculateUserNodeChange = (current: number) => {
  const changePercentage = getRandomChange() * 0.1;
  const change = current * changePercentage;
  return Math.max(current * 0.8, current + change);
};

export const calculateSupplyPercentage = (currentTokens: number) => {
  const maxSupply = 210000000; // 210 million max supply
  return ((currentTokens / maxSupply) * 100).toFixed(4);
};

export const useLiveStats = () => {
  const [liveStats, setLiveStats] = useState<LiveStats>({
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

  return { liveStats, getRandomChange };
};

