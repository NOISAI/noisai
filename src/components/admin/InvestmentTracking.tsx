
import { useState } from "react";
import { 
  BarChart, Calendar, DollarSign, TrendingUp, ArrowUpRight,
  Plus, Edit, Trash2, Loader2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInvestments } from "@/hooks/useInvestments";
import { useInvestors } from "@/hooks/useInvestors";
import { searchInvestments, formatCurrency, formatDate } from "@/utils/adminUtils";
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const investmentSchema = z.object({
  investor_id: z.string().min(1, "Investor is required"),
  amount: z.string().min(1, "Amount is required")
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a valid number greater than zero",
    }),
  date: z.string().min(1, "Date is required"),
  type: z.string().min(1, "Investment type is required"),
  status: z.enum(["Completed", "Processing", "Cancelled"]),
});

type InvestmentFormValues = z.infer<typeof investmentSchema>;

const InvestmentTracking = () => {
  const { investments, loading, stats, addInvestment, updateInvestment, deleteInvestment } = useInvestments();
  const { investors } = useInvestors();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentInvestment, setCurrentInvestment] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const filteredInvestments = searchInvestments(investments, searchQuery);
  
  const addForm = useForm<InvestmentFormValues>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      investor_id: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      type: "Seed Round",
      status: "Processing",
    }
  });
  
  const editForm = useForm<InvestmentFormValues>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      investor_id: "",
      amount: "",
      date: "",
      type: "",
      status: "Processing",
    }
  });
  
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
      addForm.reset();
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
  
  const openEditDialog = (investment: any) => {
    setCurrentInvestment(investment);
    editForm.reset({
      investor_id: investment.investor_id,
      amount: investment.amount.toString(),
      date: investment.date.split('T')[0],
      type: investment.type,
      status: investment.status
    });
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (investment: any) => {
    setCurrentInvestment(investment);
    setIsDeleteDialogOpen(true);
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
          <div className="relative w-64">
            <Input
              placeholder="Search investments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-900 border-gray-800"
            />
          </div>
          <Button 
            className="bg-[#22C55E] hover:bg-[#1ea853] text-black"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus size={16} className="mr-1" /> Add Investment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-[#22C55E]" />
                <span className="text-2xl font-bold">
                  {formatCurrency(stats.totalInvestment)}
                </span>
              </div>
              <span className="flex items-center text-xs text-[#22C55E]">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 12.5%
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Recent Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-[#22C55E]" />
                <span className="text-2xl font-bold">{stats.recentInvestments} this month</span>
              </div>
              <span className="flex items-center text-xs text-[#22C55E]">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 50%
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Average Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart className="h-4 w-4 text-[#22C55E]" />
                <span className="text-2xl font-bold">
                  {formatCurrency(stats.averageInvestment)}
                </span>
              </div>
              <span className="flex items-center text-xs text-[#22C55E]">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 5.3%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle>Recent Investments</CardTitle>
          <CardDescription>Track all investment activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800 hover:bg-gray-800">
                  <TableHead className="text-gray-300">Investor</TableHead>
                  <TableHead className="text-gray-300">Amount</TableHead>
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Investment Type</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        <span>Loading investments...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredInvestments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      {searchQuery ? "No investments match your search" : "No investments found. Add your first investment!"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvestments.map((investment) => (
                    <TableRow key={investment.id} className="bg-gray-900 hover:bg-gray-800">
                      <TableCell>{investment.investor_name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-[#22C55E]" />
                          {formatCurrency(investment.amount)}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(investment.date)}</TableCell>
                      <TableCell>{investment.type}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          investment.status === "Completed" 
                            ? "bg-green-900 text-green-300" 
                            : investment.status === "Processing"
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-red-900 text-red-300"
                        }`}>
                          {investment.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 mr-1"
                          onClick={() => openEditDialog(investment)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 text-red-500"
                          onClick={() => openDeleteDialog(investment)}
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
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle>Investment Trend</CardTitle>
          <CardDescription>Monthly investment visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] border border-gray-800 rounded-md bg-gray-950 p-4">
            {chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2 text-[#22C55E]" />
                  <p className="text-gray-400">No investment data available yet</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#222', borderColor: '#444' }} 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']}
                  />
                  <Legend />
                  <Bar dataKey="amount" name="Investment Amount" fill="#22C55E" />
                  <Bar dataKey="count" name="Number of Investments" fill="#3B82F6" />
                </ReBarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Investment Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Add New Investment</DialogTitle>
            <DialogDescription className="text-gray-400">
              Record a new investment.
            </DialogDescription>
          </DialogHeader>
          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit(handleAddInvestment)} className="space-y-4">
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
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="10000" 
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Type</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Seed Round" 
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <>Add Investment</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Investment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Edit Investment</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update the investment details.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditInvestment)} className="space-y-4">
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
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Type</FormLabel>
                    <FormControl>
                      <Input 
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
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
              Are you sure you want to delete this investment? This action cannot be undone.
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
              onClick={handleDeleteInvestment}
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

export default InvestmentTracking;
