
import { Investor } from "@/types/admin";

// Mock data for fallback or development
export const mockInvestors: Investor[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    total_invested: 250000,
    last_interaction: "2025-04-25T09:30:00Z",
    created_at: "2025-01-15T08:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Active",
    total_invested: 500000,
    last_interaction: "2025-04-27T14:15:00Z",
    created_at: "2025-02-20T10:30:00Z",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    status: "Inactive",
    total_invested: 100000,
    last_interaction: "2025-03-10T16:45:00Z",
    created_at: "2025-03-05T09:15:00Z",
  }
];
