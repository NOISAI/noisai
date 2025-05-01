
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filter investors based on search query
  const filteredInvestors = investors.filter(investor => 
    investor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    investor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle add investor
  const handleAddInvestor = async (data: InvestorFormValues) => {
    setIsSubmitting(true);
    try {
      await add(data);
      setIsAddDialogOpen(false);
      toast({
        title: "Investor Added",
        description: `${data.name} has been added successfully.`,
      });
    } catch (error) {
      console.error("Error adding investor:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add investor. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle edit investor
  const handleEditInvestor = (investor: Investor) => {
    setSelectedInvestor(investor);
    setIsEditDialogOpen(true);
  };
  
  // Handle update investor
  const handleUpdateInvestor = async (data: InvestorFormValues) => {
    if (!selectedInvestor) return;
    
    setIsSubmitting(true);
    try {
      await update(selectedInvestor.id, data);
      setIsEditDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle delete investor
  const handleDeleteClick = (investor: Investor) => {
    setSelectedInvestor(investor);
    setIsDeleteDialogOpen(true);
  };
  
  // Confirm investor deletion
  const handleConfirmDelete = async () => {
    if (!selectedInvestor) return;
    
    setIsSubmitting(true);
    try {
      await deleteInvestor(selectedInvestor.id);
      setIsDeleteDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
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
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
        <Button 
          onClick={() => setIsAddDialogOpen(true)} 
          className="bg-[#22C55E] hover:bg-[#1ea853] text-black"
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
        description="Enter the details for the new investor."
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={() => {
          const form = document.querySelector('form');
          if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbling: true }));
        }}
        onCancel={() => setIsAddDialogOpen(false)}
        isSubmitting={isSubmitting}
        submitLabel="Add Investor"
      >
        <InvestorForm onSubmit={handleAddInvestor} />
      </CrudDialog>
      
      {/* Edit Investor Dialog */}
      <CrudDialog 
        title="Edit Investor"
        description="Update the investor details."
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={() => {
          const form = document.querySelector('form');
          if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbling: true }));
        }}
        onCancel={() => setIsEditDialogOpen(false)}
        isSubmitting={isSubmitting}
        submitLabel="Update Investor"
      >
        <InvestorForm 
          onSubmit={handleUpdateInvestor} 
          defaultValues={selectedInvestor ? {
            name: selectedInvestor.name,
            email: selectedInvestor.email,
            status: selectedInvestor.status
          } : undefined}
        />
      </CrudDialog>
      
      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog 
        title="Delete Investor"
        description="Are you sure you want to delete this investor? This action cannot be undone."
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        isSubmitting={isSubmitting}
        confirmLabel="Delete"
      />
    </div>
  );
}
