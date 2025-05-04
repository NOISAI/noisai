
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeRange } from "./types";

interface TimeRangeTabsProps {
  currentRange: TimeRange;
  onChange: (value: TimeRange) => void;
}

export default function TimeRangeTabs({ currentRange, onChange }: TimeRangeTabsProps) {
  return (
    <Tabs
      defaultValue="week"
      value={currentRange}
      onValueChange={(value) => onChange(value as TimeRange)}
      className="w-[300px]"
    >
      <TabsList className="grid grid-cols-3 bg-gray-800">
        <TabsTrigger value="day" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">Day</TabsTrigger>
        <TabsTrigger value="week" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">Week</TabsTrigger>
        <TabsTrigger value="month" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">Month</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
