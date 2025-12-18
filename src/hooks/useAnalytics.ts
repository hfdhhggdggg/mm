import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AnalyticsData {
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
}

interface DailyStats {
  id: string;
  date: string;
  total_visitors: number;
  unique_visitors: number;
  page_views: number;
  bounce_rate: number;
  avg_session_duration: number;
  created_at: string;
  updated_at: string;
}

interface AnalyticsStats {
  todayVisitors: number;
  totalVisitors: number;
  pageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  visitorsByCountry: Array<{ country: string; visitors: number }>;
  dailyStats: DailyStats[];
  recentVisitors: AnalyticsData[];
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [stats, setStats] = useState<AnalyticsStats>({
    todayVisitors: 0,
    totalVisitors: 0,
    pageViews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: 0,
    topPages: [],
    visitorsByCountry: [],
    dailyStats: [],
    recentVisitors: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // تسجيل زيارة جديدة
  const trackVisit = async (data: {
    page_url: string;
    page_title?: string;
    referrer?: string;
  }) => {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder') || supabaseKey.includes('placeholder')) {
        console.warn('Supabase not configured - skipping analytics tracking');
        return;
      }

      // إنشاء معرف فريد للزائر
      let visitorId = localStorage.getItem('visitor_id');
      if (!visitorId) {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('visitor_id', visitorId);
      }

      // جمع معلومات المتصفح والجهاز
      const userAgent = navigator.userAgent;
      const deviceType = /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'mobile' : 'desktop';
      
      let browser = 'Unknown';
      if (userAgent.includes('Chrome')) browser = 'Chrome';
      else if (userAgent.includes('Firefox')) browser = 'Firefox';
      else if (userAgent.includes('Safari')) browser = 'Safari';
      else if (userAgent.includes('Edge')) browser = 'Edge';

      let os = 'Unknown';
      if (userAgent.includes('Windows')) os = 'Windows';
      else if (userAgent.includes('Mac')) os = 'macOS';
      else if (userAgent.includes('Linux')) os = 'Linux';
      else if (userAgent.includes('Android')) os = 'Android';
      else if (userAgent.includes('iOS')) os = 'iOS';

      const analyticsData = {
        visitor_id: visitorId,
        page_url: data.page_url,
        page_title: data.page_title || document.title,
        referrer: document.referrer || null,
        user_agent: userAgent,
        device_type: deviceType,
        browser: browser,
        os: os,
        country: 'Qatar', // يمكن تحسينها باستخدام IP geolocation
        city: 'Doha'
      };

      const { error } = await supabase
        .from('website_analytics')
        .insert([analyticsData]);

      if (error) throw error;

      // تحديث الإحصائيات اليومية
      await updateDailyStats();

    } catch (err) {
      console.error('Error tracking visit:', err);
    }
  };

  // تحديث مدة الجلسة
  const updateSessionDuration = async (duration: number) => {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder') || supabaseKey.includes('placeholder')) {
        return;
      }

      const visitorId = localStorage.getItem('visitor_id');
      if (!visitorId) return;

      // الحصول على آخر زيارة للمستخدم
      const { data: lastVisit } = await supabase
        .from('website_analytics')
        .select('id')
        .eq('visitor_id', visitorId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (lastVisit) {
        await supabase
          .from('website_analytics')
          .update({ session_duration: duration })
          .eq('id', lastVisit.id);
      }
    } catch (err) {
      console.error('Error updating session duration:', err);
    }
  };

  // تحديث الإحصائيات اليومية
  const updateDailyStats = async () => {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder') || supabaseKey.includes('placeholder')) {
        return;
      }

      const { error } = await supabase.rpc('update_daily_stats');
      if (error) throw error;
    } catch (err) {
      console.error('Error updating daily stats:', err);
    }
  };

  // جلب الإحصائيات
  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder') || supabaseKey.includes('placeholder')) {
        console.warn('Supabase not configured - using mock analytics data');
        setStats({
          todayVisitors: 0,
          totalVisitors: 0,
          pageViews: 0,
          uniqueVisitors: 0,
          avgSessionDuration: 0,
          topPages: [],
          visitorsByCountry: [],
          dailyStats: [],
          recentVisitors: []
        });
        setLoading(false);
        return;
      }

      // جلب جميع البيانات التحليلية
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('website_analytics')
        .select('*')
        .order('created_at', { ascending: false });

      if (analyticsError) throw analyticsError;

      // جلب الإحصائيات اليومية
      const { data: dailyStatsData, error: dailyError } = await supabase
        .from('daily_stats')
        .select('*')
        .order('date', { ascending: false })
        .limit(30);

      if (dailyError) throw dailyError;

      setAnalytics(analyticsData || []);

      // حساب الإحصائيات
      const today = new Date().toISOString().split('T')[0];
      const todayVisitors = analyticsData?.filter(item => 
        item.created_at.startsWith(today)
      ).length || 0;

      const uniqueVisitors = new Set(analyticsData?.map(item => item.visitor_id)).size;
      
      const totalVisitors = analyticsData?.length || 0;
      const pageViews = analyticsData?.length || 0;

      const avgSessionDuration = analyticsData?.reduce((sum, item) => 
        sum + (item.session_duration || 0), 0
      ) / (analyticsData?.length || 1);

      // أكثر الصفحات زيارة
      const pageViewsMap = new Map();
      analyticsData?.forEach(item => {
        const page = item.page_url;
        pageViewsMap.set(page, (pageViewsMap.get(page) || 0) + 1);
      });
      
      const topPages = Array.from(pageViewsMap.entries())
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      // الزوار حسب البلد
      const countryMap = new Map();
      analyticsData?.forEach(item => {
        const country = item.country || 'Unknown';
        countryMap.set(country, (countryMap.get(country) || 0) + 1);
      });

      const visitorsByCountry = Array.from(countryMap.entries())
        .map(([country, visitors]) => ({ country, visitors }))
        .sort((a, b) => b.visitors - a.visitors)
        .slice(0, 10);

      // آخر الزوار
      const recentVisitors = analyticsData?.slice(0, 10) || [];

      setStats({
        todayVisitors,
        totalVisitors,
        pageViews,
        uniqueVisitors,
        avgSessionDuration: Math.round(avgSessionDuration),
        topPages,
        visitorsByCountry,
        dailyStats: dailyStatsData || [],
        recentVisitors
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في جلب البيانات');
    } finally {
      setLoading(false);
    }
  };

  // جلب البيانات عند تحميل الهوك
  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    analytics,
    stats,
    loading,
    error,
    trackVisit,
    updateSessionDuration,
    fetchAnalytics,
    updateDailyStats
  };
};