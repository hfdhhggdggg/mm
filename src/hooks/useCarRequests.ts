import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && key && url !== 'https://placeholder.supabase.co' && key !== 'placeholder-key';
};

type CarRequest = Database['public']['Tables']['car_requests']['Row'];
type CarRequestInsert = Database['public']['Tables']['car_requests']['Insert'];
type CarRequestUpdate = Database['public']['Tables']['car_requests']['Update'];

export const useCarRequests = () => {
  const [requests, setRequests] = useState<CarRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // جلب جميع الطلبات
  const fetchRequests = async () => {
    try {
      setLoading(true);
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, using mock data');
        setRequests([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('car_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      console.warn('Error fetching requests:', err);
      setRequests([]);
      setError(err instanceof Error ? err.message : 'حدث خطأ في جلب الطلبات');
    } finally {
      setLoading(false);
    }
  };

  // إضافة طلب جديد
  const addRequest = async (requestData: CarRequestInsert) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, cannot add request');
        return;
      }

      const { data, error } = await supabase
        .from('car_requests')
        .insert([requestData])
        .select()
        .single();

      if (error) throw error;
      setRequests(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.warn('Error adding request:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في إرسال الطلب');
      throw err;
    }
  };

  // تحديث حالة الطلب
  const updateRequestStatus = async (id: string, status: CarRequest['status']) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, cannot update request');
        return;
      }

      const { data, error } = await supabase
        .from('car_requests')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setRequests(prev => prev.map(req => req.id === id ? data : req));
      return data;
    } catch (err) {
      console.warn('Error updating request:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحديث الطلب');
      throw err;
    }
  };

  // حذف طلب
  const deleteRequest = async (id: string) => {
    try {
      const { error } = await supabase
        .from('car_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setRequests(prev => prev.filter(req => req.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في حذف الطلب');
      throw err;
    }
  };

  // إحصائيات الطلبات
  const getRequestsStats = () => {
    const total = requests.length;
    const pending = requests.filter(req => req.status === 'pending').length;
    const inProgress = requests.filter(req => req.status === 'in_progress').length;
    const completed = requests.filter(req => req.status === 'completed').length;
    const urgent = requests.filter(req => req.urgency === 'urgent').length;

    return { total, pending, inProgress, completed, urgent };
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    fetchRequests,
    addRequest,
    updateRequestStatus,
    deleteRequest,
    getRequestsStats
  };
};