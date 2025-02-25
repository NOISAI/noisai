
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InitialDistributionTable } from "@/components/tokenomics/InitialDistributionTable";
import { TokenUtilityTable } from "@/components/tokenomics/TokenUtilityTable";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Community & Rewards", value: 18, tokens: "37,800,000 $NOISAI" },
  { name: "Seed", value: 8, tokens: "16,800,000 $NOISAI" },
  { name: "Private", value: 10, tokens: "21,000,000 $NOISAI" },
  { name: "RF", value: 4, tokens: "8,400,000 $NOISAI" },
  { name: "Development Funds", value: 20, tokens: "42,000,000 $NOISAI" },
  { name: "Team & Advisors", value: 15, tokens: "31,500,000 $NOISAI" },
  { name: "Ecosystem Growth", value: 12, tokens: "25,200,000 $NOISAI" },
  { name: "Public Sale", value: 8, tokens: "16,800,000 $NOISAI" },
  { name: "Liquidity&MM", value: 5, tokens: "10,500,000 $NOISAI" }
];

const COLORS = [
  "#22C55E", // Community & Rewards
  "#1D9E4B", // Seed
  "#178C3E", // Private
  "#147A31", // RF
  "#116824", // Development Funds
  "#0E5617", // Team & Advisors
  "#0B440A", // Ecosystem Growth
  "#D4D81D", // Public Sale
  "#F97316"  // Liquidity&MM
];

export const TokenomicsSection = () => {
  return (
    <section className="w-full max-w-4xl mx-auto mt-20 px-4">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Tokenomics</h2>
      
      <Accordion type="single" collapsible>
        <AccordionItem value="tokenomics" className="border-none">
          <AccordionTrigger className="w-full bg-[#1A1F2C] hover:bg-[#1A1F2C]/80 transition-colors rounded-lg p-4 [&>svg]:text-green-500">
            <span className="text-lg font-semibold text-white">NOISAI Token Distribution</span>
          </AccordionTrigger>
          
          <AccordionContent className="mt-2">
            <div className="bg-[#1A1F2C] rounded-lg p-4">
              <div className="w-full h-[400px] mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={140}
                      fill="#8884d8"
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend 
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      formatter={(value) => <span className="text-white">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
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
