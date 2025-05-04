
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This component is no longer used but kept for reference
interface TimeRangeTabsProps {
  currentRange: string;
  onChange: (value: string) => void;
}

export default function TimeRangeTabs({ currentRange, onChange }: TimeRangeTabsProps) {
  return (
    <Tabs
      defaultValue="week"
      value={currentRange}
      onValueChange={(value) => onChange(value)}
      className="w-[200px]"
    >
      <TabsList className="grid grid-cols-3 bg-gray-800">
        <TabsTrigger value="day" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">Day</TabsTrigger>
        <TabsTrigger value="week" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">Week</TabsTrigger>
        <TabsTrigger value="month" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">Month</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
