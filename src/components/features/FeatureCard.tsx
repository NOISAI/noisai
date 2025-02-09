
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="glass-panel p-8 transform transition-all duration-300 hover:scale-105 hover:translate-z-10">
      <div className="p-4 bg-[#22C55E]/10 rounded-lg w-fit mb-6">
        {icon}
      </div>
      <h3 className="text-white text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};
