
import { NodeLocation, NodeMetric, PerformanceData } from "./types";

export const mockNodeLocations: NodeLocation[] = [
  { id: 1, name: "Node-NYC-001", location: "New York, USA", status: "active", lat: 40.7128, lng: -74.0060, lastActive: "2 minutes ago" },
  { id: 2, name: "Node-LON-002", location: "London, UK", status: "active", lat: 51.5074, lng: -0.1278, lastActive: "5 minutes ago" },
  { id: 3, name: "Node-TYO-003", location: "Tokyo, Japan", status: "active", lat: 35.6762, lng: 139.6503, lastActive: "1 minute ago" },
  { id: 4, name: "Node-SYD-004", location: "Sydney, Australia", status: "inactive", lat: -33.8688, lng: 151.2093, lastActive: "3 days ago" },
  { id: 5, name: "Node-PAR-005", location: "Paris, France", status: "active", lat: 48.8566, lng: 2.3522, lastActive: "10 minutes ago" },
  { id: 6, name: "Node-BER-006", location: "Berlin, Germany", status: "active", lat: 52.5200, lng: 13.4050, lastActive: "15 minutes ago" },
  { id: 7, name: "Node-SIN-007", location: "Singapore", status: "inactive", lat: 1.3521, lng: 103.8198, lastActive: "1 day ago" },
  { id: 8, name: "Node-MEX-008", location: "Mexico City, Mexico", status: "active", lat: 19.4326, lng: -99.1332, lastActive: "20 minutes ago" },
];

export const mockNodeMetrics: NodeMetric[] = [
  { name: 'Monday', count: 120, uptime: 98 },
  { name: 'Tuesday', count: 145, uptime: 99 },
  { name: 'Wednesday', count: 132, uptime: 97 },
  { name: 'Thursday', count: 178, uptime: 100 },
  { name: 'Friday', count: 156, uptime: 98 },
  { name: 'Saturday', count: 95, uptime: 96 },
  { name: 'Sunday', count: 87, uptime: 95 },
];

export const mockPerformanceData: PerformanceData[] = [
  { name: 'Morning', cpu: 45, memory: 32, network: 65 },
  { name: 'Noon', cpu: 78, memory: 56, network: 72 },
  { name: 'Evening', cpu: 65, memory: 48, network: 58 },
  { name: 'Night', cpu: 39, memory: 30, network: 42 },
];
