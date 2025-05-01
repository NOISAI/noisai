
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useInvestments } from "@/hooks/useInvestments";
import { useInvestors } from "@/hooks/useInvestors";
import { searchInvestments } from "@/utils/adminUtils";
import { Investment } from "@/types/admin";

// Import shared components
import SearchBar from "./shared/SearchBar";
import CrudDialog from "./shared/CrudDialog";
import ConfirmationDialog from "./shared/ConfirmationDialog";

// Import investment-specific components
import InvestmentForm, { InvestmentFormValues } from "./investments/InvestmentForm";
import InvestmentStats from "./investments/InvestmentStats";
import InvestmentTable from "./investments/InvestmentTable";
import InvestmentChart from "./investments/InvestmentChart";

const InvestmentTracking = () => {
  const { investments, loading, stats, addInvestment, updateInvestment, deleteInvestment } = useInvestments();
  const { investors } = useInvestors();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentInvestment, setCurrentInvestment] = useState<Investment | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const addFormRef = useRef<HTMLFormElement>(null);
  const editFormRef = useRef<HTMLFormElement>(null);
  
  const filteredInvestments = searchInvestments(investments, searchQuery);
  
  const handleAddInvestment = async (data: InvestmentFormValues) => {
    setSubmitting(true);
    try {
      await addInvestment({
        investor_id: data.investor_id,
        amount: Number(data.amount),
        date: data.date,
        type: data.type,
        status: data.status
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding investment:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleEditInvestment = async (data: InvestmentFormValues) => {
    if (!currentInvestment) return;
    
    setSubmitting(true);
    try {
      await updateInvestment(currentInvestment.id, {
        investor_id: data.investor_id,
        amount: Number(data.amount),
        date: data.date,
        type: data.type,
        status: data.status
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating investment:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleDeleteInvestment = async () => {
    if (!currentInvestment) return;
    
    setSubmitting(true);
    try {
      await deleteInvestment(currentInvestment.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting investment:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const openEditDialog = (investment: Investment) => {
    setCurrentInvestment(investment);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (investment: Investment) => {
    setCurrentInvestment(investment);
    setIsDeleteDialogOpen(true);
  };

  const triggerAddFormSubmit = () => {
    addFormRef.current?.requestSubmit();
  };

  const triggerEditFormSubmit = () => {
    editFormRef.current?.requestSubmit();
  };
  
  // Generate chart data for investment trends by month
  const generateChartData = () => {
    if (!investments.length) return [];
    
    const monthlyData = investments.reduce((acc, inv) => {
      const date = new Date(inv.date);
      const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      
      if (!acc[month]) {
        acc[month] = { month, amount: 0, count: 0 };
      }
      
      acc[month].amount += inv.amount;
      acc[month].count += 1;
      
      return acc;
    }, {} as Record<string, { month: string; amount: number; count: number }>);
    
    // Convert to array and sort by date
    return Object.values(monthlyData).sort((a, b) => {
      const monthsOrder: Record<string, number> = {
        "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
        "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
      };
      
      const [aMonth, aYear] = a.month.split(" ");
      const [bMonth, bYear] = b.month.split(" ");
      
      if (aYear !== bYear) return Number(aYear) - Number(bYear);
      return monthsOrder[aMonth] - monthsOrder[bMonth];
    });
  };

  const chartData = generateChartData();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Investment Tracking</h2>
        <div className="flex gap-4">
          <SearchBar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery}
            placeholder="Search investments..."
          />
          <Button 
            className="bg-[#22C55E] hover:bg-[#1ea853] text-black"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus size={16} className="mr-1" /> Add Investment
          </Button>
        </div>
      </div>

      <InvestmentStats
        totalInvestment={stats.totalInvestment}
        recentInvestments={stats.recentInvestments}
        averageInvestment={stats.averageInvestment}
      />

      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle>Recent Investments</CardTitle>
          <CardDescription>Track all investment activity</CardDescription>
        </CardHeader>
        <CardContent>
          <InvestmentTable
            investments={filteredInvestments}
            loading={loading}
            searchQuery={searchQuery}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
          />
        </CardContent>
      </Card>

      <InvestmentChart chartData={chartData} />

      {/* Add Investment Dialog */}
      <CrudDialog
        title="Add New Investment"
        description="Record a new investment."
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onCancel={() => setIsAddDialogOpen(false)}
        onSubmit={triggerAddFormSubmit}
        isSubmitting={submitting}
        submitLabel="Add Investment"
        submitLoadingLabel="Saving..."
      >
        <InvestmentForm
          investors={investors}
          onSubmit={handleAddInvestment}
          formRef={addFormRef}
        />
      </CrudDialog>

      {/* Edit Investment Dialog */}
      <CrudDialog
        title="Edit Investment"
        description="Update the investment details."
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onCancel={() => setIsEditDialogOpen(false)}
        onSubmit={triggerEditFormSubmit}
        isSubmitting={submitting}
        submitLabel="Save Changes"
        submitLoadingLabel="Updating..."
      >
        {currentInvestment && (
          <InvestmentForm
            investors={investors}
            defaultValues={{
              investor_id: currentInvestment.investor_id,
              amount: currentInvestment.amount.toString(),
              date: currentInvestment.date.split('T')[0],
              type: currentInvestment.type,
              status: currentInvestment.status
            }}
            onSubmit={handleEditInvestment}
            formRef={editFormRef}
          />
        )}
      </CrudDialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        title="Confirm Deletion"
        description="Are you sure you want to delete this investment? This action cannot be undone."
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteInvestment}
        onCancel={() => setIsDeleteDialogOpen(false)}
        isSubmitting={submitting}
        confirmLabel="Delete"
        confirmLoadingLabel="Deleting..."
        variant="danger"
      />
    </div>
  );
};

export default InvestmentTracking;
