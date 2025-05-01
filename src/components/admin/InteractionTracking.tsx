
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useInteractions } from "@/hooks/useInteractions";
import { useInvestors } from "@/hooks/useInvestors";
import { searchInteractions } from "@/utils/adminUtils";

// Import shared components
import SearchBar from "./shared/SearchBar";
import CrudDialog from "./shared/CrudDialog";
import ConfirmationDialog from "./shared/ConfirmationDialog";

// Import interaction-specific components
import InteractionForm, { InteractionFormValues } from "./interactions/InteractionForm";
import InteractionTable from "./interactions/InteractionTable";
import { Interaction } from "@/types/admin";

const InteractionTracking = () => {
  const { interactions, loading, addInteraction, updateInteraction, deleteInteraction } = useInteractions();
  const { investors } = useInvestors();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentInteraction, setCurrentInteraction] = useState<Interaction | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const addFormRef = useRef<HTMLFormElement>(null);
  const editFormRef = useRef<HTMLFormElement>(null);
  
  const filteredInteractions = searchInteractions(interactions, searchQuery);
  
  const handleAddInteraction = async (data: InteractionFormValues) => {
    setSubmitting(true);
    try {
      await addInteraction({
        investor_id: data.investor_id,
        type: data.type,
        date: data.date,
        notes: data.notes,
        follow_up: data.follow_up || null
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding interaction:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleEditInteraction = async (data: InteractionFormValues) => {
    if (!currentInteraction) return;
    
    setSubmitting(true);
    try {
      await updateInteraction(currentInteraction.id, {
        investor_id: data.investor_id,
        type: data.type,
        date: data.date,
        notes: data.notes,
        follow_up: data.follow_up || null
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating interaction:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleDeleteInteraction = async () => {
    if (!currentInteraction) return;
    
    setSubmitting(true);
    try {
      await deleteInteraction(currentInteraction.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting interaction:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const openEditDialog = (interaction: Interaction) => {
    setCurrentInteraction(interaction);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (interaction: Interaction) => {
    setCurrentInteraction(interaction);
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
        <h2 className="text-2xl font-bold">Interaction Tracking</h2>
        <div className="flex gap-4">
          <SearchBar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery}
            placeholder="Search interactions..."
          />
          <Button 
            className="bg-[#22C55E] hover:bg-[#1ea853] text-black"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <PlusCircle size={16} className="mr-1" /> Log Interaction
          </Button>
        </div>
      </div>

      <InteractionTable
        interactions={filteredInteractions}
        loading={loading}
        searchQuery={searchQuery}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />

      {/* Add Interaction Dialog */}
      <CrudDialog
        title="Log New Interaction"
        description="Record a new interaction with an investor."
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onCancel={() => setIsAddDialogOpen(false)}
        onSubmit={triggerAddFormSubmit}
        isSubmitting={submitting}
        submitLabel="Log Interaction"
        submitLoadingLabel="Saving..."
      >
        <InteractionForm
          investors={investors}
          onSubmit={handleAddInteraction}
          formRef={addFormRef}
        />
      </CrudDialog>

      {/* Edit Interaction Dialog */}
      <CrudDialog
        title="Edit Interaction"
        description="Update the interaction details."
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onCancel={() => setIsEditDialogOpen(false)}
        onSubmit={triggerEditFormSubmit}
        isSubmitting={submitting}
        submitLabel="Save Changes"
        submitLoadingLabel="Updating..."
      >
        {currentInteraction && (
          <InteractionForm
            investors={investors}
            defaultValues={{
              investor_id: currentInteraction.investor_id,
              type: currentInteraction.type,
              date: currentInteraction.date.split('T')[0],
              notes: currentInteraction.notes,
              follow_up: currentInteraction.follow_up ? currentInteraction.follow_up.split('T')[0] : ""
            }}
            onSubmit={handleEditInteraction}
            formRef={editFormRef}
          />
        )}
      </CrudDialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        title="Confirm Deletion"
        description="Are you sure you want to delete this interaction? This action cannot be undone."
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteInteraction}
        onCancel={() => setIsDeleteDialogOpen(false)}
        isSubmitting={submitting}
        confirmLabel="Delete"
        confirmLoadingLabel="Deleting..."
        variant="danger"
      />
    </div>
  );
};

export default InteractionTracking;
