
export interface NodeEvent {
  id: number;
  name: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude] - explicitly defined as tuple
  totalNodes: number;
  activeNodes: number;
  inactiveNodes: number;
  avgNoiseLevel: number;
  nodeId: string; // Primary node ID
  nodeName: string; // Primary node name
  tokensGenerated: number;
  tokensClaimed: number;
  energyGenerated: number; // in kWh
  carbonOffset: number; // in kg
  nodes?: NodeDetails[]; // Array of all nodes in this event
}

export interface NodeDetails {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  noiseLevel: number;
  tokensGenerated: number;
  tokensClaimed: number;
  energyGenerated: number;
  carbonOffset: number;
}

export interface NodeEventHandlers {
  updateNodeStatus?: (eventId: number, nodeId: string, newStatus: 'active' | 'inactive') => void;
}
