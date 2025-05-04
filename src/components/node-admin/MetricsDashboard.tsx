
import { useState } from "react";
import { TimeRange, ViewMode } from "./metrics/types";
import ViewModeTabs from "./metrics/ViewModeTabs";
import TimeRangeTabs from "./metrics/TimeRangeTabs";
import MetricCards from "./metrics/MetricCards";
import NodeActivityChart from "./metrics/NodeActivityChart";
import PerformanceChart from "./metrics/PerformanceChart";
import NodeLocationMap from "./metrics/NodeLocationMap";
import NodesTable from "./metrics/NodesTable";
import { mockNodeLocations, mockNodeMetrics, mockPerformanceData } from "./metrics/mockData";

export default function MetricsDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("week");
  const [viewMode, setViewMode] = useState<ViewMode>("charts");
  
  const activeNodes = mockNodeLocations.filter(node => node.status === "active");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Performance Metrics</h2>
          <p className="text-gray-400">Monitor your node's performance and activity</p>
        </div>
        <div className="flex space-x-4">
          <ViewModeTabs currentMode={viewMode} onChange={setViewMode} />
          <TimeRangeTabs currentRange={timeRange} onChange={setTimeRange} />
        </div>
      </div>

      <MetricCards activeNodesCount={activeNodes.length} />

      {viewMode === "charts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NodeActivityChart data={mockNodeMetrics} />
          <PerformanceChart data={mockPerformanceData} />
        </div>
      )}

      {viewMode === "map" && (
        <NodeLocationMap nodes={mockNodeLocations} />
      )}

      {viewMode === "list" && (
        <NodesTable nodes={mockNodeLocations} />
      )}
    </div>
  );
}
