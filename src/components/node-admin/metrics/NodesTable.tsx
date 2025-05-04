
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, WifiHigh, WifiOff } from "lucide-react";
import { NodeLocation } from "./types";

interface NodesTableProps {
  nodes: NodeLocation[];
}

export default function NodesTable({ nodes }: NodesTableProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Nodes List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-gray-800">
            <TableRow>
              <TableHead className="text-gray-300">Name</TableHead>
              <TableHead className="text-gray-300">Location</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Last Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nodes.map((node) => (
              <TableRow key={node.id} className="border-b border-gray-700">
                <TableCell className="font-medium text-white">{node.name}</TableCell>
                <TableCell className="text-gray-300">
                  <div className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 text-gray-400 mr-1" />
                    {node.location}
                  </div>
                </TableCell>
                <TableCell>
                  {node.status === "active" ? (
                    <div className="flex items-center">
                      <WifiHigh className="h-4 w-4 text-[#22C55E] mr-1" />
                      <span className="text-[#22C55E]">Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <WifiOff className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-gray-400">Inactive</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-gray-300">{node.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
