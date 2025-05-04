
import { Grid } from "lucide-react";
import { StatsCard } from "./StatsCard";

interface DashboardStatsType {
  totalPanels: number;
  activePanels: number;
  tokensGenerated: number;
  tokenValue: number;
  energyGenerated: number;
  energySavings: number;
  carbonOffset: number;
  trees: number;
  noiseLevel: number;
  noisePeak: number;
}

interface StatsOverviewProps {
  stats: DashboardStatsType;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <StatsCard
        title="Your Panels"
        value={stats.totalPanels}
        status="All Online"
        subtitle={`Active: ${stats.activePanels}`}
        icon={Grid}
      />
      
      <StatsCard
        title="Tokens Generated"
        value={stats.tokensGenerated.toLocaleString()}
        subtitle={`Value: $${stats.tokenValue}`}
        trend="22% this month"
      />
      
      <StatsCard
        title="Energy Generated"
        value={`${stats.energyGenerated} kWh`}
        subtitle={`Savings: $${stats.energySavings}`}
        trend="8% vs yesterday"
      />
      
      <StatsCard
        title="Carbon Offset"
        value={`${stats.carbonOffset} kg`}
        subtitle={`Trees: ${stats.trees}`}
        trend="12% vs yesterday"
      />
    </div>
  );
}
