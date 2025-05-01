
import { useEffect, useState } from "react";
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
import { formatDate } from "@/utils/adminUtils";
import { useInteractions } from "@/hooks/useInteractions";
import { Interaction } from "@/types/admin";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const InteractionHistory = () => {
  const { interactions: allInteractions, loading } = useInteractions();
  const [userInteractions, setUserInteractions] = useState<Interaction[]>([]);
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  // Get current user's ID
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      }
    };

    getCurrentUser();
  }, []);

  // Filter interactions for the current user
  useEffect(() => {
    if (userId) {
      const filtered = allInteractions.filter(
        interaction => interaction.investor_id === userId
      );
      setUserInteractions(filtered);
    }
  }, [allInteractions, userId]);

  if (loading) {
    return (
      <Card className="bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle>Interaction History</CardTitle>
          <CardDescription>Loading your interactions...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-6 text-center bg-gray-800/50 rounded-md border border-gray-700">
            <p className="text-gray-400">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900 border border-gray-800">
      <CardHeader>
        <CardTitle>Interaction History</CardTitle>
        <CardDescription>Record of past interactions with NOISAI</CardDescription>
      </CardHeader>
      <CardContent>
        {userInteractions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Type</TableHead>
                <TableHead className="text-gray-400">Notes</TableHead>
                <TableHead className="text-gray-400">Follow-up</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userInteractions.map(interaction => (
                <TableRow key={interaction.id} className="border-gray-800">
                  <TableCell>{formatDate(interaction.date)}</TableCell>
                  <TableCell>{interaction.type}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{interaction.notes}</TableCell>
                  <TableCell>
                    {interaction.follow_up ? (
                      <span className="text-yellow-500">
                        {formatDate(interaction.follow_up)}
                      </span>
                    ) : (
                      <span className="text-gray-500">None</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-6 text-center bg-gray-800/50 rounded-md border border-gray-700">
            <p className="text-gray-400">No interaction history found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractionHistory;
