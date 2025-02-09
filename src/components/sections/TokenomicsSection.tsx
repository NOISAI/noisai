
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { InitialDistributionTable } from "@/components/tokenomics/InitialDistributionTable";
import { TokenUtilityTable } from "@/components/tokenomics/TokenUtilityTable";

export const TokenomicsSection = () => {
  return (
    <section className="w-full max-w-4xl mx-auto mt-20 px-4">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Tokenomics</h2>
      
      <Collapsible>
        <CollapsibleTrigger className="w-full">
          <div className="w-full bg-[#1A1F2C] rounded-lg hover:bg-[#1A1F2C]/80 transition-colors">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold text-white">NOIS Token Distribution</h3>
              <ChevronDown 
                className="w-5 h-5 text-white transition-transform duration-300 group-data-[state=open]:rotate-180" 
                aria-hidden="true"
              />
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-2">
          <div className="bg-[#1A1F2C] rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InitialDistributionTable />
              <TokenUtilityTable />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};
