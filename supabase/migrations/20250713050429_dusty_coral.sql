/*
  # إنشاء جدول رسائل التواصل

  1. جداول جديدة
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text) - اسم المرسل
      - `phone` (text) - رقم الهاتف
      - `email` (text) - البريد الإلكتروني
      - `subject` (text) - موضوع الرسالة
      - `message` (text) - نص الرسالة
      - `status` (text) - حالة الرسالة
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. الأمان
    - تفعيل RLS على جدول `contact_messages`
    - إضافة سياسات للكتابة العامة والقراءة للمدراء
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- تفعيل Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- سياسة للكتابة العامة (إرسال رسائل جديدة)
CREATE POLICY "Anyone can create contact messages"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- سياسة للقراءة والتحديث للمستخدمين المصرح لهم
CREATE POLICY "Authenticated users can manage contact messages"
  ON contact_messages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- فهرس لتحسين الأداء
CREATE INDEX IF NOT EXISTS contact_messages_status_idx ON contact_messages(status);
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages(created_at DESC);