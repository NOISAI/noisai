
import { Brain, Coins } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="glass-panel p-8 transform transition-all duration-300 hover:scale-105 hover:translate-z-10">
    <div className="p-4 bg-[#22C55E]/10 rounded-lg w-fit mb-6">
      {icon}
    </div>
    <h3 className="text-white text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export const WhyChooseSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto mt-32 px-4 mb-32">
      <h2 className="text-4xl font-bold text-center text-white mb-16">Why Choose NOISAI?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={
            <img 
              src="/lovable-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
              alt="NOISAI Logo" 
              className="w-8 h-8"
            />
          }
          title="Sound Energy Harvesting"
          description="Innovative technology that captures and converts ambient sound waves into usable electrical energy"
        />

        <FeatureCard
          icon={<Brain className="w-8 h-8 text-[#22C55E]" />}
          title="AI-Powered Optimization"
          description="Advanced AI algorithms maximize energy conversion efficiency and system performance"
        />

        <FeatureCard
          icon={<Coins className="w-8 h-8 text-[#22C55E]" />}
          title="Tokenized Energy Credits"
          description="Earn and trade energy credits on our blockchain network, creating a decentralized energy marketplace"
        />
      </div>
    </section>
  );
};

