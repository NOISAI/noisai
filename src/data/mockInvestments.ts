
import { Investment } from '@/types/admin';

// Sample mock data for fallback
export const mockInvestments: Investment[] = [
  {
    id: 'mock-1',
    investor_id: 'mock-investor-1',
    investor_name: 'John Doe',
    amount: 50000,
    date: '2025-04-25',
    type: 'Seed Round',
    status: 'Completed',
    created_at: '2025-04-25T10:30:00Z'
  },
  {
    id: 'mock-2',
    investor_id: 'mock-investor-2',
    investor_name: 'Jane Smith',
    amount: 25000,
    date: '2025-04-22',
    type: 'Angel Investment',
    status: 'Processing',
    created_at: '2025-04-22T16:00:00Z'
  },
  {
    id: 'mock-3',
    investor_id: 'mock-investor-1',
    investor_name: 'John Doe',
    amount: 10000,
    date: '2025-04-20',
    type: 'Series A',
    status: 'Completed',
    created_at: '2025-04-20T10:30:00Z'
  }
];
