
import { Interaction } from '@/types/admin';

// Sample mock data for fallback
export const mockInteractions: Interaction[] = [
  {
    id: 'mock-1',
    investor_id: 'mock-investor-1',
    investor_name: 'John Doe',
    type: 'Call',
    date: '2025-04-25T10:00:00Z',
    notes: 'Discussed investment opportunities',
    follow_up: '2025-05-05T14:00:00Z',
    created_at: '2025-04-25T10:30:00Z'
  },
  {
    id: 'mock-2',
    investor_id: 'mock-investor-2',
    investor_name: 'Jane Smith',
    type: 'Email',
    date: '2025-04-22T15:30:00Z',
    notes: 'Sent investment proposal',
    follow_up: null,
    created_at: '2025-04-22T16:00:00Z'
  },
  {
    id: 'mock-3',
    investor_id: 'mock-investor-1',
    investor_name: 'John Doe',
    type: 'Meeting',
    date: '2025-04-20T09:00:00Z',
    notes: 'Initial consultation',
    follow_up: '2025-04-25T10:00:00Z',
    created_at: '2025-04-20T10:30:00Z'
  }
];
