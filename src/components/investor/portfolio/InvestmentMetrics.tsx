
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, PiggyBank, LineChart } from "lucide-react";
import { Investment } from "@/types/investment";
import { useIsMobile } from "@/hooks/use-mobile";

interface InvestmentMetricsProps {
  totalInvested: number;
  currentValue: number;
  roi: number;
  investmentCount: number;
  investmentOpportunities: Investment[];
}

const InvestmentMetrics = ({
  totalInvested,
  currentValue,
  roi,
  investmentCount,
  investmentOpportunities
}: InvestmentMetricsProps) => {
  const isMobile = useIsMobile();
  const formatterUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Invested</p>
                <h3 className="text-2xl font-bold">{formatterUSD.format(totalInvested)}</h3>
              </div>
              <div className="rounded-full bg-blue-900/20 p-2">
                <PiggyBank className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              {investmentCount} active investment{investmentCount !== 1 ? 's' : ''}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Current Value</p>
                <h3 className="text-2xl font-bold">{formatterUSD.format(currentValue)}</h3>
              </div>
              <div className="rounded-full bg-green-900/20 p-2">
                <LineChart className="h-5 w-5 text-[#22C55E]" />
              </div>
            </div>
            <div className="mt-2 text-xs flex items-center">
              {roi > 0 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-[#22C55E] mr-1" />
                  <span className="text-[#22C55E]">{roi.toFixed(2)}% ROI</span>
                </>
              ) : roi < 0 ? (
                <>
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500">{Math.abs(roi).toFixed(2)}% ROI</span>
                </>
              ) : (
                <span className="text-gray-400">0% ROI</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Unrealized Gain</p>
                <h3 className="text-2xl font-bold">
                  {formatterUSD.format(currentValue - totalInvested)}
                </h3>
              </div>
              <div className="rounded-full bg-purple-900/20 p-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Since initial investment
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Available Opportunities</p>
                <h3 className="text-2xl font-bold">{investmentOpportunities.length}</h3>
              </div>
              <div className="rounded-full bg-amber-900/20 p-2">
                <PiggyBank className="h-5 w-5 text-amber-400" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              New investment opportunities
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestmentMetrics;
