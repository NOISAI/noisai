
import React from "react";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CheckCheck, Users, Phone, TrendingUp, FileText, UserCheck } from "lucide-react";

interface AdminGuideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AdminGuide({ open, onOpenChange }: AdminGuideProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto bg-gray-900 border-gray-800 text-white">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl text-white">NOISAI Admin Guide</SheetTitle>
          <SheetDescription className="text-gray-300">
            Everything you need to know about managing the NOISAI platform
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8">
          <section className="space-y-4">
            <h3 className="text-xl font-medium text-[#22C55E] flex items-center">
              <Users className="mr-2" /> Investor Management
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>The Investor Management tab allows you to:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>View and search through all registered investors</li>
                <li>Add new investors manually</li>
                <li>Edit investor details and contact information</li>
                <li>Deactivate investor accounts when necessary</li>
              </ul>
              <p className="mt-2">
                To add a new investor, click the "Add Investor" button in the top right corner of the dashboard.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-medium text-[#22C55E] flex items-center">
              <Phone className="mr-2" /> Interaction Tracking
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>Use the Interaction Tracking tab to:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Log all communications with investors (calls, emails, meetings)</li>
                <li>Set follow-up reminders for pending interactions</li>
                <li>Track interaction outcomes and action items</li>
                <li>View interaction history for specific investors</li>
              </ul>
              <p className="mt-2">
                Each interaction should include detailed notes to maintain comprehensive records of investor relationships.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-medium text-[#22C55E] flex items-center">
              <TrendingUp className="mr-2" /> Investment Tracking
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>The Investment Tracking tab provides tools to:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Record all investment transactions</li>
                <li>View investment analytics and performance metrics</li>
                <li>Track investment amounts, types, and dates</li>
                <li>Generate investment reports for stakeholders</li>
              </ul>
              <p className="mt-2">
                The dashboard shows key metrics including total investments, average investment size, and investment growth trends.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-medium text-[#22C55E] flex items-center">
              <FileText className="mr-2" /> Report Generation
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>The Report Generator allows you to:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Create custom reports for specific time periods</li>
                <li>Export data in multiple formats (PDF, CSV, Excel)</li>
                <li>Schedule automated report distributions</li>
                <li>Generate investor-specific performance reports</li>
              </ul>
              <p className="mt-2">
                Reports can be customized by selecting specific data points, date ranges, and visualization types.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-medium text-[#22C55E] flex items-center">
              <UserCheck className="mr-2" /> Profile Requests
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>The Profile Requests tab helps you:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Review and approve investor profile update requests</li>
                <li>Verify updated information for accuracy and compliance</li>
                <li>Manage the profile verification workflow</li>
                <li>Track the history of profile changes</li>
              </ul>
              <p className="mt-2">
                Review requests thoroughly before approving to maintain data integrity and security.
              </p>
            </div>
          </section>
        </div>

        <SheetFooter className="mt-8">
          <SheetClose asChild>
            <Button variant="default" className="bg-[#22C55E] hover:bg-[#22C55E]/90">
              <CheckCheck className="mr-2 h-4 w-4" />
              Got it
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
