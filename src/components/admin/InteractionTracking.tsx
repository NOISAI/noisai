
import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { 
  PlusCircle, Phone, Mail, Calendar, Clock, UserCircle, Edit, 
  Trash2, Loader2
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useInteractions } from "@/hooks/useInteractions";
import { useInvestors } from "@/hooks/useInvestors";
import { searchInteractions, formatDate } from "@/utils/adminUtils";

const interactionSchema = z.object({
  investor_id: z.string().min(1, "Investor is required"),
  type: z.enum(["Call", "Email", "Meeting"]),
  date: z.string().min(1, "Date is required"),
  notes: z.string().min(1, "Notes are required"),
  follow_up: z.string().optional(),
});

type InteractionFormValues = z.infer<typeof interactionSchema>;

const InteractionTracking = () => {
  const { interactions, loading, addInteraction, updateInteraction, deleteInteraction } = useInteractions();
  const { investors } = useInvestors();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentInteraction, setCurrentInteraction] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const filteredInteractions = searchInteractions(interactions, searchQuery);
  
  const addForm = useForm<InteractionFormValues>({
    resolver: zodResolver(interactionSchema),
    defaultValues: {
      investor_id: "",
      type: "Call",
      date: new Date().toISOString().split('T')[0],
      notes: "",
      follow_up: "",
    }
  });
  
  const editForm = useForm<InteractionFormValues>({
    resolver: zodResolver(interactionSchema),
    defaultValues: {
      investor_id: "",
      type: "Call",
      date: "",
      notes: "",
      follow_up: "",
    }
  });
  
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
      addForm.reset();
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
  
  const openEditDialog = (interaction: any) => {
    setCurrentInteraction(interaction);
    editForm.reset({
      investor_id: interaction.investor_id,
      type: interaction.type,
      date: interaction.date.split('T')[0],
      notes: interaction.notes,
      follow_up: interaction.follow_up ? interaction.follow_up.split('T')[0] : ""
    });
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (interaction: any) => {
    setCurrentInteraction(interaction);
    setIsDeleteDialogOpen(true);
  };
  
  const getIconForType = (type: string) => {
    switch(type) {
      case "Call": return <Phone className="h-4 w-4" />;
      case "Email": return <Mail className="h-4 w-4" />;
      case "Meeting": return <UserCircle className="h-4 w-4" />;
      default: return <UserCircle className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Interaction Tracking</h2>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Input
              placeholder="Search interactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-900 border-gray-800"
            />
          </div>
          <Button 
            className="bg-[#22C55E] hover:bg-[#1ea853] text-black"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <PlusCircle size={16} className="mr-1" /> Log Interaction
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800 hover:bg-gray-800">
              <TableHead className="text-gray-300">Investor</TableHead>
              <TableHead className="text-gray-300">Type</TableHead>
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">Notes</TableHead>
              <TableHead className="text-gray-300">Follow-Up</TableHead>
              <TableHead className="text-gray-300 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading interactions...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredInteractions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  {searchQuery ? "No interactions match your search" : "No interactions found. Log your first interaction!"}
                </TableCell>
              </TableRow>
            ) : (
              filteredInteractions.map((interaction) => (
                <TableRow key={interaction.id} className="bg-gray-900 hover:bg-gray-800">
                  <TableCell>{interaction.investor_name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="bg-gray-800 p-1 rounded-full mr-2">
                        {getIconForType(interaction.type)}
                      </span>
                      {interaction.type}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {formatDate(interaction.date)}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{interaction.notes}</TableCell>
                  <TableCell>
                    {interaction.follow_up ? (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-yellow-500" />
                        {formatDate(interaction.follow_up)}
                      </div>
                    ) : (
                      <span className="text-gray-500">None</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      className="h-8 w-8 p-0 mr-1"
                      onClick={() => openEditDialog(interaction)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-red-500"
                      onClick={() => openDeleteDialog(interaction)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Interaction Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Log New Interaction</DialogTitle>
            <DialogDescription className="text-gray-400">
              Record a new interaction with an investor.
            </DialogDescription>
          </DialogHeader>
          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit(handleAddInteraction)} className="space-y-4">
              <FormField
                control={addForm.control}
                name="investor_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investor</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select an investor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        {investors.map((investor) => (
                          <SelectItem key={investor.id} value={investor.id}>
                            {investor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select interaction type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="Call">Call</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Meeting">Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        className="bg-gray-800 border-gray-700" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter interaction details..." 
                        {...field} 
                        className="bg-gray-800 border-gray-700 min-h-[80px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="follow_up"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Follow-Up Date (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        className="bg-gray-800 border-gray-700" 
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      Set a date if follow-up is needed
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="border-gray-700"
                  type="button"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#22C55E] hover:bg-[#1ea853] text-black"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>Log Interaction</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Interaction Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Edit Interaction</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update the interaction details.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditInteraction)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="investor_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investor</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select an investor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        {investors.map((investor) => (
                          <SelectItem key={investor.id} value={investor.id}>
                            {investor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select interaction type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="Call">Call</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Meeting">Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        className="bg-gray-800 border-gray-700" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        className="bg-gray-800 border-gray-700 min-h-[80px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="follow_up"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Follow-Up Date (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        className="bg-gray-800 border-gray-700" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="border-gray-700"
                  type="button"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#22C55E] hover:bg-[#1ea853] text-black"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>Save Changes</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this interaction? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteInteraction}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>Delete</>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InteractionTracking;
