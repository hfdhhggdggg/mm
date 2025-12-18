// ...existing code...
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'ar' | 'en';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    'footer.emailLabel': 'البريد الإلكتروني',
    // Header
    'header.title': 'معرض اللوفر للسيارات',
    'header.subtitle': 'أفضل السيارات في قطر',
    'header.home': 'الرئيسية',
    'header.cars': 'السيارات',
   
    'header.testimonials': 'آراء العملاء',
    'header.request': 'طلب سيارة',
    'header.contact': 'تواصل معنا',
    'header.cta': 'اطلب سيارتك الآن',
    
    // Hero Section
    'hero.title': 'اختر سيارتك',
    'hero.subtitle': 'وخل الباقي علينا',
    
    'hero.bestPrices': 'أفضل الأسعار',
    'hero.warranty': 'ضمان شامل',
    'hero.service': 'خدمة مميزة',
    'hero.browseCars': 'تصفح السيارات',
    'hero.contactUs': 'تواصل معنا',
    
  // (stats translations removed - section deleted)
    
    // Featured Cars
    'cars.title': 'السيارات المميزة',
    'cars.subtitle': 'اختر من مجموعتنا المختارة بعناية من أفضل السيارات الفاخرة والموثوقة',
    'cars.viewDetails': 'شاهد التفاصيل',
    'cars.call': 'اتصل',
    'cars.viewAll': 'عرض جميع السيارات',
    'cars.qr': 'ريال قطري',
    'cars.automatic': 'أوتوماتيك',
    'cars.petrol': 'بنزين',
    'cars.hybrid': 'هايبرد',
    'cars.more': 'المزيد',
    
    // Car brands and models
    'cars.mercedes': 'مرسيدس',
    'cars.bmw': 'بي إم دبليو',
    'cars.audi': 'أودي',
    'cars.lexus': 'لكزس',
    'cars.porsche': 'بورش',
    'cars.jaguar': 'جاكوار',
    'cars.toyota': 'تويوتا',
    'cars.honda': 'هوندا',
    // تم حذف التكرار: car models
    
    // Car model names in Arabic
    'cars.models.cclass2024': 'سي كلاس 2024',
    'cars.models.x52023': 'إكس 5 2023',
    'cars.models.a82024': 'إيه 8 2024',
    'cars.models.ls5002023': 'إل إس 500 2023',
    'cars.models.cayenne2024': 'كايين 2024',
    'cars.models.fpace2023': 'إف بيس 2023',
    'cars.models.camry2024': 'كامري 2024',
    'cars.models.accord2023': 'أكورد 2023',
    
    // Car features
    'cars.sunroof': 'فتحة سقف',
    'cars.leather': 'جلد طبيعي',
    'cars.smartScreen': 'شاشة ذكية',
    'cars.soundSystem': 'نظام صوتي متطور',
    'cars.awd': 'دفع رباعي',
    'cars.leatherSeats': 'مقاعد جلد',
    'cars.navigation': 'نظام ملاحة',
    'cars.camera360': 'كاميرات 360',
    'cars.massageSeats': 'مقاعد مساج',
    'cars.ledLights': 'إضاءة LED',
    'cars.boseSound': 'نظام صوتي بوز',
    'cars.autopilot': 'قيادة ذاتية',
    'cars.comfort': 'راحة فائقة',
    'cars.climateControl': 'تحكم مناخي',
    'cars.wirelessCharging': 'شحن لاسلكي',
    'cars.safetySystem': 'نظام أمان متقدم',
    'cars.sportPerformance': 'أداء رياضي',
    'cars.luxuryDesign': 'تصميم فاخر',
    'cars.advancedTech': 'تقنيات متقدمة',
    'cars.powerfulEngine': 'محرك قوي',
    'cars.elegantDesign': 'تصميم أنيق',
    'cars.excellentPerformance': 'أداء متميز',
    'cars.highComfort': 'راحة عالية',
    'cars.smartTech': 'تقنيات ذكية',
    'cars.fuelEfficient': 'اقتصادية في الوقود',
    'cars.reliable': 'موثوقية عالية',
    'cars.spacious': 'مساحة واسعة',
    'cars.modernDesign': 'تصميم عصري',
    'cars.economical': 'اقتصادية',
    'cars.easyMaintenance': 'صيانة سهلة',
    'cars.comfortableDriving': 'راحة في القيادة',
    'cars.noResults': 'لا توجد سيارات متاحة',
    'cars.noResultsDesc': 'جرب تغيير معايير البحث أو الفلترة',
    'cars.clearFilters': 'مسح جميع الفلاتر',
    
    // Car model translations
    // تم حذف التكرار: car models بالعربي
    
    // Car details and specifications
    'cars.specifications': 'المواصفات',
    'cars.features': 'المميزات',
    'cars.services': 'الخدمات',
    'cars.contact': 'اتصل',
    'cars.whatsapp': 'واتساب',
    'cars.viewAllCars': 'عرض جميع السيارات',
    'cars.km': 'كم',
    'cars.new': 'جديد',
    'cars.used': 'مستعمل',
    'cars.excellent': 'ممتاز',
    'cars.good': 'جيد',
    'cars.condition': 'الحالة',
    'cars.engine': 'المحرك',
    'cars.doors': 'الأبواب',
    'cars.seats': 'المقاعد',
    'cars.color': 'اللون',
    'cars.interior': 'الداخلية',
    'cars.exterior': 'الخارجية',
    'cars.safety': 'الأمان',
    // تم حذف التكرار: cars.comfort
    'cars.technology': 'التقنية',
    'cars.performance': 'الأداء',
    'cars.efficiency': 'الكفاءة',
    'cars.luxury': 'الفخامة',
    'cars.sport': 'رياضي',
    'cars.family': 'عائلي',
    'cars.compact': 'مدمج',
    'cars.suv': 'دفع رباعي',
    'cars.sedan': 'سيدان',
    'cars.hatchback': 'هاتشباك',
    'cars.coupe': 'كوبيه',
    'cars.convertible': 'قابل للطي',
    'cars.pickup': 'بيك أب',
    'cars.van': 'فان',
    'cars.truck': 'شاحنة',
    
    // Car descriptions
    'cars.mercedes.cclass.desc': 'سيارة مرسيدس C-Class 2024 بحالة ممتازة مع جميع المواصفات الفاخرة',
    'cars.bmw.x5.desc': 'BMW X5 2023 بحالة ممتازة مع دفع رباعي وجميع المواصفات الرياضية',
    'cars.audi.a8.desc': 'أودي A8 2024 سيارة فاخرة بأحدث التقنيات والمواصفات العالمية',
    'cars.lexus.ls500.desc': 'لكزس LS 500 2023 سيارة فاخرة بتقنية هايبرد وراحة استثنائية',
    'cars.porsche.cayenne.desc': 'بورش Cayenne 2024 سيارة رياضية فاخرة بأداء استثنائي وتصميم مميز',
    'cars.jaguar.fpace.desc': 'جاكوار F-Pace 2023 سيارة أنيقة بتصميم بريطاني مميز وأداء رائع',
    'cars.toyota.camry.desc': 'تويوتا كامري 2024 سيارة عملية واقتصادية بتقنية هايبرد متطورة',
    'cars.honda.accord.desc': 'هوندا أكورد 2023 سيارة موثوقة بتصميم عصري وأداء اقتصادي',
    
    // Car status
    'cars.available': 'متاحة',
    'cars.sold': 'مباعة',
    'cars.reserved': 'محجوزة',
    
    // Car specifications
    'cars.year': 'سنة الصنع',
    'cars.fuelType': 'نوع الوقود',
    'cars.transmissionType': 'ناقل الحركة',
    'cars.mileage': 'المسافة المقطوعة',
    'cars.views': 'المشاهدات',
    'cars.inquiries': 'الاستفسارات',
    'cars.rating': 'التقييم',
    'cars.warranty': 'الضمان',
    'cars.inspection': 'الفحص',
    'cars.financing': 'التمويل',
    'cars.exchange': 'الاستبدال',
    'cars.maintenance': 'الصيانة',
    'cars.support': 'الدعم',
    
    // Car request section - complete translation
    // تم حذف التكرار: request section
    
    // Car features in Arabic
    'features.sunroof': 'فتحة سقف',
    'features.leather': 'جلد طبيعي',
    'features.smartScreen': 'شاشة ذكية',
    'features.soundSystem': 'نظام صوتي متطور',
    'features.awd': 'دفع رباعي',
    'features.leatherSeats': 'مقاعد جلد',
    'features.navigation': 'نظام ملاحة',
    'features.camera360': 'كاميرات 360',
    'features.massageSeats': 'مقاعد مساج',
    'features.ledLights': 'إضاءة LED',
    'features.boseSound': 'نظام صوتي بوز',
    'features.autopilot': 'قيادة ذاتية',
    'features.comfort': 'راحة فائقة',
    'features.climateControl': 'تحكم مناخي',
    'features.wirelessCharging': 'شحن لاسلكي',
    'features.safetySystem': 'نظام أمان متقدم',
    
    // تم حذف التكرار: contact section - complete translation
    // تم حذف التكرار: contact section
    
    // About Section
    'about.title': 'من نحن',
    'about.subtitle': 'من سنين وإحنا نخدمك بأفضل السيارات في قطر والخليج، ومع كل سيارة نبيعها نكسب ثقة عميل جديد',
    'about.ourStory': 'قصتنا',
    'about.values': 'قيمنا ومبادئنا',
    'about.journey': 'رحلة إنجازاتنا',
    'about.trust': 'الثقة والأمانة',
    'about.trustDesc': 'نبني علاقات طويلة الأمد مع عملائنا',
    'about.quality': 'الجودة والضمان',
    'about.qualityDesc': 'كل سيارة تمر بفحص شامل قبل التسليم',
    'about.customerService': 'خدمة العملاء',
    'about.customerServiceDesc': 'فريق متخصص متاح 24/7 لخدمتكم',
    'about.excellence': 'التميز والإبداع',
    'about.excellenceDesc': 'نسعى دائماً لتقديم الأفضل والأحدث',
    
    // Testimonials
    'testimonials.title': 'آراء عملائنا',
    'testimonials.subtitle': 'اسمع من عملائنا الكرام عن تجربتهم معنا، كلامهم أصدق من أي إعلان',
    'testimonials.shareExperience': 'شارك تجربتك معنا',
    'testimonials.shareDesc': 'رأيك يهمنا ويساعد الآخرين في اتخاذ القرار الصحيح',
    'testimonials.writeReview': 'اكتب تقييمك',
    'testimonials.avgRating': 'متوسط التقييم',
    'testimonials.happyCustomers': 'عميل راضي',
    'testimonials.satisfaction': 'نسبة الرضا',
    'testimonials.experience': 'سنة خبرة',
    
    // Customer testimonials
    'testimonials.customer1.name': 'أحمد المهندي',
    'testimonials.customer1.location': 'الدوحة',
    'testimonials.customer1.text': 'والله تعامل ممتاز من البداية للنهاية. اشتريت مرسيدس من عندهم والخدمة كانت فوق الممتاز. ينصح فيهم بقوة!',
    'testimonials.customer1.car': 'مرسيدس C-Class 2024',
    
    'testimonials.customer2.name': 'فاطمة الكواري',
    'testimonials.customer2.location': 'الريان',
    'testimonials.customer2.text': 'خدمة راقية ومعاملة محترمة. حصلت على سيارتي بأفضل سعر في السوق، والتسليم كان في الوقت المحدد. شكراً لكم',
    'testimonials.customer2.car': 'BMW X5 2023',
    
    'testimonials.customer3.name': 'محمد العطية',
    'testimonials.customer3.location': 'الوكرة',
    'testimonials.customer3.text': 'صراحة توقعت صعوبات، لكن الموضوع كان سهل جداً. الفريق محترف ويفهم في السيارات، ونصحوني بالأفضل ليا',
    'testimonials.customer3.car': 'أودي A8 2024',
    
    'testimonials.customer4.name': 'سارة الثاني',
    'testimonials.customer4.location': 'لوسيل',
    'testimonials.customer4.text': 'أول مرة أشتري سيارة وكنت متوترة، لكن الفريق ساعدني في كل شيء وشرح لي كل التفاصيل. خدمة مميزة',
    'testimonials.customer4.car': 'لكزس LS 500 2023',
    
    'testimonials.customer5.name': 'خالد الحمادي',
    'testimonials.customer5.location': 'الخور',
    'testimonials.customer5.text': 'اشتريت من عندهم أكثر من مرة وما خاب ظني فيهم أبداً. أسعار منافسة وصدق في التعامل. الله يعطيهم العافية',
    'testimonials.customer5.car': 'بورش Cayenne 2024',
    
  // (request translations removed - section deleted)
    
    // Contact Section
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'نحن هنا لخدمتك في أي وقت. تواصل معنا وسنكون سعداء لمساعدتك في العثور على سيارة أحلامك',
    'contact.contactInfo': 'معلومات التواصل',
    'contact.contactInfoDesc': 'فريقنا المتخصص جاهز لخدمتك والإجابة على جميع استفساراتك حول السيارات والخدمات المتاحة',
    'contact.phone': 'الهاتف',
    'contact.whatsapp': 'واتساب',
    'contact.email': 'البريد الإلكتروني',
    'contact.location': 'الموقع',
    'contact.workingHours': 'ساعات العمل',
    'contact.satThu': 'السبت - الخميس',
    'contact.friday': 'الجمعة',
    'contact.support247': 'خدمة العملاء 24/7',
    'contact.directCall': 'اتصال مباشر',
    'contact.sendMessage': 'أرسل لنا رسالة',
    'contact.messageSent': 'تم إرسال رسالتك بنجاح!',
    'contact.messageResponse': 'سيتم التواصل معك في أقرب وقت ممكن',
    'contact.fullName': 'الاسم الكامل',
    'contact.phoneNumber': 'رقم الهاتف',
    'contact.subject': 'الموضوع',
    'contact.message': 'الرسالة',
    'contact.chooseSubject': 'اختر الموضوع',
    'contact.carInquiry': 'استفسار عن سيارة',
    'contact.priceQuote': 'طلب عرض سعر',
    'contact.afterSales': 'خدمة ما بعد البيع',
    'contact.complaint': 'شكوى أو اقتراح',
    'contact.other': 'أخرى',
    'contact.writeMessage': 'اكتب رسالتك هنا...',
    'contact.sendingMessage': 'جاري الإرسال...',
    'contact.mapTitle': 'موقعنا على الخريطة',
    
    // Footer
    'footer.quickLinks': 'روابط سريعة',
    'footer.services': 'خدماتنا',
    'footer.contactUs': 'تواصل معنا',
    'footer.workingHours': 'ساعات العمل',
    'footer.satThu': 'السبت - الخميس',
    'footer.friday': 'الجمعة',
    'footer.support247': 'خدمة العملاء 24/7',
    'footer.satThuTime': '8:00 ص - 10:00 م',
    'footer.fridayTime': '2:00 م - 10:00 م',
    'footer.phone': 'هاتف',
    'footer.email': 'البريد الإلكتروني',
    'footer.location': 'الموقع',
    'footer.viewMap': 'عرض على الخريطة',
    'footer.whatsapp': 'راسلنا واتساب',
    'footer.dohaQatar': 'الدوحة، قطر',
    'footer.mapTitle': 'موقعنا على الخريطة',
    'footer.copyright': '© 2024 معرض اللوفر للسيارات. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط والأحكام',
    'footer.sitemap': 'خريطة الموقع',
    'footer.madeWith': 'صنع بـ',
    'footer.inQatar': 'في قطر',
    'footer.carSales': 'بيع السيارات',
    'footer.comprehensiveWarranty': 'ضمان شامل',
    'footer.excellentService': 'خدمة متميزة',
    'footer.periodicMaintenance': 'صيانة دورية'
  },
  en: {
    'footer.emailLabel': 'Email',
    // Header
    'header.title': 'AL Louvre Car Showroom',
    'header.subtitle': 'Best Cars in Qatar',
    'header.home': 'Home',
    'header.cars': 'Cars',

    'header.testimonials': 'Testimonials',
    'header.request': 'Request Car',
    'header.contact': 'Contact Us',
    'header.cta': 'Order Your Car Now',
    
    // Hero Section
    'hero.title': 'Choose Your Car With Us',
    'hero.subtitle': 'Leave The Rest To Us',
    
    'hero.bestPrices': 'Best Prices',
    'hero.warranty': 'Full Warranty',
    'hero.service': 'Excellent Service',
    'hero.browseCars': 'Browse Cars',
    'hero.contactUs': 'Contact Us',
    
  // (stats translations removed - section deleted)
    
    // Featured Cars
    'cars.title': 'Featured Cars',
    'cars.subtitle': 'Choose from our carefully selected collection of the finest luxury and reliable cars',
    'cars.viewDetails': 'View Details',
    'cars.call': 'Call',
    'cars.viewAll': 'View All Cars',
    'cars.qr': 'QAR',
    'cars.automatic': 'Automatic',
    'cars.petrol': 'Petrol',
    'cars.hybrid': 'Hybrid',
    'cars.more': 'More',
    'cars.noResults': 'No cars available',
    'cars.noResultsDesc': 'Try changing search criteria or filters',
    'cars.clearFilters': 'Clear all filters',
    
    // Car model translations (keep English)
    'cars.cclass2024': 'C-Class 2024',
    'cars.x52023': 'X5 2023',
    'cars.a82024': 'A8 2024',
    'cars.ls5002023': 'LS 500 2023',
    'cars.cayenne2024': 'Cayenne 2024',
    'cars.fpace2023': 'F-Pace 2023',
    'cars.camry2024': 'Camry 2024',
    'cars.accord2023': 'Accord 2023',
    
    // Car details and specifications
    'cars.specifications': 'Specifications',
    'cars.features': 'Features',
    'cars.services': 'Services',
    'cars.contact': 'Contact',
    'cars.whatsapp': 'WhatsApp',
    'cars.viewAllCars': 'View All Cars',
    'cars.km': 'km',
    'cars.new': 'New',
    'cars.used': 'Used',
    'cars.excellent': 'Excellent',
    'cars.good': 'Good',
    'cars.condition': 'Condition',
    'cars.engine': 'Engine',
    'cars.doors': 'Doors',
    'cars.seats': 'Seats',
    'cars.color': 'Color',
    'cars.interior': 'Interior',
    'cars.exterior': 'Exterior',
  'cars.safety': 'Safety',
    'cars.technology': 'Technology',
    'cars.performance': 'Performance',
    'cars.efficiency': 'Efficiency',
    'cars.luxury': 'Luxury',
    'cars.sport': 'Sport',
    'cars.family': 'Family',
    'cars.compact': 'Compact',
    'cars.suv': 'SUV',
    'cars.sedan': 'Sedan',
    'cars.hatchback': 'Hatchback',
    'cars.coupe': 'Coupe',
    'cars.convertible': 'Convertible',
    'cars.pickup': 'Pickup',
    'cars.van': 'Van',
    'cars.truck': 'Truck',
    
    // Car brands and models
    'cars.mercedes': 'Mercedes',
    'cars.bmw': 'BMW',
    'cars.audi': 'Audi',
    'cars.lexus': 'Lexus',
    'cars.porsche': 'Porsche',
    'cars.jaguar': 'Jaguar',
  'cars.toyota': 'Toyota',
  'cars.honda': 'Honda',
    
    // Car model names in English
    'cars.models.cclass2024': 'C-Class 2024',
    'cars.models.x52023': 'X5 2023',
    'cars.models.a82024': 'A8 2024',
    'cars.models.ls5002023': 'LS 500 2023',
    'cars.models.cayenne2024': 'Cayenne 2024',
    'cars.models.fpace2023': 'F-Pace 2023',
    'cars.models.camry2024': 'Camry 2024',
    'cars.models.accord2023': 'Accord 2023',
    
    // Car features
    'cars.sunroof': 'Sunroof',
    'cars.leather': 'Genuine Leather',
    'cars.smartScreen': 'Smart Display',
    'cars.soundSystem': 'Premium Sound System',
    'cars.awd': 'All-Wheel Drive',
    'cars.leatherSeats': 'Leather Seats',
    'cars.navigation': 'Navigation System',
    'cars.camera360': '360° Cameras',
    'cars.massageSeats': 'Massage Seats',
    'cars.ledLights': 'LED Lighting',
    'cars.boseSound': 'Bose Sound System',
    'cars.autopilot': 'Autopilot',
    'cars.comfort': 'Ultimate Comfort',
    'cars.climateControl': 'Climate Control',
    'cars.wirelessCharging': 'Wireless Charging',
    'cars.safetySystem': 'Advanced Safety System',
    'cars.sportPerformance': 'Sport Performance',
    'cars.luxuryDesign': 'Luxury Design',
    'cars.advancedTech': 'Advanced Technology',
    'cars.powerfulEngine': 'Powerful Engine',
    'cars.elegantDesign': 'Elegant Design',
    'cars.excellentPerformance': 'Excellent Performance',
    'cars.highComfort': 'High Comfort',
    'cars.smartTech': 'Smart Technology',
    'cars.fuelEfficient': 'Fuel Efficient',
    'cars.reliable': 'High Reliability',
    'cars.spacious': 'Spacious Interior',
    'cars.modernDesign': 'Modern Design',
    'cars.economical': 'Economical',
    'cars.easyMaintenance': 'Easy Maintenance',
    'cars.comfortableDriving': 'Comfortable Driving',
    
    // Car descriptions
    'cars.mercedes.cclass.desc': 'Mercedes C-Class 2024 in excellent condition with all luxury specifications',
    'cars.bmw.x5.desc': 'BMW X5 2023 in excellent condition with all-wheel drive and all sport specifications',
    'cars.audi.a8.desc': 'Audi A8 2024 luxury car with the latest technologies and international specifications',
    'cars.lexus.ls500.desc': 'Lexus LS 500 2023 luxury car with hybrid technology and exceptional comfort',
    'cars.porsche.cayenne.desc': 'Porsche Cayenne 2024 luxury sports car with exceptional performance and distinctive design',
    'cars.jaguar.fpace.desc': 'Jaguar F-Pace 2023 elegant car with distinctive British design and excellent performance',
    'cars.toyota.camry.desc': 'Toyota Camry 2024 practical and economical car with advanced hybrid technology',
    'cars.honda.accord.desc': 'Honda Accord 2023 reliable car with modern design and economical performance',
    
    // Car status
    'cars.available': 'Available',
    'cars.sold': 'Sold',
    'cars.reserved': 'Reserved',
    
    // Car specifications
    'cars.year': 'Year',
    'cars.fuelType': 'Fuel Type',
    'cars.transmissionType': 'Transmission',
    'cars.mileage': 'Mileage',
    'cars.views': 'Views',
    'cars.inquiries': 'Inquiries',
    'cars.rating': 'Rating',
    'cars.warranty': 'Warranty',
    'cars.inspection': 'Inspection',
    'cars.financing': 'Financing',
    'cars.exchange': 'Exchange',
    'cars.maintenance': 'Maintenance',
    'cars.support': 'Support',
    
    // About Section
    'about.title': 'About Us',
    'about.subtitle': 'For years we have been serving you with the best cars in Qatar and the Gulf, and with every car we sell we gain the trust of a new customer',
    'about.ourStory': 'Our Story',
    'about.values': 'Our Values & Principles',
    'about.journey': 'Our Achievement Journey',
    'about.trust': 'Trust & Honesty',
    'about.trustDesc': 'We build long-term relationships with our customers',
    'about.quality': 'Quality & Warranty',
    'about.qualityDesc': 'Every car undergoes comprehensive inspection before delivery',
    'about.customerService': 'Customer Service',
    'about.customerServiceDesc': 'Specialized team available 24/7 to serve you',
    'about.excellence': 'Excellence & Innovation',
    'about.excellenceDesc': 'We always strive to provide the best and latest',
    
    // Testimonials
    'testimonials.title': 'Customer Reviews',
    'testimonials.subtitle': 'Hear from our valued customers about their experience with us, their words are more honest than any advertisement',
    'testimonials.shareExperience': 'Share Your Experience',
    'testimonials.shareDesc': 'Your opinion matters to us and helps others make the right decision',
    'testimonials.writeReview': 'Write Your Review',
    'testimonials.avgRating': 'Average Rating',
    'testimonials.happyCustomers': 'Happy Customers',
    'testimonials.satisfaction': 'Satisfaction Rate',
    'testimonials.experience': 'Years Experience',
    
    // Customer testimonials
    'testimonials.customer1.name': 'Ahmed Al-Mohannadi',
    'testimonials.customer1.location': 'Doha',
    'testimonials.customer1.text': 'Excellent service from start to finish. I bought a Mercedes from them and the service was outstanding. Highly recommended!',
    'testimonials.customer1.car': 'Mercedes C-Class 2024',
    
    'testimonials.customer2.name': 'Fatima Al-Kuwari',
    'testimonials.customer2.location': 'Al Rayyan',
    'testimonials.customer2.text': 'Premium service and respectful treatment. I got my car at the best price in the market, and delivery was on time. Thank you',
    'testimonials.customer2.car': 'BMW X5 2023',
    
    'testimonials.customer3.name': 'Mohammed Al-Attiya',
    'testimonials.customer3.location': 'Al Wakra',
    'testimonials.customer3.text': 'Honestly, I expected difficulties, but it was very easy. The team is professional and knowledgeable about cars, and they advised me on the best choice',
    'testimonials.customer3.car': 'Audi A8 2024',
    
    'testimonials.customer4.name': 'Sarah Al-Thani',
    'testimonials.customer4.location': 'Lusail',
    'testimonials.customer4.text': 'First time buying a car and I was nervous, but the team helped me with everything and explained all the details. Excellent service',
    'testimonials.customer4.car': 'Lexus LS 500 2023',
    
    'testimonials.customer5.name': 'Khalid Al-Hammadi',
    'testimonials.customer5.location': 'Al Khor',
    'testimonials.customer5.text': 'I bought from them more than once and they never disappointed me. Competitive prices and honest dealing. May God give them strength',
    'testimonials.customer5.car': 'Porsche Cayenne 2024',
    
  // (request translations removed - section deleted)
    
    // Car features in English
    'features.sunroof': 'Sunroof',
    'features.leather': 'Genuine Leather',
    'features.smartScreen': 'Smart Display',
    'features.soundSystem': 'Premium Sound System',
    'features.awd': 'All-Wheel Drive',
    'features.leatherSeats': 'Leather Seats',
    'features.navigation': 'Navigation System',
    'features.camera360': '360° Cameras',
    'features.massageSeats': 'Massage Seats',
    'features.ledLights': 'LED Lighting',
    'features.boseSound': 'Bose Sound System',
    'features.autopilot': 'Autopilot',
    'features.comfort': 'Ultimate Comfort',
    'features.climateControl': 'Climate Control',
    'features.wirelessCharging': 'Wireless Charging',
    'features.safetySystem': 'Advanced Safety System',
    
    // تم حذف التكرار: contact section en
    // تم حذف التكرار: contact section en
    'contact.enterFullName': 'Enter your full name',
    'contact.enterPhone': '+974 XXXX XXXX',
    'contact.enterEmail': 'example@email.com',
    'contact.required': '*',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Our Services',
    'footer.contactUs': 'Contact Us',
    'footer.workingHours': 'Working Hours',
    'footer.satThu': 'Saturday - Thursday',
    'footer.friday': 'Friday',
    'footer.support247': 'Customer Support 24/7',
    'footer.satThuTime': '8:00 AM - 10:00 PM',
    'footer.fridayTime': '2:00 PM - 10:00 PM',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.location': 'Location',
    'footer.viewMap': 'View on Map',
    'footer.whatsapp': 'WhatsApp Us',
    'footer.dohaQatar': 'Doha, Qatar',
    'footer.mapTitle': 'Our Location on Map',
    'footer.copyright': '© 2024 AL Louvre Car Showroom. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.sitemap': 'Sitemap',
    'footer.madeWith': 'Made with',
    'footer.inQatar': 'in Qatar',
    'footer.carSales': 'Car Sales',
    'footer.comprehensiveWarranty': 'Comprehensive Warranty',
    'footer.excellentService': 'Excellent Service',
    'footer.periodicMaintenance': 'Periodic Maintenance'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
    // Update document direction and language
    document.documentElement.dir = language === 'ar' ? 'ltr' : 'rtl';
    document.documentElement.lang = language === 'ar' ? 'en' : 'ar';
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};