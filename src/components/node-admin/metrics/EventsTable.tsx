
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Server, Battery, Leaf, Coins } from "lucide-react";
import { NodeEvent, NodeEventHandlers } from "../types/NodeEvent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NodeDetailsDialog from "./NodeDetailsDialog";
import { useToast } from "@/hooks/use-toast";

interface EventsTableProps {
  events: NodeEvent[];
  selectedEvent: number | null;
  onSelectEvent: (eventId: number | null) => void;
}

export default function EventsTable({ events, selectedEvent, onSelectEvent }: EventsTableProps) {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedEventForDialog, setSelectedEventForDialog] = useState<NodeEvent | null>(null);
  const { toast } = useToast();

  const handleViewDetails = (event: NodeEvent) => {
    setSelectedEventForDialog(event);
    setDetailsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDetailsDialogOpen(false);
    setSelectedEventForDialog(null);
  };

  // Node status update handler
  const updateNodeStatus = (eventId: number, nodeId: string, newStatus: 'active' | 'inactive') => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId && event.nodes) {
        // Update the specific node's status
        const updatedNodes = event.nodes.map(node => {
          if (node.id === nodeId) {
            return { ...node, status: newStatus };
          }
          return node;
        });

        // Recalculate active and inactive node counts
        const activeNodes = updatedNodes.filter(node => node.status === 'active').length;
        const inactiveNodes = updatedNodes.length - activeNodes;

        // Return the updated event
        return {
          ...event,
          nodes: updatedNodes,
          activeNodes,
          inactiveNodes
        };
      }
      return event;
    });

    // This is where you would typically persist the changes to a database
    console.log("Node status updated:", { eventId, nodeId, newStatus });
    console.log("Updated events:", updatedEvents);

    // Since we can't modify the events array directly (it's passed as a prop),
    // we need to update the selectedEventForDialog to show the changes in the dialog
    if (selectedEventForDialog?.id === eventId) {
      const updatedEvent = updatedEvents.find(e => e.id === eventId) || null;
      setSelectedEventForDialog(updatedEvent);
    }

    toast({
      title: "Node status updated",
      description: `Node ${nodeId} has been ${newStatus === 'active' ? 'reactivated' : 'deactivated'}.`,
    });
  };

  const nodeEventHandlers: NodeEventHandlers = {
    updateNodeStatus
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Node Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">EVENT</TableHead>
                <TableHead className="text-gray-400">LOCATION</TableHead>
                <TableHead className="text-gray-400">NODE</TableHead>
                <TableHead className="text-gray-400">NODES (ACTIVE/TOTAL)</TableHead>
                <TableHead className="text-gray-400">TOKENS GENERATED</TableHead>
                <TableHead className="text-gray-400">TOKENS CLAIMED</TableHead>
                <TableHead className="text-gray-400">ENERGY (KWH)</TableHead>
                <TableHead className="text-gray-400">CARBON OFFSET (KG)</TableHead>
                <TableHead className="text-gray-400">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow
                  key={event.id}
                  className={`border-b border-gray-800 ${selectedEvent === event.id ? 'bg-gray-800' : ''} hover:bg-gray-800 cursor-pointer`}
                  onClick={() => onSelectEvent(selectedEvent === event.id ? null : event.id)}
                >
                  <TableCell className="font-medium text-white">
                    {event.name}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-[#22C55E]" />
                      {event.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center">
                      <Server className="h-3 w-3 mr-1 text-blue-400" />
                      {event.nodeName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>
                        <span className="text-[#22C55E]">{event.activeNodes}</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-300">{event.totalNodes}</span>
                      </div>
                      {event.inactiveNodes > 0 && (
                        <div className="mt-1 text-xs px-1.5 py-0.5 rounded-full bg-red-900/30 text-red-400 inline-block">
                          {event.inactiveNodes} offline
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-yellow-300">
                    <div className="flex items-center">
                      <Coins className="h-3 w-3 mr-1" />
                      {event.tokensGenerated}
                    </div>
                  </TableCell>
                  <TableCell className="text-blue-300">
                    <div>
                      {event.tokensClaimed}
                      <span className="text-gray-500 ml-1">
                        ({Math.round(event.tokensClaimed / event.tokensGenerated * 100)}%)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center">
                      <Battery className="h-3 w-3 mr-1 text-[#22C55E]" />
                      {event.energyGenerated.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center">
                      <Leaf className="h-3 w-3 mr-1 text-[#22C55E]" />
                      {event.carbonOffset.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:border-[#22C55E] hover:text-[#22C55E]"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering row click
                        handleViewDetails(event);
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      <NodeDetailsDialog 
        event={selectedEventForDialog} 
        isOpen={detailsDialogOpen} 
        onClose={handleCloseDialog}
        handlers={nodeEventHandlers}
      />
    </Card>
  );
}
