
import { useState } from "react";
import { useLiveStats } from "@/hooks/useLiveStats";
import MetricsHeader from "./metrics/MetricsHeader";
import MetricCards from "./metrics/MetricCards";
import MapSection from "./metrics/MapSection";
import EventsTable from "./metrics/EventsTable";
import PerformanceCharts from "./metrics/PerformanceCharts";
import { nodeEvents } from "./data/nodeEvents";

export default function MetricsDashboard() {
  const liveStats = useLiveStats();
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <MetricsHeader />
      
      <MetricCards 
        nodeEvents={nodeEvents} 
        activeNodesCount={liveStats.activeNodes} 
      />
      
      <div className="grid grid-cols-1 gap-6">
        <MapSection 
          events={nodeEvents} 
          selectedEvent={selectedEvent} 
          onSelectEvent={setSelectedEvent} 
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <EventsTable 
          events={nodeEvents} 
          selectedEvent={selectedEvent} 
          onSelectEvent={setSelectedEvent} 
        />
      </div>
      
      <PerformanceCharts />
    </div>
  );
}
