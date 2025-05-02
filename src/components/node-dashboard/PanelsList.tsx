
import { useState } from "react";
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
  // Using local state to track panels with token claims
  const [panelData, setPanelData] = useState<Panel[]>(panels);

  // We'll update this when necessary to handle claimed tokens
  // For now, the individual PanelCard components will handle their own state

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Your Panels</h3>
        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
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
