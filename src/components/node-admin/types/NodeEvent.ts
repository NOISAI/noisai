
export interface NodeEvent {
  id: number;
  name: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude] - explicitly defined as tuple
  totalNodes: number;
  activeNodes: number;
  inactiveNodes: number;
  avgNoiseLevel: number;
  userId: string;
  userName: string;
  tokensGenerated: number;
  tokensClaimed: number;
  energyGenerated: number; // in kWh
  carbonOffset: number; // in kg
}
