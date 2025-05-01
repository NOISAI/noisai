
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DownloadCloud, FileText, Users, TrendingUp, Calendar,
  CheckSquare, Loader2, FileDown
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReports } from "@/hooks/useReports";
import { formatDate } from "@/utils/adminUtils";

const ReportGenerator = () => {
  const { reports, generating, generateReport } = useReports();
  const [generatingType, setGeneratingType] = useState<string | null>(null);
  
  const handleGenerateReport = async (reportType: string) => {
    setGeneratingType(reportType);
    try {
      await generateReport(reportType);
    } catch (error) {
      console.error(`Error generating ${reportType} report:`, error);
    } finally {
      setGeneratingType(null);
    }
  };
  
  const downloadReport = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
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
                disabled={generating || generatingType === "Investor Activity"}
              >
                {generatingType === "Investor Activity" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <DownloadCloud className="mr-2 h-4 w-4" />
                    Generate Report
                  </>
                )}
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
                disabled={generating || generatingType === "Investment Performance"}
              >
                {generatingType === "Investment Performance" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <DownloadCloud className="mr-2 h-4 w-4" />
                    Generate Report
                  </>
                )}
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
                disabled={generating || generatingType === "Quarterly Summary"}
              >
                {generatingType === "Quarterly Summary" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <DownloadCloud className="mr-2 h-4 w-4" />
                    Generate Report
                  </>
                )}
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
                disabled={generating || generatingType === "Custom"}
              >
                {generatingType === "Custom" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <DownloadCloud className="mr-2 h-4 w-4" />
                    Build Custom Report
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports Table */}
      <Card className="bg-gray-900 border border-gray-800 mt-8">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-800 hover:bg-gray-800">
                <TableHead className="text-gray-300">Report Name</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Generated On</TableHead>
                <TableHead className="text-gray-300 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No reports generated yet.
                  </TableCell>
                </TableRow>
              ) : (
                reports.map((report) => (
                  <TableRow key={report.id} className="bg-gray-900 hover:bg-gray-800">
                    <TableCell>{report.name}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{formatDate(report.created_at)}</TableCell>
                    <TableCell className="text-right">
                      {report.file_url ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#22C55E] text-[#22C55E] hover:bg-[#22C55E]/10"
                          onClick={() => downloadReport(report.file_url!)}
                        >
                          <FileDown className="h-4 w-4 mr-1" /> Download
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-400"
                          disabled
                        >
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" /> Processing
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportGenerator;
