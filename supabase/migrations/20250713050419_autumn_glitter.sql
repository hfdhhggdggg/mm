/*
  # إنشاء جدول طلبات السيارات

  1. جداول جديدة
    - `car_requests`
      - `id` (uuid, primary key)
      - `name` (text) - اسم العميل
      - `phone` (text) - رقم الهاتف
      - `email` (text) - البريد الإلكتروني
      - `car_brand` (text) - الماركة المطلوبة
      - `car_model` (text) - الموديل المطلوب
      - `year` (text) - السنة المطلوبة
      - `budget` (text) - الميزانية
      - `fuel_type` (text) - نوع الوقود
      - `transmission` (text) - ناقل الحركة
      - `color` (text) - اللون المفضل
      - `features` (jsonb) - المميزات المطلوبة
      - `notes` (text) - ملاحظات إضافية
      - `urgency` (text) - مستوى الأولوية
      - `status` (text) - حالة الطلب
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. الأمان
    - تفعيل RLS على جدول `car_requests`
    - إضافة سياسات للكتابة العامة والقراءة للمدراء
*/

CREATE TABLE IF NOT EXISTS car_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  car_brand text,
  car_model text,
  year text,
  budget text,
  fuel_type text,
  transmission text,
  color text,
  features jsonb DEFAULT '[]'::jsonb,
  notes text,
  urgency text DEFAULT 'normal' CHECK (urgency IN ('normal', 'urgent', 'flexible')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- تفعيل Row Level Security
ALTER TABLE car_requests ENABLE ROW LEVEL SECURITY;

-- سياسة للكتابة العامة (إرسال طلبات جديدة)
CREATE POLICY "Anyone can create car requests"
  ON car_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- سياسة للقراءة والتحديث للمستخدمين المصرح لهم
CREATE POLICY "Authenticated users can manage car requests"
  ON car_requests
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- فهرس لتحسين الأداء
CREATE INDEX IF NOT EXISTS car_requests_status_idx ON car_requests(status);
CREATE INDEX IF NOT EXISTS car_requests_created_at_idx ON car_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS car_requests_urgency_idx ON car_requests(urgency);