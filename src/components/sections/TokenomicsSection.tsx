
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InitialDistributionTable } from "@/components/tokenomics/InitialDistributionTable";
import { TokenUtilityTable } from "@/components/tokenomics/TokenUtilityTable";

export const TokenomicsSection = () => {
  return (
    <section className="w-full max-w-4xl mx-auto mt-20 px-4">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Tokenomics</h2>
      
      <Accordion type="single" collapsible>
        <AccordionItem value="tokenomics" className="border-none">
          <AccordionTrigger className="w-full bg-[#1A1F2C] hover:bg-[#1A1F2C]/80 transition-colors rounded-lg p-4 [&>svg]:text-green-500">
            <span className="text-lg font-semibold text-white">NOIS Token Distribution</span>
          </AccordionTrigger>
          
          <AccordionContent className="mt-2">
            <div className="bg-[#1A1F2C] rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InitialDistributionTable />
                <TokenUtilityTable />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
