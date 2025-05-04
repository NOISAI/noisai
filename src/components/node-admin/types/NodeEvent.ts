
export interface NodeEvent {
  id: number;
  name: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude] - explicitly defined as tuple
  totalNodes: number;
  activeNodes: number;
  inactiveNodes: number;
  avgNoiseLevel: number;
  nodeId: string; // Changed from userId to nodeId
  nodeName: string; // Changed from userName to nodeName
  tokensGenerated: number;
  tokensClaimed: number;
  energyGenerated: number; // in kWh
  carbonOffset: number; // in kg
}
