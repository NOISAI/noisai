
import { Card, CardContent } from "@/components/ui/card";
import { PanelCard } from "./PanelCard";

interface Panel {
  id: number;
  name: string;
  status: string;
  uptime: string;
  lastSync: string;
  avgNoise: number;
  peakNoise: number;
  carbonOffset: number;
  availableTokens: number;
}

interface PanelsListProps {
  panels: Panel[];
  activePanels: number;
}

export function PanelsList({ panels, activePanels }: PanelsListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-gray-800">Your Panels</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
          {activePanels} Active
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {panels.map(panel => (
          <PanelCard
            key={panel.id}
            id={panel.id}
            name={panel.name}
            status={panel.status}
            uptime={panel.uptime}
            lastSync={panel.lastSync}
            avgNoise={panel.avgNoise}
            peakNoise={panel.peakNoise}
            carbonOffset={panel.carbonOffset}
            availableTokens={panel.availableTokens}
          />
        ))}
      </div>
    </div>
  );
}
