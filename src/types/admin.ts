
export interface Investor {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  total_invested: number;
  last_interaction: string;
  created_at: string;
  investor_type?: string;
}

export interface Interaction {
  id: string;
  investor_id: string;
  investor_name: string;
  type: 'Call' | 'Email' | 'Meeting';
  date: string;
  notes: string;
  follow_up: string | null;
  created_at: string;
}

export interface Investment {
  id: string;
  investor_id: string;
  investor_name: string;
  amount: number;
  date: string;
  type: string;
  status: 'Completed' | 'Processing' | 'Cancelled';
  created_at: string;
}

export interface Report {
  id: string;
  name: string;
  type: string;
  created_at: string;
  file_url: string | null;
}
