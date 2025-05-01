
import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
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
  MoreHorizontal, UserPlus, Edit, Trash2, UserCheck, UserX, Loader2 
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInvestors } from "@/hooks/useInvestors";
import { searchInvestors, formatCurrency, formatDate } from "@/utils/adminUtils";

const investorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  status: z.enum(["Active", "Inactive"]),
});

type InvestorFormValues = z.infer<typeof investorSchema>;

const InvestorManagement = () => {
  const { investors, loading, addInvestor, updateInvestor, deleteInvestor, toggleInvestorStatus } = useInvestors();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentInvestor, setCurrentInvestor] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const filteredInvestors = searchInvestors(investors, searchQuery);
  
  const addForm = useForm<InvestorFormValues>({
    resolver: zodResolver(investorSchema),
    defaultValues: {
      name: "",
      email: "",
      status: "Active",
    }
  });
  
  const editForm = useForm<InvestorFormValues>({
    resolver: zodResolver(investorSchema),
    defaultValues: {
      name: "",
      email: "",
      status: "Active",
    }
  });
  
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
      addForm.reset();
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
  
  const handleToggleStatus = async (investor: any) => {
    try {
      await toggleInvestorStatus(investor.id, investor.status);
    } catch (error) {
      console.error("Error toggling investor status:", error);
    }
  };
  
  const openEditDialog = (investor: any) => {
    setCurrentInvestor(investor);
    editForm.reset({
      name: investor.name,
      email: investor.email,
      status: investor.status
    });
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (investor: any) => {
    setCurrentInvestor(investor);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Investor Management</h2>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Input
              placeholder="Search investors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-900 border-gray-800"
            />
          </div>
          <Button 
            className="bg-[#22C55E] hover:bg-[#1ea853] text-black"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <UserPlus size={16} className="mr-1" /> Add New Investor
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800 hover:bg-gray-800">
              <TableHead className="text-gray-300">Name</TableHead>
              <TableHead className="text-gray-300">Email</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Total Invested</TableHead>
              <TableHead className="text-gray-300">Last Interaction</TableHead>
              <TableHead className="text-gray-300 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading investors...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredInvestors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  {searchQuery ? "No investors match your search" : "No investors found. Add your first investor!"}
                </TableCell>
              </TableRow>
            ) : (
              filteredInvestors.map((investor) => (
                <TableRow key={investor.id} className="bg-gray-900 hover:bg-gray-800">
                  <TableCell>{investor.name}</TableCell>
                  <TableCell>{investor.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      investor.status === "Active" 
                        ? "bg-green-900 text-green-300" 
                        : "bg-gray-800 text-gray-400"
                    }`}>
                      {investor.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatCurrency(investor.total_invested)}</TableCell>
                  <TableCell>{formatDate(investor.last_interaction)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                        <DropdownMenuItem 
                          className="text-white hover:bg-gray-800 cursor-pointer"
                          onClick={() => openEditDialog(investor)}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-white hover:bg-gray-800 cursor-pointer"
                          onClick={() => handleToggleStatus(investor)}
                        >
                          {investor.status === "Active" ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" /> Set Inactive
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" /> Set Active
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-500 hover:bg-gray-800 cursor-pointer"
                          onClick={() => openDeleteDialog(investor)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Investor Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Add New Investor</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter the details of the new investor below.
            </DialogDescription>
          </DialogHeader>
          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit(handleAddInvestor)} className="space-y-4">
              <FormField
                control={addForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="bg-gray-800 border-gray-700" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} className="bg-gray-800 border-gray-700" />
                    </FormControl>
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
                    <>Add Investor</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Investor Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Edit Investor</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update the investor's information.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditInvestor)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800 border-gray-700" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800 border-gray-700" />
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
              Are you sure you want to delete this investor? This action cannot be undone.
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
              onClick={handleDeleteInvestor}
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

export default InvestorManagement;
