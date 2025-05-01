
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
      
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching reports:", error);
        toast({
          title: 'Using Demo Mode',
          description: 'Connected to sample report data.',
        });
        setReports(mockReports);
      } else {
        setReports(data as Report[]);
      }
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

      // This would connect to a server function in a real app
      // For now, we'll simulate report generation
      let newReport: Report;
      
      try {
        const { data, error } = await supabase
          .from('reports')
          .insert([{
            name: `${type} Report - ${new Date().toLocaleDateString()}`,
            type,
            created_at: new Date().toISOString(),
            file_url: null // In a real app, this would be updated with the actual file URL
          }])
          .select();
        
        if (error) throw error;
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Update with fake file URL
        const { data: updatedData, error: updateError } = await supabase
          .from('reports')
          .update({
            file_url: `https://example.com/reports/${type.toLowerCase()}-${Date.now()}.pdf`
          })
          .eq('id', data[0].id)
          .select();
        
        if (updateError) throw updateError;
        
        newReport = updatedData![0] as Report;
      } catch (err) {
        // If database operations fail, create a mock report
        console.error("Database error during report generation:", err);
        
        const mockReportId = `report-${Date.now()}`;
        newReport = {
          id: mockReportId,
          name: `${type} Report - ${new Date().toLocaleDateString()}`,
          type,
          created_at: new Date().toISOString(),
          file_url: `https://example.com/reports/${type.toLowerCase()}-${Date.now()}.pdf`
        };
        
        // Simulate processing time for consistency
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
          title: 'Demo Mode',
          description: 'Generated a mock report since database is not available.',
        });
      }
      
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
