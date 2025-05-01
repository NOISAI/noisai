
import { Report } from '@/types/admin';

// Sample mock data for fallback
export const mockReports: Report[] = [
  {
    id: 'report-1',
    name: 'Investor Activity Report - 2025 Q1',
    type: 'Investor Activity',
    created_at: '2025-04-20T14:00:00Z',
    file_url: 'https://example.com/reports/investor-activity-q1-2025.pdf'
  },
  {
    id: 'report-2',
    name: 'Investment Performance Report - 2025 Q1',
    type: 'Investment Performance',
    created_at: '2025-04-15T11:30:00Z',
    file_url: 'https://example.com/reports/investment-performance-q1-2025.pdf'
  },
  {
    id: 'report-3',
    name: 'Quarterly Summary - 2025 Q1',
    type: 'Quarterly Summary',
    created_at: '2025-04-05T09:15:00Z',
    file_url: 'https://example.com/reports/quarterly-summary-q1-2025.pdf'
  }
];
