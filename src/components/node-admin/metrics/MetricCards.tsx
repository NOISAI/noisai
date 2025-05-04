
import { useLiveStats } from "@/hooks/useLiveStats";
import MetricCard from "./MetricCard";

interface MetricCardsProps {
  activeNodesCount: number;
}

export default function MetricCards({ activeNodesCount }: MetricCardsProps) {
  const liveStats = useLiveStats();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard 
        title="Active Nodes" 
        value={activeNodesCount} 
        description="Total active nodes in the network" 
      />
      <MetricCard 
        title="Network Efficiency" 
        value={`${liveStats.networkEfficiency}%`} 
        description="Average efficiency across all nodes" 
      />
      <MetricCard 
        title="Daily Transactions" 
        value={liveStats.dailyTransactions.toLocaleString()} 
        description="Transactions processed today" 
      />
    </div>
  );
}
