/*
  # إنشاء جداول التحليلات والإحصائيات

  1. جداول جديدة
    - `website_analytics`
      - `id` (uuid, primary key)
      - `visitor_id` (text) - معرف الزائر الفريد
      - `page_url` (text) - رابط الصفحة
      - `page_title` (text) - عنوان الصفحة
      - `referrer` (text) - المصدر
      - `user_agent` (text) - معلومات المتصفح
      - `ip_address` (text) - عنوان IP
      - `country` (text) - البلد
      - `city` (text) - المدينة
      - `device_type` (text) - نوع الجهاز
      - `browser` (text) - المتصفح
      - `os` (text) - نظام التشغيل
      - `session_duration` (integer) - مدة الجلسة بالثواني
      - `created_at` (timestamptz)

    - `daily_stats`
      - `id` (uuid, primary key)
      - `date` (date) - التاريخ
      - `total_visitors` (integer) - إجمالي الزوار
      - `unique_visitors` (integer) - الزوار الفريدون
      - `page_views` (integer) - مشاهدات الصفحات
      - `bounce_rate` (numeric) - معدل الارتداد
      - `avg_session_duration` (numeric) - متوسط مدة الجلسة
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. الأمان
    - تفعيل RLS على الجداول
    - إضافة سياسات مناسبة
*/

-- جدول تحليلات الموقع
CREATE TABLE IF NOT EXISTS website_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL,
  page_url text NOT NULL,
  page_title text,
  referrer text,
  user_agent text,
  ip_address text,
  country text,
  city text,
  device_type text,
  browser text,
  os text,
  session_duration integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- جدول الإحصائيات اليومية
CREATE TABLE IF NOT EXISTS daily_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE NOT NULL,
  total_visitors integer DEFAULT 0,
  unique_visitors integer DEFAULT 0,
  page_views integer DEFAULT 0,
  bounce_rate numeric DEFAULT 0,
  avg_session_duration numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- تفعيل Row Level Security
ALTER TABLE website_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

-- سياسات للكتابة العامة (تسجيل الزيارات)
CREATE POLICY "Anyone can create analytics entries"
  ON website_analytics
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can create daily stats"
  ON daily_stats
  FOR INSERT
  TO public
  WITH CHECK (true);

-- سياسات للقراءة والتحديث للمستخدمين المصرح لهم
CREATE POLICY "Authenticated users can read analytics"
  ON website_analytics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage daily stats"
  ON daily_stats
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS analytics_visitor_id_idx ON website_analytics(visitor_id);
CREATE INDEX IF NOT EXISTS analytics_created_at_idx ON website_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS analytics_page_url_idx ON website_analytics(page_url);
CREATE INDEX IF NOT EXISTS daily_stats_date_idx ON daily_stats(date DESC);

-- دالة لتحديث الإحصائيات اليومية
CREATE OR REPLACE FUNCTION update_daily_stats()
RETURNS void AS $$
DECLARE
  today_date date := CURRENT_DATE;
  total_visitors_count integer;
  unique_visitors_count integer;
  page_views_count integer;
  avg_duration numeric;
BEGIN
  -- حساب الإحصائيات لليوم الحالي
  SELECT 
    COUNT(*) as total,
    COUNT(DISTINCT visitor_id) as unique_count,
    COUNT(*) as page_views,
    AVG(session_duration) as avg_dur
  INTO 
    total_visitors_count,
    unique_visitors_count, 
    page_views_count,
    avg_duration
  FROM website_analytics 
  WHERE DATE(created_at) = today_date;

  -- إدراج أو تحديث الإحصائيات اليومية
  INSERT INTO daily_stats (
    date, 
    total_visitors, 
    unique_visitors, 
    page_views, 
    avg_session_duration,
    updated_at
  ) VALUES (
    today_date,
    total_visitors_count,
    unique_visitors_count,
    page_views_count,
    COALESCE(avg_duration, 0),
    now()
  )
  ON CONFLICT (date) 
  DO UPDATE SET
    total_visitors = EXCLUDED.total_visitors,
    unique_visitors = EXCLUDED.unique_visitors,
    page_views = EXCLUDED.page_views,
    avg_session_duration = EXCLUDED.avg_session_duration,
    updated_at = now();
END;
$$ LANGUAGE plpgsql;