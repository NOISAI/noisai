
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Report } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';
import { useInvestors } from './useInvestors';
import { useInteractions } from './useInteractions';
import { useInvestments } from './useInvestments';

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
      
      if (error) throw error;
      
      setReports(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Error',
        description: `Failed to load reports: ${err.message}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (type: string) => {
    try {
      setGenerating(true);

      // This would connect to a server function in a real app
      // For now, we'll simulate report generation
      
      // Create report entry
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
      
      setReports(prev => [updatedData![0], ...prev]);
      
      toast({
        title: 'Success',
        description: `${type} report generated successfully`,
      });
      
      return updatedData?.[0];
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
