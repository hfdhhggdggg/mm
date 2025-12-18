/*
  # إنشاء جدول آراء العملاء

  1. جداول جديدة
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text) - اسم العميل
      - `location` (text) - الموقع
      - `rating` (integer) - التقييم
      - `text` (text) - نص التقييم
      - `car` (text) - السيارة المشتراة
      - `image` (text) - صورة العميل
      - `is_featured` (boolean) - مميز أم لا
      - `is_approved` (boolean) - موافق عليه أم لا
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. الأمان
    - تفعيل RLS على جدول `testimonials`
    - إضافة سياسات للقراءة العامة للمعتمدة والكتابة للمدراء
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL,
  car text,
  image text,
  is_featured boolean DEFAULT false,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- تفعيل Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- سياسة للقراءة العامة للتقييمات المعتمدة
CREATE POLICY "Anyone can read approved testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (is_approved = true);

-- سياسة للكتابة العامة (إرسال تقييمات جديدة)
CREATE POLICY "Anyone can create testimonials"
  ON testimonials
  FOR INSERT
  TO public
  WITH CHECK (true);

-- سياسة للإدارة الكاملة للمستخدمين المصرح لهم
CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- فهرس لتحسين الأداء
CREATE INDEX IF NOT EXISTS testimonials_approved_idx ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS testimonials_featured_idx ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS testimonials_created_at_idx ON testimonials(created_at DESC);