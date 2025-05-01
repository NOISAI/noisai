
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useInvestors } from "@/hooks/useInvestors";
import { searchInvestors } from "@/utils/adminUtils";
import { Investor } from "@/types/admin";

// Import shared components
import SearchBar from "./shared/SearchBar";
import CrudDialog from "./shared/CrudDialog";
import ConfirmationDialog from "./shared/ConfirmationDialog";

// Import investor-specific components
import InvestorForm, { InvestorFormValues } from "./investors/InvestorForm";
import InvestorTable from "./investors/InvestorTable";

const InvestorManagement = () => {
  const { investors, loading, addInvestor, updateInvestor, deleteInvestor, toggleInvestorStatus } = useInvestors();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentInvestor, setCurrentInvestor] = useState<Investor | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const addFormRef = useRef<HTMLFormElement>(null);
  const editFormRef = useRef<HTMLFormElement>(null);
  
  const filteredInvestors = searchInvestors(investors, searchQuery);
  
  const handleAddInvestor = async (data: InvestorFormValues) => {
    setSubmitting(true);
    try {
      await addInvestor({
        name: data.name,
        email: data.email,
        status: data.status,
        total_invested: 0,
        last_interaction: new Date().toISOString()
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding investor:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleEditInvestor = async (data: InvestorFormValues) => {
    if (!currentInvestor) return;
    
    setSubmitting(true);
    try {
      await updateInvestor(currentInvestor.id, {
        name: data.name,
        email: data.email,
        status: data.status
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating investor:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleDeleteInvestor = async () => {
    if (!currentInvestor) return;
    
    setSubmitting(true);
    try {
      await deleteInvestor(currentInvestor.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting investor:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleToggleStatus = async (investor: Investor) => {
    try {
      await toggleInvestorStatus(investor.id, investor.status);
    } catch (error) {
      console.error("Error toggling investor status:", error);
    }
  };
  
  const openEditDialog = (investor: Investor) => {
    setCurrentInvestor(investor);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (investor: Investor) => {
    setCurrentInvestor(investor);
    setIsDeleteDialogOpen(true);
  };

  const triggerAddFormSubmit = () => {
    addFormRef.current?.requestSubmit();
  };

  const triggerEditFormSubmit = () => {
    editFormRef.current?.requestSubmit();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Investor Management</h2>
        <div className="flex gap-4">
          <SearchBar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery}
            placeholder="Search investors..."
          />
          <Button 
            className="bg-[#22C55E] hover:bg-[#1ea853] text-black"
            onClick={() => setIsAddDialogOpen(true)}
            data-add-investor-button="true"
          >
            <UserPlus size={16} className="mr-1" /> Add New Investor
          </Button>
        </div>
      </div>

      <InvestorTable
        investors={filteredInvestors}
        loading={loading}
        searchQuery={searchQuery}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
        onToggleStatus={handleToggleStatus}
      />

      {/* Add Investor Dialog */}
      <CrudDialog
        title="Add New Investor"
        description="Enter the details of the new investor below."
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onCancel={() => setIsAddDialogOpen(false)}
        onSubmit={triggerAddFormSubmit}
        isSubmitting={submitting}
        submitLabel="Add Investor"
        submitLoadingLabel="Saving..."
      >
        <InvestorForm 
          onSubmit={handleAddInvestor}
          formRef={addFormRef}
        />
      </CrudDialog>

      {/* Edit Investor Dialog */}
      <CrudDialog
        title="Edit Investor"
        description="Update the investor's information."
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onCancel={() => setIsEditDialogOpen(false)}
        onSubmit={triggerEditFormSubmit}
        isSubmitting={submitting}
        submitLabel="Save Changes"
        submitLoadingLabel="Updating..."
      >
        {currentInvestor && (
          <InvestorForm 
            defaultValues={{
              name: currentInvestor.name,
              email: currentInvestor.email,
              status: currentInvestor.status
            }}
            onSubmit={handleEditInvestor}
            formRef={editFormRef}
          />
        )}
      </CrudDialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        title="Confirm Deletion"
        description="Are you sure you want to delete this investor? This action cannot be undone."
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteInvestor}
        onCancel={() => setIsDeleteDialogOpen(false)}
        isSubmitting={submitting}
        confirmLabel="Delete"
        confirmLoadingLabel="Deleting..."
        variant="danger"
      />
    </div>
  );
};

export default InvestorManagement;
