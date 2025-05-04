
// Types for the metrics dashboard
export type ViewMode = "charts" | "map" | "list";

export interface NodeLocation {
  id: number;
  name: string;
  location: string;
  status: "active" | "inactive";
  lat: number;
  lng: number;
  lastActive: string;
}

export interface NodeMetric {
  name: string;
  count: number;
  uptime: number;
}

export interface PerformanceData {
  name: string;
  cpu: number;
  memory: number;
  network: number;
}
