
import { Leaf, Volume } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NoiseProgressBar } from "./NoiseProgressBar";

interface NoiseAnalysisProps {
  noiseLevel: number;
  noisePeak: number;
  carbonOffset: number;
  trees: number;
}

export function NoiseAnalysisCard({ 
  noiseLevel, 
  noisePeak,
  carbonOffset,
  trees
}: NoiseAnalysisProps) {
  return (
    <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 card-enhanced">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Noise Analysis</h3>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">Average Noise Level</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{noiseLevel} dB</p>
            </div>
            <Volume className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          </div>
          
          <NoiseProgressBar 
            label="Highest Peak"
            value={noisePeak}
            max={100}
            color="bg-orange-500 dark:bg-orange-600"
          />
          
          <NoiseProgressBar 
            label="Average Level"
            value={noiseLevel}
            max={100}
            color="bg-purple-500 dark:bg-purple-400"
          />
          
          <div className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">Carbon Offset</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{carbonOffset} kg</p>
              </div>
              <Leaf className="h-6 w-6 text-green-500 dark:text-green-400" />
            </div>
          </div>
          
          <NoiseProgressBar 
            label="Equivalent Trees"
            value={trees}
            max={40}
            color="bg-green-500 dark:bg-green-400"
          />
          
          <NoiseProgressBar 
            label="Goal Progress"
            value={41}
            max={100}
            color="bg-green-500 dark:bg-green-400"
          />
        </div>
      </CardContent>
    </Card>
  );
}
