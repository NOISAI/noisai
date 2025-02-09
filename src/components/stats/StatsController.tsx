
import { ReactNode, useEffect, useState } from 'react';

interface StatsControllerProps {
  children: (stats: {
    energyGenerated: number;
    activeNodes: number;
    networkEfficiency: number;
    tokens: number;
    activeUsers: number;
    dailyTransactions: number;
  }) => ReactNode;
}

export const StatsController = ({ children }: StatsControllerProps) => {
  const [stats, setStats] = useState({
    energyGenerated: 15482,
    activeNodes: 3254,
    networkEfficiency: 94,
    tokens: 1000000,
    activeUsers: 12543,
    dailyTransactions: 45231
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prevStats => ({
        energyGenerated: prevStats.energyGenerated + Math.random() * 10,
        activeNodes: prevStats.activeNodes + Math.floor(Math.random() * 3),
        networkEfficiency: Math.min(100, prevStats.networkEfficiency + Math.random() * 0.1),
        tokens: prevStats.tokens + Math.random() * 100,
        activeUsers: prevStats.activeUsers + Math.floor(Math.random() * 5),
        dailyTransactions: prevStats.dailyTransactions + Math.floor(Math.random() * 10)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <>{children(stats)}</>;
};
