
import { Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PanelCardProps {
  id: number;
  name: string;
  status: string;
  uptime: string;
  lastSync: string;
  avgNoise: number;
  peakNoise: number;
  carbonOffset: number;
  availableTokens: number;
}

export function PanelCard({
  id,
  name,
  status,
  uptime,
  lastSync,
  avgNoise,
  peakNoise,
  carbonOffset,
  availableTokens
}: PanelCardProps) {
  return (
    <Card key={id} className="border border-gray-200 bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-gray-900">{name}</h4>
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
            status === 'active' ? 'bg-green-100 text-green-800' : 
            'bg-gray-100 text-gray-800'
          }`}>
            {status}
          </span>
        </div>
        
        <div className="text-sm text-gray-500 mb-4">
          <p>Uptime: {uptime}</p>
          <p>Last sync: {lastSync}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 18.5V9.5M12 9.5L7 14.5M12 9.5L17 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6V6.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Avg: {avgNoise} dB</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-red-600 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 18.5V9.5M12 9.5L7 14.5M12 9.5L17 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6V6.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Peak: {peakNoise} dB</span>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4 mb-4">
          <div className="flex items-center">
            <Leaf className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm">Carbon offset: {carbonOffset} kg</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Available tokens: {availableTokens}</span>
          <Button variant="secondary" size="sm" className="bg-blue-100 hover:bg-blue-200 text-blue-800">
            Claim
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
