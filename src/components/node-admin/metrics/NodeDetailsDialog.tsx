
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NodeEvent, NodeDetails, NodeEventHandlers } from "../types/NodeEvent";
import { Button } from "@/components/ui/button";
import { Server, Battery, Leaf, Coins, Volume2, Power } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NodeDetailsDialogProps {
  event: NodeEvent | null;
  isOpen: boolean;
  onClose: () => void;
  handlers?: NodeEventHandlers;
}

export default function NodeDetailsDialog({ 
  event, 
  isOpen, 
  onClose,
  handlers
}: NodeDetailsDialogProps) {
  const { toast } = useToast();
  
  if (!event) return null;
  
  const handleActivateNode = (nodeId: string) => {
    if (handlers?.updateNodeStatus) {
      handlers.updateNodeStatus(event.id, nodeId, 'active');
      toast({
        title: "Node status updated",
        description: "Node has been reactivated successfully.",
        // Changed from 'success' to 'default' since only 'default' and 'destructive' are supported
        variant: "default",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
            {event.name} - Nodes Detail
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-gray-800 rounded-md mr-3">
              <Server className="h-5 w-5 text-[#22C55E]" />
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-200">Location</h3>
              <p className="text-sm text-gray-400">{event.location}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 p-3 rounded-md">
              <p className="text-sm text-gray-400">Total Nodes</p>
              <p className="text-xl font-semibold text-white">{event.totalNodes}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-md">
              <p className="text-sm text-gray-400">Active Nodes</p>
              <p className="text-xl font-semibold text-[#22C55E]">{event.activeNodes}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-md">
              <p className="text-sm text-gray-400">Inactive Nodes</p>
              <p className="text-xl font-semibold text-red-500">{event.inactiveNodes}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-md">
              <p className="text-sm text-gray-400">Avg. Noise Level</p>
              <div className="flex items-center">
                <Volume2 className="h-4 w-4 mr-1 text-blue-400" />
                <p className="text-xl font-semibold text-blue-400">{event.avgNoiseLevel} dB</p>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">NODE</TableHead>
                  <TableHead className="text-gray-400">STATUS</TableHead>
                  <TableHead className="text-gray-400">NOISE LEVEL</TableHead>
                  <TableHead className="text-gray-400">TOKENS GENERATED</TableHead>
                  <TableHead className="text-gray-400">TOKENS CLAIMED</TableHead>
                  <TableHead className="text-gray-400">ENERGY (KWH)</TableHead>
                  <TableHead className="text-gray-400">CARBON OFFSET (KG)</TableHead>
                  <TableHead className="text-gray-400">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {event.nodes?.map((node: NodeDetails) => (
                  <TableRow key={node.id} className="border-gray-800">
                    <TableCell className="font-medium text-white">
                      <div className="flex items-center">
                        <Server className="h-3 w-3 mr-2 text-blue-400" />
                        {node.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={node.status === "active" 
                        ? "bg-green-900/30 text-green-400 hover:bg-green-900/40" 
                        : "bg-red-900/30 text-red-400 hover:bg-red-900/40"}>
                        {node.status === "active" ? "Active" : "Offline"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center">
                        <Volume2 className="h-3 w-3 mr-1 text-blue-400" />
                        {node.status === "active" ? `${node.noiseLevel} dB` : "-"}
                      </div>
                    </TableCell>
                    <TableCell className="text-yellow-300">
                      <div className="flex items-center">
                        <Coins className="h-3 w-3 mr-1" />
                        {node.tokensGenerated}
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-300">
                      {node.tokensClaimed}
                      <span className="text-gray-500 ml-1">
                        {node.tokensGenerated > 0
                          ? `(${Math.round(node.tokensClaimed / node.tokensGenerated * 100)}%)`
                          : "(0%)"}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center">
                        <Battery className="h-3 w-3 mr-1 text-[#22C55E]" />
                        {node.energyGenerated.toFixed(1)}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center">
                        <Leaf className="h-3 w-3 mr-1 text-[#22C55E]" />
                        {node.carbonOffset.toFixed(1)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {node.status === "inactive" && handlers?.updateNodeStatus && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-700 bg-green-900/20 text-green-400 hover:bg-green-900/40 hover:border-green-600"
                          onClick={() => handleActivateNode(node.id)}
                        >
                          <Power className="h-3 w-3 mr-1" />
                          Reactivate
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
