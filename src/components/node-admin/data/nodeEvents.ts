
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
    nodeId: "node-123",
    nodeName: "Node N1",
    tokensGenerated: 1240,
    tokensClaimed: 980,
    energyGenerated: 15.6,
    carbonOffset: 7.8,
    nodes: [
      {
        id: "node-123",
        name: "Node N1",
        status: "active",
        noiseLevel: 76,
        tokensGenerated: 450,
        tokensClaimed: 380,
        energyGenerated: 5.2,
        carbonOffset: 2.6
      },
      {
        id: "node-124",
        name: "Node N2",
        status: "active",
        noiseLevel: 80,
        tokensGenerated: 520,
        tokensClaimed: 410,
        energyGenerated: 6.1,
        carbonOffset: 3.0
      },
      {
        id: "node-125",
        name: "Node N3",
        status: "active",
        noiseLevel: 78,
        tokensGenerated: 270,
        tokensClaimed: 190,
        energyGenerated: 4.3,
        carbonOffset: 2.2
      }
    ]
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
    nodeId: "node-456",
    nodeName: "Node N4",
    tokensGenerated: 4280,
    tokensClaimed: 3100,
    energyGenerated: 48.2,
    carbonOffset: 22.5,
    nodes: [
      {
        id: "node-456",
        name: "Node N4",
        status: "active",
        noiseLevel: 94,
        tokensGenerated: 780,
        tokensClaimed: 650,
        energyGenerated: 8.9,
        carbonOffset: 4.2
      },
      {
        id: "node-457",
        name: "Node N5",
        status: "active",
        noiseLevel: 96,
        tokensGenerated: 810,
        tokensClaimed: 720,
        energyGenerated: 9.1,
        carbonOffset: 4.3
      },
      {
        id: "node-458",
        name: "Node N6",
        status: "active",
        noiseLevel: 93,
        tokensGenerated: 760,
        tokensClaimed: 580,
        energyGenerated: 8.7,
        carbonOffset: 4.1
      },
      {
        id: "node-459",
        name: "Node N7",
        status: "active",
        noiseLevel: 90,
        tokensGenerated: 730,
        tokensClaimed: 620,
        energyGenerated: 8.3,
        carbonOffset: 3.9
      },
      {
        id: "node-460",
        name: "Node N8",
        status: "active",
        noiseLevel: 88,
        tokensGenerated: 620,
        tokensClaimed: 530,
        energyGenerated: 7.2,
        carbonOffset: 3.4
      },
      {
        id: "node-461",
        name: "Node N9",
        status: "inactive",
        noiseLevel: 0,
        tokensGenerated: 190,
        tokensClaimed: 0,
        energyGenerated: 2.0,
        carbonOffset: 0.9
      },
      {
        id: "node-462",
        name: "Node N10",
        status: "inactive",
        noiseLevel: 0,
        tokensGenerated: 210,
        tokensClaimed: 0,
        energyGenerated: 2.2,
        carbonOffset: 1.0
      },
      {
        id: "node-463",
        name: "Node N11",
        status: "inactive",
        noiseLevel: 0,
        tokensGenerated: 180,
        tokensClaimed: 0,
        energyGenerated: 1.8,
        carbonOffset: 0.7
      }
    ]
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
    nodeId: "node-789",
    nodeName: "Node N12",
    tokensGenerated: 1860,
    tokensClaimed: 1200,
    energyGenerated: 22.4,
    carbonOffset: 10.2,
    nodes: [
      {
        id: "node-789",
        name: "Node N12",
        status: "active",
        noiseLevel: 82,
        tokensGenerated: 580,
        tokensClaimed: 420,
        energyGenerated: 6.8,
        carbonOffset: 3.1
      },
      {
        id: "node-790",
        name: "Node N13",
        status: "active",
        noiseLevel: 80,
        tokensGenerated: 540,
        tokensClaimed: 390,
        energyGenerated: 6.2,
        carbonOffset: 2.9
      },
      {
        id: "node-791",
        name: "Node N14",
        status: "inactive",
        noiseLevel: 0,
        tokensGenerated: 380,
        tokensClaimed: 210,
        energyGenerated: 4.7,
        carbonOffset: 2.1
      },
      {
        id: "node-792",
        name: "Node N15",
        status: "inactive",
        noiseLevel: 0,
        tokensGenerated: 360,
        tokensClaimed: 180,
        energyGenerated: 4.7,
        carbonOffset: 2.1
      }
    ]
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
    nodeId: "node-101",
    nodeName: "Node N16",
    tokensGenerated: 2650,
    tokensClaimed: 1950,
    energyGenerated: 31.8,
    carbonOffset: 14.7,
    nodes: [
      {
        id: "node-101",
        name: "Node N16",
        status: "active",
        noiseLevel: 84,
        tokensGenerated: 620,
        tokensClaimed: 480,
        energyGenerated: 7.4,
        carbonOffset: 3.4
      },
      {
        id: "node-102",
        name: "Node N17",
        status: "active",
        noiseLevel: 86,
        tokensGenerated: 580,
        tokensClaimed: 440,
        energyGenerated: 6.9,
        carbonOffset: 3.2
      },
      {
        id: "node-103",
        name: "Node N18",
        status: "active",
        noiseLevel: 87,
        tokensGenerated: 610,
        tokensClaimed: 460,
        energyGenerated: 7.2,
        carbonOffset: 3.3
      },
      {
        id: "node-104",
        name: "Node N19",
        status: "active",
        noiseLevel: 83,
        tokensGenerated: 550,
        tokensClaimed: 410,
        energyGenerated: 6.5,
        carbonOffset: 3.0
      },
      {
        id: "node-105",
        name: "Node N20",
        status: "inactive",
        noiseLevel: 0,
        tokensGenerated: 290,
        tokensClaimed: 160,
        energyGenerated: 3.8,
        carbonOffset: 1.8
      }
    ]
  }
];
