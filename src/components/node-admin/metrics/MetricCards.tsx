
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NodeEvent } from "../types/NodeEvent";
import { formatTokenValue } from "@/utils/statsCalculations";

interface MetricCardsProps {
  nodeEvents: NodeEvent[];
  activeNodesCount: number;
}

export default function MetricCards({ nodeEvents, activeNodesCount }: MetricCardsProps) {
  // Calculate totals for the metrics
  const totalTokensGenerated = nodeEvents.reduce((sum, event) => sum + event.tokensGenerated, 0);
  const totalTokensClaimed = nodeEvents.reduce((sum, event) => sum + event.tokensClaimed, 0);
  const totalEnergyGenerated = nodeEvents.reduce((sum, event) => sum + event.energyGenerated, 0);
  const totalCarbonOffset = nodeEvents.reduce((sum, event) => sum + event.carbonOffset, 0);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Active Nodes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-[#22C55E]">{activeNodesCount}</div>
          <p className="text-gray-400 mt-2">Total active nodes in the network</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Tokens Generated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-[#22C55E]">{formatTokenValue(totalTokensGenerated)}</div>
          <p className="text-gray-400 mt-2">Claimed: {formatTokenValue(totalTokensClaimed)}</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Energy Generated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-[#22C55E]">{totalEnergyGenerated.toFixed(1)} kWh</div>
          <p className="text-gray-400 mt-2">Across all active nodes</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Carbon Offset</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-[#22C55E]">{totalCarbonOffset.toFixed(1)} kg</div>
          <p className="text-gray-400 mt-2">Environmental impact</p>
        </CardContent>
      </Card>
    </div>
  );
}
