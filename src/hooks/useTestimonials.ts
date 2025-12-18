import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && key && url !== 'https://placeholder.supabase.co' && key !== 'placeholder-key';
};

type Testimonial = Database['public']['Tables']['testimonials']['Row'];
type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert'];
type TestimonialUpdate = Database['public']['Tables']['testimonials']['Update'];

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // جلب التقييمات المعتمدة للعرض العام
  const fetchApprovedTestimonials = async () => {
    try {
      setLoading(true);
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, using mock data');
        setTestimonials([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      console.warn('Error fetching testimonials:', err);
      setTestimonials([]);
      setError(err instanceof Error ? err.message : 'حدث خطأ في جلب التقييمات');
    } finally {
      setLoading(false);
    }
  };

  // جلب جميع التقييمات (للإدارة)
  const fetchAllTestimonials = async () => {
    try {
      setLoading(true);
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, using mock data');
        setTestimonials([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      console.warn('Error fetching testimonials:', err);
      setTestimonials([]);
      setError(err instanceof Error ? err.message : 'حدث خطأ في جلب التقييمات');
    } finally {
      setLoading(false);
    }
  };

  // إضافة تقييم جديد
  const addTestimonial = async (testimonialData: TestimonialInsert) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, cannot add testimonial');
        return;
      }

      const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonialData])
        .select()
        .single();

      if (error) throw error;
      setTestimonials(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.warn('Error adding testimonial:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في إضافة التقييم');
      throw err;
    }
  };

  // تحديث تقييم
  const updateTestimonial = async (id: string, updates: TestimonialUpdate) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, cannot update testimonial');
        return;
      }

      const { data, error } = await supabase
        .from('testimonials')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTestimonials(prev => prev.map(test => test.id === id ? data : test));
      return data;
    } catch (err) {
      console.warn('Error updating testimonial:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحديث التقييم');
      throw err;
    }
  };

  // حذف تقييم
  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTestimonials(prev => prev.filter(test => test.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في حذف التقييم');
      throw err;
    }
  };

  // الموافقة على تقييم
  const approveTestimonial = async (id: string) => {
    return updateTestimonial(id, { is_approved: true });
  };

  // جعل التقييم مميز
  const toggleFeatured = async (id: string, featured: boolean) => {
    return updateTestimonial(id, { is_featured: featured });
  };

  // جلب التقييمات المميزة
  const getFeaturedTestimonials = () => {
    return testimonials.filter(test => test.is_featured && test.is_approved);
  };

  // إحصائيات التقييمات
  const getTestimonialsStats = () => {
    const total = testimonials.length;
    const approved = testimonials.filter(test => test.is_approved).length;
    const pending = testimonials.filter(test => !test.is_approved).length;
    const featured = testimonials.filter(test => test.is_featured).length;
    const avgRating = testimonials.length > 0 
      ? testimonials.reduce((sum, test) => sum + test.rating, 0) / testimonials.length 
      : 0;

    return { total, approved, pending, featured, avgRating };
  };

  useEffect(() => {
    fetchApprovedTestimonials();
  }, []);

  return {
    testimonials,
    loading,
    error,
    fetchApprovedTestimonials,
    fetchAllTestimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    approveTestimonial,
    toggleFeatured,
    getFeaturedTestimonials,
    getTestimonialsStats
  };
};