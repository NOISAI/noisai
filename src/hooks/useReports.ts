
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Report } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';
import { useInvestors } from './useInvestors';
import { useInteractions } from './useInteractions';
import { useInvestments } from './useInvestments';
import { mockReports } from '@/data/mockReports';

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const { investors } = useInvestors();
  const { interactions } = useInteractions();
  const { investments } = useInvestments();

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Since there's no "reports" table yet in our Supabase schema,
      // we'll use the mock data directly for now
      setReports(mockReports);
      
      // In the future, when you create a reports table in Supabase:
      /* 
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setReports(data as Report[]);
      */
      
      // Show toast for clarity
      toast({
        title: 'Using Demo Mode',
        description: 'Connected to sample report data.',
      });
      
    } catch (err: any) {
      console.error("Failed to fetch reports:", err);
      setError(err.message);
      toast({
        title: 'Error',
        description: `Failed to load reports. Using demo data instead.`,
        variant: 'destructive',
      });
      setReports(mockReports);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (type: string) => {
    try {
      setGenerating(true);

      // Generate a mock report since we don't have a reports table yet
      const mockReportId = `report-${Date.now()}`;
      const newReport: Report = {
        id: mockReportId,
        name: `${type} Report - ${new Date().toLocaleDateString()}`,
        type,
        created_at: new Date().toISOString(),
        file_url: `https://example.com/reports/${type.toLowerCase()}-${Date.now()}.pdf`
      };
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local state
      setReports(prev => [newReport, ...prev]);
      
      toast({
        title: 'Success',
        description: `${type} report generated successfully`,
      });
      
      return newReport;
    } catch (err: any) {
      toast({
        title: 'Error',
        description: `Failed to generate report: ${err.message}`,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports,
    loading,
    generating,
    error,
    fetchReports,
    generateReport
  };
};
