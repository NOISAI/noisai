
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Phone, Mail, UserCircle, Calendar, Clock } from "lucide-react";
import { Interaction } from "@/types/admin";
import { formatDate } from "@/utils/adminUtils";
import LoadingIndicator from "../shared/LoadingIndicator";
import EmptyState from "../shared/EmptyState";

interface InteractionTableProps {
  interactions: Interaction[];
  loading: boolean;
  searchQuery: string;
  onEdit: (interaction: Interaction) => void;
  onDelete: (interaction: Interaction) => void;
}

export default function InteractionTable({
  interactions,
  loading,
  searchQuery,
  onEdit,
  onDelete
}: InteractionTableProps) {
  if (loading) {
    return <LoadingIndicator message="Loading interactions..." />;
  }

  if (interactions.length === 0) {
    return <EmptyState 
      type="interactions" 
      isSearching={!!searchQuery}
      searchQuery={searchQuery}
    />;
  }

  const getIconForType = (type: string) => {
    switch(type) {
      case "Call": return <Phone className="h-4 w-4" />;
      case "Email": return <Mail className="h-4 w-4" />;
      case "Meeting": return <UserCircle className="h-4 w-4" />;
      default: return <UserCircle className="h-4 w-4" />;
    }
  };

  return (
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
          {interactions.map((interaction) => (
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
                  onClick={() => onEdit(interaction)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-red-500"
                  onClick={() => onDelete(interaction)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
