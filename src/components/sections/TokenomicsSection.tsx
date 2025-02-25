
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InitialDistributionTable } from "@/components/tokenomics/InitialDistributionTable";
import { TokenUtilityTable } from "@/components/tokenomics/TokenUtilityTable";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    "Community & Rewards",
    "Seed",
    "Private",
    "RF",
    "Development Funds",
    "Team & Advisors",
    "Ecosystem Growth",
    "Public Sale",
    "Liquidity&MM"
  ],
  datasets: [{
    data: [18, 8, 10, 4, 20, 15, 12, 8, 5],
    backgroundColor: [
      "#22C55E",
      "#1D9E4B",
      "#178C3E",
      "#147A31",
      "#116824",
      "#0E5617",
      "#0B440A",
      "#D4D81D",
      "#F97316"
    ],
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)', // Adding subtle borders for depth
    offset: 4, // Adding segment separation for better 3D effect
    hoverOffset: 8
  }]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        color: 'white',
        padding: 20,
        font: {
          size: 14
        }
      }
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          const label = context.label || '';
          const value = context.parsed || 0;
          const tokens = [
            "37,800,000 $NOISAI",
            "16,800,000 $NOISAI",
            "21,000,000 $NOISAI",
            "8,400,000 $NOISAI",
            "42,000,000 $NOISAI",
            "31,500,000 $NOISAI",
            "25,200,000 $NOISAI",
            "16,800,000 $NOISAI",
            "10,500,000 $NOISAI"
          ][context.dataIndex];
          return `${label}: ${value}% (${tokens})`;
        }
      }
    }
  },
  rotation: -45, // Rotation for 3D-like effect
  cutout: '60%', // Donut hole size
  radius: '90%', // Slightly larger radius
};

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
              <div className="w-full h-[500px] mb-8">
                <Doughnut data={data} options={options} />
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
