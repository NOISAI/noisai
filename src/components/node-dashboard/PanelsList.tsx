
import { useState } from "react";
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
  const [panelData, setPanelData] = useState<Panel[]>(panels);

  // Handle token claims
  const handleTokensClaimed = (panelId: number) => {
    setPanelData(prevPanels => 
      prevPanels.map(panel => 
        panel.id === panelId 
          ? { ...panel, availableTokens: 0 } 
          : panel
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Your Panels</h3>
        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
          {activePanels} Active
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {panelData.map(panel => (
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
            onTokensClaimed={handleTokensClaimed}
          />
        ))}
      </div>
    </div>
  );
}
