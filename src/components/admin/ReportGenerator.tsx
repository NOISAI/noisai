
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DownloadCloud, FileText, Users, TrendingUp, Calendar,
  CheckSquare 
} from "lucide-react";

const ReportGenerator = () => {
  const [generatingReport, setGeneratingReport] = useState(false);
  
  const handleGenerateReport = (reportType: string) => {
    setGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setGeneratingReport(false);
      console.log(`Generated ${reportType} report`);
      // In a real app, this is where you'd trigger a download or redirect to the report
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Report Generator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#22C55E]/10 rounded-lg">
                <Users className="w-6 h-6 text-[#22C55E]" />
              </div>
              <div>
                <CardTitle className="text-xl">Investor Activity Report</CardTitle>
                <p className="text-sm text-gray-400 mt-1">
                  Generate a detailed report on investor engagement and activity
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-[#22C55E]" />
                <span className="text-sm">Investor engagement metrics</span>
              </div>
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-[#22C55E]" />
                <span className="text-sm">Activity timelines</span>
              </div>
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-[#22C55E]" />
                <span className="text-sm">Interaction summaries</span>
              </div>
              <Button 
                className="w-full bg-[#22C55E] hover:bg-[#1ea853] text-black mt-4"
                onClick={() => handleGenerateReport("Investor Activity")}
                disabled={generatingReport}
              >
                <DownloadCloud className="mr-2 h-4 w-4" />
                {generatingReport ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#22C55E]/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-[#22C55E]" />
              </div>
              <div>
                <CardTitle className="text-xl">Investment Performance Report</CardTitle>
                <p className="text-sm text-gray-400 mt-1">
                  Generate insights on investment performance and trends
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-[#22C55E]" />
                <span className="text-sm">Investment distribution analysis</span>
              </div>
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-[#22C55E]" />
                <span className="text-sm">Growth trends over time</span>
              </div>
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-[#22C55E]" />
                <span className="text-sm">Projected returns</span>
              </div>
              <Button 
                className="w-full bg-[#22C55E] hover:bg-[#1ea853] text-black mt-4"
                onClick={() => handleGenerateReport("Investment Performance")}
                disabled={generatingReport}
              >
                <DownloadCloud className="mr-2 h-4 w-4" />
                {generatingReport ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#22C55E]/10 rounded-lg">
                <Calendar className="w-6 h-6 text-[#22C55E]" />
              </div>
              <div>
                <CardTitle className="text-xl">Quarterly Summary Report</CardTitle>
                <p className="text-sm text-gray-400 mt-1">
                  Generate comprehensive quarterly business overview
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-[#22C55E]" />
                <span className="text-sm">Quarterly performance metrics</span>
              </div>
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-[#22C55E]" />
                <span className="text-sm">Comparison with previous quarters</span>
              </div>
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-[#22C55E]" />
                <span className="text-sm">Forecasts for next quarter</span>
              </div>
              <Button 
                className="w-full bg-[#22C55E] hover:bg-[#1ea853] text-black mt-4"
                onClick={() => handleGenerateReport("Quarterly Summary")}
                disabled={generatingReport}
              >
                <DownloadCloud className="mr-2 h-4 w-4" />
                {generatingReport ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#22C55E]/10 rounded-lg">
                <FileText className="w-6 h-6 text-[#22C55E]" />
              </div>
              <div>
                <CardTitle className="text-xl">Custom Report Builder</CardTitle>
                <p className="text-sm text-gray-400 mt-1">
                  Create a custom report with selected metrics
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-[#22C55E]" />
                <span className="text-sm">Select custom date ranges</span>
              </div>
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-[#22C55E]" />
                <span className="text-sm">Choose specific metrics</span>
              </div>
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-2 text-[#22C55E]" />
                <span className="text-sm">Filter by investor categories</span>
              </div>
              <Button 
                className="w-full bg-[#22C55E] hover:bg-[#1ea853] text-black mt-4"
                onClick={() => handleGenerateReport("Custom")}
                disabled={generatingReport}
              >
                <DownloadCloud className="mr-2 h-4 w-4" />
                {generatingReport ? "Generating..." : "Build Custom Report"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportGenerator;
