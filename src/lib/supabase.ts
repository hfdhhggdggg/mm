import { createClient } from '@supabase/supabase-js';

// استخدام قيم افتراضية إذا لم تكن متغيرات البيئة متوفرة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Database types
export interface Database {
  public: {
    Tables: {
      cars: {
        Row: {
          id: string;
          brand: string;
          model: string;
          year: number;
          price: number;
          status: 'available' | 'sold' | 'reserved';
          views: number;
          inquiries: number;
          images: string[];
          main_image_index: number;
          fuel: string;
          transmission: string;
          mileage: string;
          rating: number;
          features: string[];
          description: string | null;
          warranty: string;
          inspection: string;
          financing: boolean;
          exchange: boolean;
          maintenance: boolean;
          support247: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          brand: string;
          model: string;
          year: number;
          price: number;
          status?: 'available' | 'sold' | 'reserved';
          views?: number;
          inquiries?: number;
          images?: string[];
          main_image_index?: number;
          fuel: string;
          transmission: string;
          mileage?: string;
          rating?: number;
          features?: string[];
          description?: string | null;
          warranty?: string;
          inspection?: string;
          financing?: boolean;
          exchange?: boolean;
          maintenance?: boolean;
          support247?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          brand?: string;
          model?: string;
          year?: number;
          price?: number;
          status?: 'available' | 'sold' | 'reserved';
          views?: number;
          inquiries?: number;
          images?: string[];
          main_image_index?: number;
          fuel?: string;
          transmission?: string;
          mileage?: string;
          rating?: number;
          features?: string[];
          description?: string | null;
          warranty?: string;
          inspection?: string;
          financing?: boolean;
          exchange?: boolean;
          maintenance?: boolean;
          support247?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      website_analytics: {
        Row: {
          id: string;
          visitor_id: string;
          page_url: string;
          page_title: string | null;
          referrer: string | null;
          user_agent: string | null;
          ip_address: string | null;
          country: string | null;
          city: string | null;
          device_type: string | null;
          browser: string | null;
          os: string | null;
          session_duration: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          visitor_id: string;
          page_url: string;
          page_title?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
          ip_address?: string | null;
          country?: string | null;
          city?: string | null;
          device_type?: string | null;
          browser?: string | null;
          os?: string | null;
          session_duration?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          visitor_id?: string;
          page_url?: string;
          page_title?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
          ip_address?: string | null;
          country?: string | null;
          city?: string | null;
          device_type?: string | null;
          browser?: string | null;
          os?: string | null;
          session_duration?: number;
          created_at?: string;
        };
      };
      daily_stats: {
        Row: {
          id: string;
          date: string;
          total_visitors: number;
          unique_visitors: number;
          page_views: number;
          bounce_rate: number;
          avg_session_duration: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          total_visitors?: number;
          unique_visitors?: number;
          page_views?: number;
          bounce_rate?: number;
          avg_session_duration?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          date?: string;
          total_visitors?: number;
          unique_visitors?: number;
          page_views?: number;
          bounce_rate?: number;
          avg_session_duration?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      car_requests: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string | null;
          car_brand: string | null;
          car_model: string | null;
          year: string | null;
          budget: string | null;
          fuel_type: string | null;
          transmission: string | null;
          color: string | null;
          features: string[];
          notes: string | null;
          urgency: 'normal' | 'urgent' | 'flexible';
          status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email?: string | null;
          car_brand?: string | null;
          car_model?: string | null;
          year?: string | null;
          budget?: string | null;
          fuel_type?: string | null;
          transmission?: string | null;
          color?: string | null;
          features?: string[];
          notes?: string | null;
          urgency?: 'normal' | 'urgent' | 'flexible';
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          email?: string | null;
          car_brand?: string | null;
          car_model?: string | null;
          year?: string | null;
          budget?: string | null;
          fuel_type?: string | null;
          transmission?: string | null;
          color?: string | null;
          features?: string[];
          notes?: string | null;
          urgency?: 'normal' | 'urgent' | 'flexible';
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string | null;
          subject: string;
          message: string;
          status: 'unread' | 'read' | 'replied';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email?: string | null;
          subject: string;
          message: string;
          status?: 'unread' | 'read' | 'replied';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          email?: string | null;
          subject?: string;
          message?: string;
          status?: 'unread' | 'read' | 'replied';
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          location: string;
          rating: number;
          text: string;
          car: string | null;
          image: string | null;
          is_featured: boolean;
          is_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          location: string;
          rating: number;
          text: string;
          car?: string | null;
          image?: string | null;
          is_featured?: boolean;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          location?: string;
          rating?: number;
          text?: string;
          car?: string | null;
          image?: string | null;
          is_featured?: boolean;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}