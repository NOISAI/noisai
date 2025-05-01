
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import ConfirmationDialog from "@/components/admin/shared/ConfirmationDialog";
import EmptyState from "@/components/admin/shared/EmptyState";
import LoadingIndicator from "@/components/admin/shared/LoadingIndicator";

type ProfileUpdateRequest = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  investor_type: string;
  tax_id: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
  updated_at?: string;
};

const ProfileRequests = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<ProfileUpdateRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ProfileUpdateRequest | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'approve' | 'reject'>('approve');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch profile update requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("profile_update_requests")
          .select("*")
          .order("requested_at", { ascending: false });

        if (error) {
          console.error("Error fetching profile requests:", error);
          toast({
            variant: "destructive",
            title: "Failed to load requests",
            description: error.message,
          });
          return;
        }

        setRequests(data as ProfileUpdateRequest[]);
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [toast]);

  // Handle request approval
  const approveRequest = async (request: ProfileUpdateRequest) => {
    setSelectedRequest(request);
    setConfirmAction('approve');
    setIsConfirmDialogOpen(true);
  };

  // Handle request rejection
  const rejectRequest = async (request: ProfileUpdateRequest) => {
    setSelectedRequest(request);
    setConfirmAction('reject');
    setIsConfirmDialogOpen(true);
  };

  // Confirm action (approve or reject)
  const handleConfirmAction = async () => {
    if (!selectedRequest) return;
    
    setIsSubmitting(true);
    
    try {
      if (confirmAction === 'approve') {
        // Update the user profile with the requested changes
        const { error: profileError } = await supabase
          .from("user_profiles")
          .update({
            full_name: selectedRequest.full_name,
            email: selectedRequest.email,
            investor_type: selectedRequest.investor_type,
            tax_id: selectedRequest.tax_id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", selectedRequest.user_id);

        if (profileError) {
          console.error("Error updating profile:", profileError);
          toast({
            variant: "destructive",
            title: "Failed to update profile",
            description: profileError.message,
          });
          return;
        }
      }

      // Update the request status
      const { error } = await supabase
        .from("profile_update_requests")
        .update({
          status: confirmAction === 'approve' ? 'approved' : 'rejected',
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedRequest.id);

      if (error) {
        console.error("Error updating request status:", error);
        toast({
          variant: "destructive",
          title: "Failed to update request",
          description: error.message,
        });
        return;
      }

      // Update the local state
      setRequests(prev =>
        prev.map(req =>
          req.id === selectedRequest.id
            ? { ...req, status: confirmAction === 'approve' ? 'approved' : 'rejected' }
            : req
        )
      );

      toast({
        title: confirmAction === 'approve' ? "Request Approved" : "Request Rejected",
        description: confirmAction === 'approve'
          ? "The profile has been updated successfully."
          : "The profile update request has been rejected.",
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        variant: "destructive",
        title: "Action Failed",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
      setIsConfirmDialogOpen(false);
    }
  };

  // Render based on loading state
  if (loading) {
    return <LoadingIndicator message="Loading profile update requests..." />;
  }

  // Render empty state if no requests
  if (requests.length === 0) {
    return (
      <EmptyState 
        title="No Profile Update Requests" 
        description="There are currently no pending profile update requests."
        icon={<Info className="h-12 w-12 text-gray-400" />}
      />
    );
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle>Profile Update Requests</CardTitle>
        <CardDescription>
          Review and manage investor profile update requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-gray-800/50">
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Investor Type</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id} className="border-gray-800 hover:bg-gray-800/50">
                <TableCell className="font-medium">{request.full_name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell className="capitalize">{request.investor_type}</TableCell>
                <TableCell>
                  {new Date(request.requested_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {request.status === 'pending' && (
                    <span className="flex items-center text-amber-400">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Pending
                    </span>
                  )}
                  {request.status === 'approved' && (
                    <span className="flex items-center text-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approved
                    </span>
                  )}
                  {request.status === 'rejected' && (
                    <span className="flex items-center text-red-500">
                      <XCircle className="h-4 w-4 mr-1" />
                      Rejected
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {request.status === 'pending' && (
                    <div className="flex justify-end space-x-2">
                      <Button
                        onClick={() => approveRequest(request)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => rejectRequest(request)}
                        size="sm"
                        variant="destructive"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  {request.status !== 'pending' && (
                    <span className="text-gray-500 text-sm">
                      {request.status === 'approved' ? 'Approved' : 'Rejected'} on{' '}
                      {request.updated_at ? new Date(request.updated_at).toLocaleDateString() : 'N/A'}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <ConfirmationDialog
        title={`${confirmAction === 'approve' ? 'Approve' : 'Reject'} Profile Update`}
        description={
          confirmAction === 'approve'
            ? "Are you sure you want to approve this profile update request? The investor's profile will be updated with the new information."
            : "Are you sure you want to reject this profile update request? The investor will need to submit a new request if they want to update their profile."
        }
        isOpen={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        onConfirm={handleConfirmAction}
        onCancel={() => setIsConfirmDialogOpen(false)}
        isSubmitting={isSubmitting}
        confirmLabel={confirmAction === 'approve' ? "Approve" : "Reject"}
      />
    </Card>
  );
};

export default ProfileRequests;
