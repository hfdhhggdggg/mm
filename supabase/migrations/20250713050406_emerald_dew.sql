/*
  # إنشاء جدول السيارات

  1. جداول جديدة
    - `cars`
      - `id` (uuid, primary key)
      - `brand` (text) - الماركة
      - `model` (text) - الموديل
      - `year` (integer) - سنة الصنع
      - `price` (numeric) - السعر
      - `status` (text) - الحالة (available, sold, reserved)
      - `views` (integer) - عدد المشاهدات
      - `inquiries` (integer) - عدد الاستفسارات
      - `images` (jsonb) - صور السيارة
      - `main_image_index` (integer) - فهرس الصورة الرئيسية
      - `fuel` (text) - نوع الوقود
      - `transmission` (text) - ناقل الحركة
      - `mileage` (text) - المسافة المقطوعة
      - `rating` (numeric) - التقييم
      - `features` (jsonb) - المميزات
      - `description` (text) - الوصف
      - `warranty` (text) - الضمان
      - `inspection` (text) - الفحص
      - `financing` (boolean) - التمويل
      - `exchange` (boolean) - الاستبدال
      - `maintenance` (boolean) - الصيانة
      - `support247` (boolean) - الدعم 24/7
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. الأمان
    - تفعيل RLS على جدول `cars`
    - إضافة سياسات للقراءة العامة والكتابة للمدراء
*/

CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price numeric NOT NULL,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
  views integer DEFAULT 0,
  inquiries integer DEFAULT 0,
  images jsonb DEFAULT '[]'::jsonb,
  main_image_index integer DEFAULT 0,
  fuel text NOT NULL,
  transmission text NOT NULL,
  mileage text DEFAULT '0 كم',
  rating numeric DEFAULT 4.5 CHECK (rating >= 0 AND rating <= 5),
  features jsonb DEFAULT '[]'::jsonb,
  description text,
  warranty text DEFAULT 'سنتين أو 100,000 كم',
  inspection text DEFAULT '142 نقطة فحص',
  financing boolean DEFAULT true,
  exchange boolean DEFAULT true,
  maintenance boolean DEFAULT true,
  support247 boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- تفعيل Row Level Security
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- سياسة للقراءة العامة
CREATE POLICY "Anyone can read cars"
  ON cars
  FOR SELECT
  TO public
  USING (true);

-- سياسة للكتابة للمستخدمين المصرح لهم
CREATE POLICY "Authenticated users can manage cars"
  ON cars
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- فهرس لتحسين الأداء
CREATE INDEX IF NOT EXISTS cars_status_idx ON cars(status);
CREATE INDEX IF NOT EXISTS cars_brand_idx ON cars(brand);
CREATE INDEX IF NOT EXISTS cars_created_at_idx ON cars(created_at DESC);