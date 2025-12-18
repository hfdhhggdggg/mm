import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && key && url !== 'https://placeholder.supabase.co' && key !== 'placeholder-key';
};

type Car = Database['public']['Tables']['cars']['Row'];
type CarInsert = Database['public']['Tables']['cars']['Insert'];
type CarUpdate = Database['public']['Tables']['cars']['Update'];

export const useCarsDatabase = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // جلب جميع السيارات
  const fetchCars = async () => {
    try {
      setLoading(true);
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, using mock data');
        setCars([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (err) {
      console.warn('Error fetching cars:', err);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // إضافة سيارة جديدة
  const addCar = async (carData: CarInsert) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, cannot add car');
        return;
      }

      const { data, error } = await supabase
        .from('cars')
        .insert([carData])
        .select()
        .single();

      if (error) throw error;
      setCars(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.warn('Error adding car:', err);
      throw err;
    }
  };

  // تحديث سيارة
  const updateCar = async (id: string, updates: CarUpdate) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, cannot update car');
        return;
      }

      const { data, error } = await supabase
        .from('cars')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setCars(prev => prev.map(car => car.id === id ? data : car));
      return data;
    } catch (err) {
      console.warn('Error updating car:', err);
      throw err;
    }
  };

  // حذف سيارة
  const deleteCar = async (id: string) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, cannot delete car');
        return;
      }

      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setCars(prev => prev.filter(car => car.id !== id));
    } catch (err) {
      console.warn('Error deleting car:', err);
      throw err;
    }
  };

  // زيادة عدد المشاهدات
  const incrementViews = async (id: string) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, cannot increment views');
        return;
      }

      const car = cars.find(c => c.id === id);
      if (!car) return;

      const { error } = await supabase
        .from('cars')
        .update({ views: car.views + 1, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      setCars(prev => prev.map(c => c.id === id ? { ...c, views: c.views + 1 } : c));
    } catch (err) {
      console.warn('Error incrementing views:', err);
    }
  };

  // زيادة عدد الاستفسارات
  const incrementInquiries = async (id: string) => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, cannot increment inquiries');
        return;
      }

      const car = cars.find(c => c.id === id);
      if (!car) return;

      const { error } = await supabase
        .from('cars')
        .update({ inquiries: car.inquiries + 1, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      setCars(prev => prev.map(c => c.id === id ? { ...c, inquiries: c.inquiries + 1 } : c));
    } catch (err) {
      console.warn('Error incrementing inquiries:', err);
    }
  };

  // جلب السيارات المتاحة فقط
  const getAvailableCars = () => {
    return cars.filter(car => car.status === 'available');
  };

  // البحث في السيارات
  const searchCars = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return cars.filter(car => 
      car.brand.toLowerCase().includes(lowercaseQuery) ||
      car.model.toLowerCase().includes(lowercaseQuery) ||
      car.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
    );
  };

  // فلترة السيارات
  const filterCars = (filters: {
    brand?: string;
    fuel?: string;
    minPrice?: number;
    maxPrice?: number;
    minYear?: number;
    maxYear?: number;
    status?: string;
  }) => {
    return cars.filter(car => {
      if (filters.brand && car.brand !== filters.brand) return false;
      if (filters.fuel && car.fuel !== filters.fuel) return false;
      if (filters.minPrice && car.price < filters.minPrice) return false;
      if (filters.maxPrice && car.price > filters.maxPrice) return false;
      if (filters.minYear && car.year < filters.minYear) return false;
      if (filters.maxYear && car.year > filters.maxYear) return false;
      if (filters.status && car.status !== filters.status) return false;
      return true;
    });
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return {
    cars,
    loading,
    error,
    fetchCars,
    addCar,
    updateCar,
    deleteCar,
    incrementViews,
    incrementInquiries,
    getAvailableCars,
    searchCars,
    filterCars
  };
};