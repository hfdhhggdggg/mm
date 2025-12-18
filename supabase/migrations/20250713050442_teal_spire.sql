/*
  # إدراج البيانات الأولية للسيارات

  إدراج السيارات الموجودة حالياً في التطبيق إلى قاعدة البيانات
*/

INSERT INTO cars (
  brand, model, year, price, status, views, inquiries, images, main_image_index,
  fuel, transmission, mileage, rating, features, description, warranty, inspection,
  financing, exchange, maintenance, support247
) VALUES 
(
  'مرسيدس', 'C-Class 2024', 2024, 285000, 'available', 245, 12,
  '["https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg", "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg", "https://images.pexels.com/photos/1164778/pexels-photo-1164778.jpeg"]'::jsonb,
  0, 'بنزين', 'أوتوماتيك', '0 كم', 4.9,
  '["فتحة سقف", "جلد طبيعي", "شاشة ذكية", "نظام صوتي متطور"]'::jsonb,
  'سيارة مرسيدس C-Class 2024 بحالة ممتازة مع جميع المواصفات الفاخرة',
  'سنتين أو 100,000 كم', '142 نقطة فحص', true, true, true, true
),
(
  'BMW', 'X5 2023', 2023, 425000, 'available', 189, 8,
  '["https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg", "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg"]'::jsonb,
  0, 'هايبرد', 'أوتوماتيك', '15,000 كم', 4.8,
  '["دفع رباعي", "مقاعد جلد", "نظام ملاحة", "كاميرات 360"]'::jsonb,
  'BMW X5 2023 بحالة ممتازة مع دفع رباعي وجميع المواصفات الرياضية',
  'سنتين أو 100,000 كم', '142 نقطة فحص', true, true, true, true
),
(
  'أودي', 'A8 2024', 2024, 520000, 'available', 156, 15,
  '["https://images.pexels.com/photos/1164778/pexels-photo-1164778.jpeg", "https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg"]'::jsonb,
  0, 'بنزين', 'أوتوماتيك', '5,000 كم', 4.9,
  '["مقاعد مساج", "إضاءة LED", "نظام صوتي بوز", "قيادة ذاتية"]'::jsonb,
  'أودي A8 2024 سيارة فاخرة بأحدث التقنيات والمواصفات العالمية',
  'ثلاث سنوات أو 150,000 كم', '142 نقطة فحص', true, true, true, true
),
(
  'لكزس', 'LS 500 2023', 2023, 385000, 'reserved', 134, 6,
  '["https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg", "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg"]'::jsonb,
  0, 'هايبرد', 'أوتوماتيك', '8,000 كم', 4.7,
  '["راحة فائقة", "تحكم مناخي", "شحن لاسلكي", "نظام أمان متقدم"]'::jsonb,
  'لكزس LS 500 2023 سيارة فاخرة بتقنية هايبرد وراحة استثنائية',
  'سنتين أو 100,000 كم', '142 نقطة فحص', true, true, true, true
),
(
  'بورش', 'Cayenne 2024', 2024, 695000, 'available', 298, 22,
  '["https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg", "https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg"]'::jsonb,
  0, 'بنزين', 'أوتوماتيك', '2,000 كم', 4.9,
  '["أداء رياضي", "تصميم فاخر", "تقنيات متقدمة", "محرك قوي"]'::jsonb,
  'بورش Cayenne 2024 سيارة رياضية فاخرة بأداء استثنائي وتصميم مميز',
  'أربع سنوات أو 200,000 كم', '142 نقطة فحص', true, true, true, true
),
(
  'جاكوار', 'F-Pace 2023', 2023, 315000, 'available', 87, 4,
  '["https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg", "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg"]'::jsonb,
  0, 'بنزين', 'أوتوماتيك', '12,000 كم', 4.6,
  '["تصميم أنيق", "أداء متميز", "راحة عالية", "تقنيات ذكية"]'::jsonb,
  'جاكوار F-Pace 2023 سيارة أنيقة بتصميم بريطاني مميز وأداء رائع',
  'سنتين أو 100,000 كم', '142 نقطة فحص', true, true, true, true
),
(
  'تويوتا', 'كامري 2024', 2024, 165000, 'available', 167, 9,
  '["https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg", "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg"]'::jsonb,
  0, 'هايبرد', 'أوتوماتيك', '0 كم', 4.5,
  '["اقتصادية في الوقود", "موثوقية عالية", "مساحة واسعة", "تقنيات أمان"]'::jsonb,
  'تويوتا كامري 2024 سيارة عملية واقتصادية بتقنية هايبرد متطورة',
  'ثلاث سنوات أو 150,000 كم', '142 نقطة فحص', true, true, true, true
),
(
  'هوندا', 'أكورد 2023', 2023, 145000, 'available', 123, 7,
  '["https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg"]'::jsonb,
  0, 'بنزين', 'أوتوماتيك', '8,500 كم', 4.4,
  '["تصميم عصري", "اقتصادية", "صيانة سهلة", "راحة في القيادة"]'::jsonb,
  'هوندا أكورد 2023 سيارة موثوقة بتصميم عصري وأداء اقتصادي',
  'سنتين أو 100,000 كم', '142 نقطة فحص', true, true, true, true
);