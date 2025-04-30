
import { DollarSign, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import emailjs from 'emailjs-com';

// Updated mock data for investments with seed sale
const mockInvestments = [
  { 
    id: 1, 
    name: "NOISAI Seed Round", 
    amount: 0, 
    target: 1000000,
    raised: 0,
    date: "2025-05-15", 
    status: "Active", 
    roi: "0%",
    endDate: "2025-06-30"
  },
];

const investmentFormSchema = z.object({
  amount: z.string().min(1, "Investment amount is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Must be a valid number",
    })
    .refine((val) => Number(val) >= 10000, {
      message: "Minimum investment is $10,000",
    }),
  email: z.string().email("Please enter a valid email address"),
});

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_noisai';  // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_investment';  // Replace with your EmailJS template ID
const EMAILJS_USER_ID = 'YOUR_USER_ID';  // Replace with your EmailJS user ID

const InvestmentsList = () => {
  const { toast } = useToast();
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(investmentFormSchema),
    defaultValues: {
      amount: "10000",
      email: "",
    },
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_USER_ID);
  }, []);

  const handleInvest = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Prepare email data
      const investmentData = {
        investment: selectedInvestment?.name,
        amount: data.amount,
        investorEmail: data.email,
        timestamp: new Date().toISOString()
      };
      
      console.log("Sending email verification for investment:", investmentData);
      
      // Send email using EmailJS
      const emailParams = {
        to_email: 'info@noisai.tech',
        from_name: 'NOISAI Investment Platform',
        subject: 'New Investment Interest',
        investor_name: data.email,
        investment_name: selectedInvestment?.name,
        investment_amount: `$${Number(data.amount).toLocaleString()}`,
        message: `A new investment request has been submitted for ${selectedInvestment?.name}. 
                 Amount: $${Number(data.amount).toLocaleString()}
                 Investor Email: ${data.email}
                 Date: ${new Date().toLocaleDateString()}
                 Time: ${new Date().toLocaleTimeString()}`
      };
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailParams
      );
      
      setEmailSent(true);
      
      toast({
        title: "Investment Request Submitted",
        description: "Your investment request has been sent to info@noisai.tech for review.",
      });
      
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting investment:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your investment request. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>Current Investment Opportunities</CardTitle>
        <CardDescription>Available NOISAI investment rounds</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Progress</TableHead>
              <TableHead className="text-gray-400">End Date</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvestments.map(investment => (
              <TableRow key={investment.id} className="border-gray-800">
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{investment.name}</span>
                    <span className="text-xs text-gray-400">Target: ${investment.target.toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                    <span className="text-yellow-500">
                      Running
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-full space-y-1">
                    <Progress 
                      value={(investment.raised / investment.target) * 100} 
                      className="h-2 bg-gray-800" 
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>${investment.raised.toLocaleString()} raised</span>
                      <span>{Math.round((investment.raised / investment.target) * 100)}%</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{investment.endDate}</TableCell>
                <TableCell>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-[#22C55E] border-gray-800 hover:bg-gray-800"
                        onClick={() => setSelectedInvestment(investment)}
                      >
                        <DollarSign className="w-4 h-4 mr-1" />
                        Invest Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border border-gray-800">
                      <DialogHeader>
                        <DialogTitle className="text-white">Invest in {selectedInvestment?.name}</DialogTitle>
                        <DialogDescription>
                          Enter your investment details to participate in this funding round.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleInvest)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Investment Amount ($)</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="number" 
                                    min="10000"
                                    placeholder="10000" 
                                    className="bg-gray-800 border-gray-700 text-white"
                                  />
                                </FormControl>
                                <FormDescription className="text-gray-400">
                                  Minimum investment is $10,000
                                </FormDescription>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Your Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    className="bg-gray-800 border-gray-700 text-white"
                                  />
                                </FormControl>
                                <FormDescription className="text-gray-400">
                                  We'll use this email to contact you about your investment
                                </FormDescription>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />
                          
                          <div className="pt-4 text-sm text-gray-400">
                            <p>By submitting this form, your investment request will be sent to info@noisai.tech for review.</p>
                            <p className="mt-2">Our team will contact you with next steps for completing your investment.</p>
                          </div>
                          
                          <DialogFooter className="pt-4">
                            <Button 
                              type="button"
                              variant="outline" 
                              className="text-gray-400 border-gray-800 hover:bg-gray-800"
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              type="submit"
                              disabled={isSubmitting}
                              className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-black"
                            >
                              {isSubmitting ? "Submitting..." : "Submit Interest"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InvestmentsList;
