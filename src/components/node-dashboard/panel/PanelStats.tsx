
interface PanelStatsProps {
  avgNoise: number;
  peakNoise: number;
  carbonOffset: number;
  availableTokens: number;
  onClaimClick: () => void;
}

import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PanelStats({ 
  avgNoise, 
  peakNoise, 
  carbonOffset, 
  availableTokens, 
  onClaimClick 
}: PanelStatsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <svg className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 18.5V9.5M12 9.5L7 14.5M12 9.5L17 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V6.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="dark:text-gray-300">Avg: {avgNoise} dB</span>
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 text-red-600 dark:text-red-400 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 18.5V9.5M12 9.5L7 14.5M12 9.5L17 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V6.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="dark:text-gray-300">Peak: {peakNoise} dB</span>
        </div>
      </div>
      
      <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-4">
        <div className="flex items-center">
          <Leaf className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
          <span className="text-sm dark:text-gray-300">Carbon offset: {carbonOffset} kg</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">Available tokens: {availableTokens}</span>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onClaimClick}
          disabled={availableTokens <= 0}
          className={`${
            availableTokens > 0 
              ? 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/40 dark:hover:bg-blue-800/60 text-blue-800 dark:text-blue-300' 
              : 'bg-gray-100 dark:bg-gray-700'
          }`}
        >
          Claim
        </Button>
      </div>
    </>
  );
}
