
import { FileText, CalendarCheck, IdCard, File } from "lucide-react";

const InvestmentSteps = () => {
  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-white font-semibold">Required Steps for Approval:</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span>Sign investment contract</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center">
            <CalendarCheck className="w-3.5 h-3.5" />
          </div>
          <span>Complete intro meeting with NOISAI team</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center">
            <IdCard className="w-3.5 h-3.5" />
          </div>
          <span>Upload identification documents</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center">
            <File className="w-3.5 h-3.5" />
          </div>
          <span>Submit any additional required documentation</span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSteps;
