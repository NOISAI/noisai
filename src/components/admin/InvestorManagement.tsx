
import { useState } from "react";
import { useInvestors } from "@/hooks/useInvestors";
import { Investor } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import SearchBar from "@/components/admin/shared/SearchBar";
import InvestorTable from "@/components/admin/investors/InvestorTable";
import CrudDialog from "@/components/admin/shared/CrudDialog";
import InvestorForm, { InvestorFormValues } from "@/components/admin/investors/InvestorForm";
import ConfirmationDialog from "@/components/admin/shared/ConfirmationDialog";
import { useToast } from "@/hooks/use-toast";

export default function InvestorManagement() {
  // Get investors data and CRUD operations from custom hook
  const { investors, loading, add, update, delete: deleteInvestor, toggleStatus } = useInvestors();
  const { toast } = useToast();
  
  // Local component state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Filter investors based on search query
  const filteredInvestors = investors.filter(investor => 
    investor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    investor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle add investor
  const handleAddInvestor = async (data: InvestorFormValues) => {
    await add(data);
    setIsAddDialogOpen(false);
  };
  
  // Handle edit investor
  const handleEditInvestor = (investor: Investor) => {
    setSelectedInvestor(investor);
    setIsEditDialogOpen(true);
  };
  
  // Handle update investor
  const handleUpdateInvestor = async (data: InvestorFormValues) => {
    if (!selectedInvestor) return;
    
    await update(selectedInvestor.id, data);
    setIsEditDialogOpen(false);
  };
  
  // Handle delete investor
  const handleDeleteClick = (investor: Investor) => {
    setSelectedInvestor(investor);
    setIsDeleteDialogOpen(true);
  };
  
  // Confirm investor deletion
  const handleConfirmDelete = async () => {
    if (!selectedInvestor) return;
    
    await deleteInvestor(selectedInvestor.id);
    setIsDeleteDialogOpen(false);
  };
  
  // Handle toggle investor status
  const handleToggleStatus = async (investor: Investor) => {
    const success = await toggleStatus(investor.id, investor.status);
    
    if (success) {
      toast({
        title: `Investor ${investor.status === 'Active' ? 'Deactivated' : 'Activated'}`,
        description: `${investor.name} has been ${investor.status === 'Active' ? 'deactivated' : 'activated'}.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Action Failed",
        description: "Could not update investor status. Please try again.",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SearchBar 
          placeholder="Search investors..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          onClear={() => setSearchQuery("")} 
        />
        <Button 
          onClick={() => setIsAddDialogOpen(true)} 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          data-add-investor-button="true"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Investor
        </Button>
      </div>
      
      <InvestorTable 
        investors={filteredInvestors} 
        loading={loading}
        searchQuery={searchQuery} 
        onEdit={handleEditInvestor}
        onDelete={handleDeleteClick}
        onToggleStatus={handleToggleStatus}
      />
      
      {/* Add Investor Dialog */}
      <CrudDialog 
        title="Add New Investor"
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddInvestor}
        formComponent={(props) => <InvestorForm {...props} />}
      />
      
      {/* Edit Investor Dialog */}
      <CrudDialog 
        title="Edit Investor"
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleUpdateInvestor}
        formComponent={(props) => (
          <InvestorForm 
            {...props} 
            defaultValues={selectedInvestor ? {
              name: selectedInvestor.name,
              email: selectedInvestor.email,
              status: selectedInvestor.status
            } : undefined}
          />
        )}
      />
      
      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog 
        title="Delete Investor"
        description="Are you sure you want to delete this investor? This action cannot be undone."
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
