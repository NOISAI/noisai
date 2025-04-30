
import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, Phone, Mail, Calendar, Clock, UserCircle, Edit, Trash2  
} from "lucide-react";

// Mock data for interactions
const mockInteractions = [
  { 
    id: 1, 
    investorName: "John Doe", 
    type: "Call", 
    date: "2025-04-25", 
    notes: "Discussed current investment opportunities", 
    followUp: "2025-05-02" 
  },
  { 
    id: 2, 
    investorName: "Jane Smith", 
    type: "Email", 
    date: "2025-04-24", 
    notes: "Sent investment prospectus", 
    followUp: "2025-04-28" 
  },
  { 
    id: 3, 
    investorName: "Emily Brown", 
    type: "Meeting", 
    date: "2025-04-22", 
    notes: "In-person meeting to review portfolio", 
    followUp: "2025-05-10" 
  },
  { 
    id: 4, 
    investorName: "David Wilson", 
    type: "Call", 
    date: "2025-04-20", 
    notes: "Quarterly check-in call", 
    followUp: "2025-07-20" 
  },
  { 
    id: 5, 
    investorName: "John Doe", 
    type: "Email", 
    date: "2025-04-18", 
    notes: "Responded to questions about seed round", 
    followUp: null 
  },
];

const InteractionTracking = () => {
  const [interactions] = useState(mockInteractions);
  
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
        <Button className="bg-[#22C55E] hover:bg-[#1ea853] text-black">
          <PlusCircle size={16} className="mr-1" /> Log Interaction
        </Button>
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
            {interactions.map((interaction) => (
              <TableRow key={interaction.id} className="bg-gray-900 hover:bg-gray-800">
                <TableCell>{interaction.investorName}</TableCell>
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
                    {interaction.date}
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{interaction.notes}</TableCell>
                <TableCell>
                  {interaction.followUp ? (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-yellow-500" />
                      {interaction.followUp}
                    </div>
                  ) : (
                    <span className="text-gray-500">None</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" className="h-8 w-8 p-0 mr-1">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" className="h-8 w-8 p-0 text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InteractionTracking;
