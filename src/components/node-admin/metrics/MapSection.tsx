
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NodeLocationMap from "../NodeLocationMap";
import { NodeEvent } from "../types/NodeEvent";
import { useIsMobile } from "@/hooks/use-mobile";

interface MapSectionProps {
  events: NodeEvent[];
  selectedEvent: number | null;
  onSelectEvent: (eventId: number | null) => void;
}

export default function MapSection({ events, selectedEvent, onSelectEvent }: MapSectionProps) {
  const isMobile = useIsMobile();
  
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Node Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${isMobile ? 'h-[300px]' : 'h-[400px]'} mb-6`}>
          <NodeLocationMap 
            events={events} 
            selectedEvent={selectedEvent} 
            onSelectEvent={onSelectEvent} 
          />
        </div>
      </CardContent>
    </Card>
  );
}
