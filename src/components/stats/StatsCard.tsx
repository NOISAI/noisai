
import { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  description: string;
  change: string;
}

export const StatsCard = ({ icon, title, value, description, change }: StatsCardProps) => {
  return (
    <div className="glass-panel p-6 transform transition-all duration-300 hover:scale-105 hover:translate-z-10 shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-[#22C55E]/10 rounded-lg">
          {icon}
        </div>
        <span className="text-[#22C55E] text-sm">{change}</span>
      </div>
      <h3 className="text-white text-lg mb-2">{title}</h3>
      <p className="text-4xl font-bold text-[#22C55E] mb-2">{value}</p>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

