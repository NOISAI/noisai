
import { NodeEvent } from "../types/NodeEvent";

// Mock data for node events with location information
export const nodeEvents: NodeEvent[] = [
  {
    id: 1,
    name: "City Coffee Amsterdam",
    location: "Amsterdam, Netherlands",
    coordinates: [4.9041, 52.3676], // [longitude, latitude] - explicit tuple
    totalNodes: 3,
    activeNodes: 3,
    inactiveNodes: 0,
    avgNoiseLevel: 78,
    userId: "user-123",
    userName: "Sarah Johnson",
    tokensGenerated: 1240,
    tokensClaimed: 980,
    energyGenerated: 15.6,
    carbonOffset: 7.8
  },
  {
    id: 2,
    name: "Tomorrowland Festival",
    location: "Boom, Belgium",
    coordinates: [4.3667, 51.0833],
    totalNodes: 8,
    activeNodes: 5,
    inactiveNodes: 3,
    avgNoiseLevel: 92,
    userId: "user-456",
    userName: "Michael Chen",
    tokensGenerated: 4280,
    tokensClaimed: 3100,
    energyGenerated: 48.2,
    carbonOffset: 22.5
  },
  {
    id: 3,
    name: "Downtown Mall Berlin",
    location: "Berlin, Germany",
    coordinates: [13.3833, 52.5167],
    totalNodes: 4,
    activeNodes: 2,
    inactiveNodes: 2,
    avgNoiseLevel: 81,
    userId: "user-789",
    userName: "Emma Schmidt",
    tokensGenerated: 1860,
    tokensClaimed: 1200,
    energyGenerated: 22.4,
    carbonOffset: 10.2
  },
  {
    id: 4,
    name: "Paris Music Center",
    location: "Paris, France",
    coordinates: [2.3522, 48.8566],
    totalNodes: 5,
    activeNodes: 4,
    inactiveNodes: 1,
    avgNoiseLevel: 85,
    userId: "user-101",
    userName: "Antoine Dupont",
    tokensGenerated: 2650,
    tokensClaimed: 1950,
    energyGenerated: 31.8,
    carbonOffset: 14.7
  }
];
