
import { Investor, Interaction, Investment } from '@/types/admin';

// Search investors
export const searchInvestors = (investors: Investor[], query: string): Investor[] => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return investors;
  
  return investors.filter(investor => 
    investor.name.toLowerCase().includes(normalizedQuery) ||
    investor.email.toLowerCase().includes(normalizedQuery)
  );
};

// Search interactions
export const searchInteractions = (interactions: Interaction[], query: string): Interaction[] => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return interactions;
  
  return interactions.filter(interaction => 
    interaction.investor_name.toLowerCase().includes(normalizedQuery) ||
    interaction.type.toLowerCase().includes(normalizedQuery) ||
    interaction.notes.toLowerCase().includes(normalizedQuery)
  );
};

// Search investments
export const searchInvestments = (investments: Investment[], query: string): Investment[] => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return investments;
  
  return investments.filter(investment => 
    investment.investor_name.toLowerCase().includes(normalizedQuery) ||
    investment.type.toLowerCase().includes(normalizedQuery) ||
    investment.amount.toString().includes(normalizedQuery)
  );
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// Calculate growth percentage
export const calculateGrowthPercentage = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};
