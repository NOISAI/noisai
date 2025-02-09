
import { Link2, Vote } from "lucide-react";

export const BlockchainIntegration = () => {
  return (
    <section className="w-full max-w-7xl mx-auto mt-32 px-4 mb-32">
      <h2 className="text-4xl font-bold text-center text-white mb-16">Blockchain Integration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Smart Contracts Card */}
        <div className="glass-panel p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-[#22C55E]/10 rounded-lg">
              <Link2 className="w-6 h-6 text-[#22C55E]" />
            </div>
            <h3 className="text-2xl font-semibold text-white mt-1">Smart Contracts</h3>
          </div>
          
          <p className="text-gray-300 mb-6">
            Automated energy trading and distribution through secure smart contracts. Earn tokens for contributing sound energy to the network.
          </p>
          
          <ul className="space-y-3">
            {[
              "Automated energy credit distribution",
              "Transparent pricing mechanism",
              "Instant settlements"
            ].map((feature, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Network Governance Card */}
        <div className="glass-panel p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-[#22C55E]/10 rounded-lg">
              <Vote className="w-6 h-6 text-[#22C55E]" />
            </div>
            <h3 className="text-2xl font-semibold text-white mt-1">Network Governance</h3>
          </div>
          
          <p className="text-gray-300 mb-6">
            Participate in network decisions through our DAO structure. Vote on protocol upgrades and energy distribution policies.
          </p>
          
          <ul className="space-y-3">
            {[
              "Decentralized governance",
              "Community-driven development",
              "Transparent voting system"
            ].map((feature, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
