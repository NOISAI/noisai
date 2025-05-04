
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewMode } from "./types";

interface ViewModeTabsProps {
  currentMode: ViewMode;
  onChange: (value: ViewMode) => void;
}

export default function ViewModeTabs({ currentMode, onChange }: ViewModeTabsProps) {
  return (
    <Tabs
      defaultValue="charts"
      value={currentMode}
      onValueChange={(value) => onChange(value as ViewMode)}
      className="w-[300px]"
    >
      <TabsList className="grid grid-cols-3 bg-gray-800">
        <TabsTrigger value="charts" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">Charts</TabsTrigger>
        <TabsTrigger value="map" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">Map</TabsTrigger>
        <TabsTrigger value="list" className="text-white data-[state=active]:bg-[#22C55E] data-[state=active]:text-black">List</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
