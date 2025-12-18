import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  status: 'available' | 'sold' | 'reserved';
  views: number;
  inquiries: number;
  images: string[];
  mainImageIndex: number;
  fuel: string;
  transmission: string;
  mileage: string;
  rating: number;
  features: string[];
  description: string;
  warranty: string;
  inspection: string;
  financing: boolean;
  exchange: boolean;
  maintenance: boolean;
  support247: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CarsContextType {
  cars: Car[];
  addCar: (car: Omit<Car, 'id' | 'views' | 'inquiries' | 'createdAt' | 'updatedAt'>) => void;
  updateCar: (id: number, car: Partial<Car>) => void;
  deleteCar: (id: number) => void;
  getCarById: (id: number) => Car | undefined;
  getAvailableCars: () => Car[];
  incrementViews: (id: number) => void;
  incrementInquiries: (id: number) => void;
  searchCars: (query: string) => Car[];
  filterCars: (filters: {
    brand?: string;
    fuel?: string;
    minPrice?: number;
    maxPrice?: number;
    minYear?: number;
    maxYear?: number;
    status?: string;
  }) => Car[];
}

const CarsContext = createContext<CarsContextType | undefined>(undefined);

// البيانات الأولية للسيارات
const initialCars: Car[] = [
  {
    id: 59,
    brand: 'فيات',
    model: 'ابارث',
    year: 2017,
      price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0048.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0047.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0046.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0049.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0050.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0052.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0053.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0051.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0057.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0056.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0055.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0054.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '51,000 كم',
    rating: 4.2,
    features: [
      'كاملة',
      'أبيض راقي',
      'تصميم سبورت ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - فيات ابارث موديل 2017\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 51,000 كم فقط\nالمواصفات: كاملة\nاللون: أبيض راقي\nتصميم سبورت ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 60,
    brand: 'فولكس فاجن',
    model: 'كرافيلا',
    year: 2015,
    price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.44 PM.jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.45 PM (1).jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.45 PM.jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.46 PM (1).jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.46 PM.jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.47 PM (1).jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.47 PM (2).jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.47 PM.jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.48 PM (1).jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.48 PM (2).jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.48 PM.jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.49 PM (1).jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.49 PM (2).jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.49 PM (3).jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.49 PM.jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.50 PM (1).jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.50 PM (2).jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.50 PM (3).jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.50 PM (4).jpeg',
      '/Cars/فولكس واجن كرافيلا 2015/صور السياره_/WhatsApp Image 2025-12-18 at 5.21.50 PM.jpeg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '120,000 كم',
    rating: 4.0,
    features: [
      'قير اوتوماتيك',
      'حالة جيدة',
      'مرايات كهربائية',
      'مكيف شغال'
    ],
    description: `🚗 سيارة للبيع - فولكس واجن كرافيلا موديل 2015\nمن معرض اللوفر للسيارات 🔥\nالحالة: جيدة\nالقاطع: 120,000 كم تقريبًا\nاللون: رمادي خارجي، داخلي قماش رمادي\nالمميزات: مرايات كهربائية · سنتر لوك · مكيف يعمل جيدًا · شاشة صغيرة\nللمواصفات الكاملة راجع ملف المواصفات داخل مجلد السيارة أو تواصل مع المعرض`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 58,
    brand: 'فورد',
    model: 'ايفرست',
    year: 2024,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0077.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0076.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0075.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0074.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0073.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0072.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0071.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0070.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '6,000 كم',
    rating: 4.5,
    features: [
      'كاملة',
      'أبيض ومن الداخل جلد بيج',
      'تصميم فخم ومميز',
      'الحالة: ممتازة جدًا',
      'تحت الضمان'
    ],
    description: `🚗 سياره للبيع - فورد ايفرست موديل 2024\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 6,000 كم فقط\nالمواصفات: كاملة\nاللون: أبيض ومن الداخل جلد بيج\nتصميم فخم ومميز\nتحت الضمان\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 57,
    brand: 'فولكس فاجن',
    model: 'بيتل',
    year: 2015,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065714751.jpg',
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065721305.jpg',
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065718282.jpg',
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065710783.jpg',
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065706946.jpg',
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065703004.jpg',
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065700058.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '113,000 كم',
    rating: 4.3,
    features: [
      '4سلندر',
      'احمر خارجي ،بيج داخلي',
      'وارد قطر - مالك أول',
      'الحالة: ممتازه جدا'
    ],
    description: `🚗 سياره للبيع - فولكس فاجن بيتل موديل 2015\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازه جدا\nقاطع: 113,000 كم فقط\nاللون: احمر خارجي ،بيج داخلي\n4سلندر-قير اوتوماتيك\nوارد قطر - مالك أول\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
  warranty: '',
  inspection: '',
  financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 56,
    brand: 'GMC',
    model: 'XL',
    year: 2011,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/GMC XL - جي ام سي اكس ال/صور السياره_/FB_IMG_1753069660934.jpg',
      '/Cars/GMC XL - جي ام سي اكس ال/صور السياره_/FB_IMG_1753069663999.jpg',
      '/Cars/GMC XL - جي ام سي اكس ال/صور السياره_/FB_IMG_1753069668239.jpg',
      '/Cars/GMC XL - جي ام سي اكس ال/صور السياره_/IMG_20250721_064934.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '180,000 كم',
    rating: 4.0,
    features: [
      'اسود',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - GMC XL موديل 2011\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 180,000 كم تقريبًا\nاللون: اسود\nتصميم فاخر ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 54,
    brand: 'مرسيدس بنز',
    model: 'CLA250',
    year: 2018,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Mercedes Benz CLA250 - مرسيدس بنز سي ال ايه250/صور السياره_/IMG-20250717-WA0086.jpg',
      '/Cars/Mercedes Benz CLA250 - مرسيدس بنز سي ال ايه250/صور السياره_/IMG-20250717-WA0089.jpg',
      '/Cars/Mercedes Benz CLA250 - مرسيدس بنز سي ال ايه250/صور السياره_/IMG-20250717-WA0088.jpg',
      '/Cars/Mercedes Benz CLA250 - مرسيدس بنز سي ال ايه250/صور السياره_/IMG-20250717-WA0087.jpg',
      '/Cars/Mercedes Benz CLA250 - مرسيدس بنز سي ال ايه250/صور السياره_/IMG-20250717-WA0085.jpg',
      '/Cars/Mercedes Benz CLA250 - مرسيدس بنز سي ال ايه250/صور السياره_/IMG-20250717-WA0084.jpg',
      '/Cars/Mercedes Benz CLA250 - مرسيدس بنز سي ال ايه250/صور السياره_/IMG-20250717-WA0083.jpg',
      '/Cars/Mercedes Benz CLA250 - مرسيدس بنز سي ال ايه250/صور السياره_/IMG-20250717-WA0082.jpg',
      '/Cars/Mercedes Benz CLA250 - مرسيدس بنز سي ال ايه250/صور السياره_/IMG-20250717-WA0081.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '155,000 كم',
    rating: 4.5,
    features: [
      'كاملة',
      'أبيض من الداخل اسود',
      'تصميم فخم ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - مرسيدس بنز CLA250 موديل 2018\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 155,000 كم فقط\nالمواصفات: كاملة\nاللون: أبيض من الداخل اسود\nتصميم فخم ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 53,
    brand: 'لكزس',
    model: 'RX',
    year: 0,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Lexus RX - لكزس ار اكس/صور السياره_/FB_IMG_1753068361008.jpg',
      '/Cars/Lexus RX - لكزس ار اكس/صور السياره_/FB_IMG_1753068358142.jpg',
      '/Cars/Lexus RX - لكزس ار اكس/صور السياره_/FB_IMG_1753068355395.jpg',
      '/Cars/Lexus RX - لكزس ار اكس/صور السياره_/FB_IMG_1753068352971.jpg',
      '/Cars/Lexus RX - لكزس ار اكس/صور السياره_/FB_IMG_1753068350467.jpg',
      '/Cars/Lexus RX - لكزس ار اكس/صور السياره_/FB_IMG_1753068347960.jpg',
      '/Cars/Lexus RX - لكزس ار اكس/صور السياره_/FB_IMG_1753068342855.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '50,000 كم',
    rating: 4.0,
    features: [
      'ابيض من الداخل جلد اسود',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا',
      'وارد كندا'
    ],
    description: `🚗 سياره للبيع - لكزس ار اكس\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nاللون: ابيض من الداخل جلد اسود\nتصميم فاخر ومميز\nقاطع: 50,000 كم\nوارد كندا\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 51,
    brand: 'جي ام سي',
    model: 'سييرا',
    year: 0,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/GMC sierra - جي ام سي سييرا_/صور السياره_/IMG_20250721_071320.jpg',
      '/Cars/GMC sierra - جي ام سي سييرا_/صور السياره_/FB_IMG_1753071176114.jpg',
      '/Cars/GMC sierra - جي ام سي سييرا_/صور السياره_/FB_IMG_1753071157909.jpg',
      '/Cars/GMC sierra - جي ام سي سييرا_/صور السياره_/FB_IMG_1753071152100.jpg',
      '/Cars/GMC sierra - جي ام سي سييرا_/صور السياره_/FB_IMG_1753071148754.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '250,000 كم',
    rating: 4.4,
    features: [
      'كاملة',
      'ابيض صبغ متفرق',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - جي ام سي سييرا\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 250,000 كم فقط\nالمواصفات: كاملة\nاللون: ابيض صبغ متفرق\nتصميم فاخر ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 50,
    brand: 'فورد',
    model: 'Bronco',
    year: 2021,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Ford Bronco - فورد برونكو/صور السياره_/IMG-20250717-WA0096.jpg',
      '/Cars/Ford Bronco - فورد برونكو/صور السياره_/IMG-20250717-WA0095.jpg',
      '/Cars/Ford Bronco - فورد برونكو/صور السياره_/IMG-20250717-WA0094.jpg',
      '/Cars/Ford Bronco - فورد برونكو/صور السياره_/IMG-20250717-WA0093.jpg',
      '/Cars/Ford Bronco - فورد برونكو/صور السياره_/IMG-20250717-WA0092.jpg',
      '/Cars/Ford Bronco - فورد برونكو/صور السياره_/IMG-20250717-WA0091.jpg',
      '/Cars/Ford Bronco - فورد برونكو/صور السياره_/IMG-20250717-WA0090.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '45,000 كم',
    rating: 4.0,
    features: [
      'كاملة',
      'بيج ومن الداخل رصاصي',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا',
      'سلندر'
    ],
    description: `🚗 سياره للبيع - فورد برونكو موديل 2021\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nالمحرك: سلندر\nقاطع: 45,000 كم فقط\nالمواصفات: كاملة\nاللون: بيج ومن الداخل رصاصي\nتصميم فاخر ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 49,
    brand: 'مازدا',
    model: 'CX',
    year: 2009,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0037.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0038.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0036.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0039.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0042.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0041.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0040.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0043.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0044.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0045.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0125.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0124.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0123.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0122.jpg',
      '/Cars/Mazda CX - مازدا سي اكس/صور السياره/IMG-20250717-WA0120.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '85,000 كم',
    rating: 3.7,
    features: [
      'كاملة',
      'أسود أنيق',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - Mazda CX موديل 2009\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 85,000 كم فقط\nالمواصفات: كاملة\nاللون: أسود أنيق\nتصميم فاخر ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 48,
    brand: 'جي ام سي',
    model: 'Yukon',
    year: 2021,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0104.jpg',
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0105.jpg',
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0103.jpg',
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0106.jpg',
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0102.jpg',
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0101.jpg',
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0100.jpg',
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0099.jpg',
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0098.jpg',
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0097.jpg',
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0107.jpg',
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0110.jpg',
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0109.jpg',
      '/Cars/GMC Yukon - جي ام سي يوكون/صور السياره_/IMG-20250717-WA0108.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '180,000 كم',
    rating: 4.6,
    features: [
      'كاملة',
      'أسود',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - جي إم سي يوكون موديل 2021\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 180,000 كم فقط\nالمواصفات: كاملة\nاللون: أسود\nتصميم فاخر ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
  warranty: '',
  inspection: '',
  financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 47,
    brand: 'فيات',
    model: 'Abarth',
    year: 2017,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0046.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0047.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0048.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0049.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0050.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0051.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0052.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0053.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0054.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0055.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0056.jpg',
      '/Cars/Fiat abarth - فيات ابارث/صور السياره/IMG-20250717-WA0057.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '51,000 كم',
    rating: 4.8,
    features: [
      'كاملة',
      'أبيض راقي',
      'تصميم سبورت ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - فيات ابارث موديل 2017\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 51,000 كم فقط\nالمواصفات: كاملة\nاللون: أبيض راقي\nتصميم سبورت ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 46,
    brand: 'نيسان',
    model: 'Patrol Safari',
    year: 2021,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Nissan patrol safari - نيسان باترول سفاري_/صور السياره_/FB_IMG_1753067316011.jpg',
      '/Cars/Nissan patrol safari - نيسان باترول سفاري_/صور السياره_/FB_IMG_1753067313456.jpg',
      '/Cars/Nissan patrol safari - نيسان باترول سفاري_/صور السياره_/FB_IMG_1753067310969.jpg',
      '/Cars/Nissan patrol safari - نيسان باترول سفاري_/صور السياره_/FB_IMG_1753067305509.jpg',
      '/Cars/Nissan patrol safari - نيسان باترول سفاري_/صور السياره_/IMG_20250721_060922.jpg',
      '/Cars/Nissan patrol safari - نيسان باترول سفاري_/صور السياره_/FB_IMG_1753067325025.jpg',
      '/Cars/Nissan patrol safari - نيسان باترول سفاري_/صور السياره_/FB_IMG_1753067321240.jpg',
      '/Cars/Nissan patrol safari - نيسان باترول سفاري_/صور السياره_/FB_IMG_1753067318810.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '75,000 كم',
    rating: 4.1,
    features: [
      'ابيض من الداخل اسود',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - نيسان باترول سفاري موديل 2021\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 75,000 كم\nاللون: ابيض من الداخل اسود\nتصميم فاخر ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
  warranty: '',
  inspection: '',
  financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 45,
    brand: 'نيسان',
    model: 'Patrol Platinum',
    year: 2015,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Nissan patrol platinum - نيسان باترول بلاتينيوم_/صور السياره_/FB_IMG_1753066958219.jpg',
      '/Cars/Nissan patrol platinum - نيسان باترول بلاتينيوم_/صور السياره_/FB_IMG_1753066954136.jpg',
      '/Cars/Nissan patrol platinum - نيسان باترول بلاتينيوم_/صور السياره_/FB_IMG_1753066950935.jpg',
      '/Cars/Nissan patrol platinum - نيسان باترول بلاتينيوم_/صور السياره_/FB_IMG_1753066947520.jpg',
      '/Cars/Nissan patrol platinum - نيسان باترول بلاتينيوم_/صور السياره_/FB_IMG_1753066944511.jpg',
      '/Cars/Nissan patrol platinum - نيسان باترول بلاتينيوم_/صور السياره_/FB_IMG_1753066940942.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: '',
    mileage: '185,000 كم',
    rating: 4.5,
    features: [
      'ابيض',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - باترول بلاتنيوم موديل 2015\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nاللون: ابيض\nتصميم فاخر ومميز\nقاطع: 185,000 كم`,
  warranty: '',
  inspection: '',
  financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 44,
    brand: 'نيسان',
    model: 'Patrol',
    year: 2013,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Nissan patrol - نيسان باترول_/صور السياره_/FB_IMG_1753066076105.jpg',
      '/Cars/Nissan patrol - نيسان باترول_/صور السياره_/FB_IMG_1753066097444.jpg',
      '/Cars/Nissan patrol - نيسان باترول_/صور السياره_/FB_IMG_1753066093382.jpg',
      '/Cars/Nissan patrol - نيسان باترول_/صور السياره_/FB_IMG_1753066089798.jpg',
      '/Cars/Nissan patrol - نيسان باترول_/صور السياره_/FB_IMG_1753066084117.jpg',
      '/Cars/Nissan patrol - نيسان باترول_/صور السياره_/FB_IMG_1753066080383.jpg',
      '/Cars/Nissan patrol - نيسان باترول_/صور السياره_/FB_IMG_1753066101501.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: '',
    mileage: '140,000 كم',
    rating: 4.2,
    features: [
      'رمادي خارجي',
      'بيج داخلي',
      'صبغ الوكاله',
      'الحالة: ممتازه جدا'
    ],
    description: `🚗 سياره للبيع\nنيسان باترول 2013\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازه جدا\nاللون: رمادي خارجي ،بيج داخلي\nقاطع: 140,000 كم فقط\nصبغ الوكاله`,
  warranty: '',
  inspection: '',
  financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 43,
    brand: 'تويوتا',
    model: 'Land Cruiser GXR',
    year: 2019,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Toyota land cruiser GXR - تويوتا لاند كروزر جي اكس ار/صور السياره_/FB_IMG_1753070051345.jpg',
      '/Cars/Toyota land cruiser GXR - تويوتا لاند كروزر جي اكس ار/صور السياره_/FB_IMG_1753070055503.jpg',
      '/Cars/Toyota land cruiser GXR - تويوتا لاند كروزر جي اكس ار/صور السياره_/IMG_20250721_065915.jpg',
      '/Cars/Toyota land cruiser GXR - تويوتا لاند كروزر جي اكس ار/صور السياره_/FB_IMG_1753070060573.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '120,000 كم',
    rating: 4.3,
    features: [
      '6 سلندر',
      'صبغ الوكاله',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - لاند كروزر جي اكس ار موديل 2019\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 120,000 كم فقط\nالمحرك: 6 سلندر\nصبغ الوكاله\nتصميم فاخر ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
  warranty: '',
  inspection: '',
  financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 42,
    brand: 'تويوتا',
    model: 'Land Cruiser VXR',
    year: 2015,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Toyota land cruiser VXR - تويوتا لاند كروزر في اكس ار/صور السياره_/IMG_20250721_063819.jpg',
      '/Cars/Toyota land cruiser VXR - تويوتا لاند كروزر في اكس ار/صور السياره_/FB_IMG_1753069067458.jpg',
      '/Cars/Toyota land cruiser VXR - تويوتا لاند كروزر في اكس ار/صور السياره_/FB_IMG_1753069065327.jpg',
      '/Cars/Toyota land cruiser VXR - تويوتا لاند كروزر في اكس ار/صور السياره_/FB_IMG_1753069063280.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '250,000 كم',
    rating: 4.0,
    features: [
      'ابيض من الداخل تان',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - لاندكروزر في اكس ار موديل 2015\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 250,000 كم\nاللون: ابيض من الداخل تان\nتصميم فاخر ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
  warranty: '',
  inspection: '',
  financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 41,
    brand: 'تويوتا',
    model: 'Land Cruiser VXR Premium Edition',
    year: 2015,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Toyota land cruiser VXR premium edition - تويوتا لاند كروزر في اكس ار بريميوم اديشن_/صور السياره_/FB_IMG_1753068583121.jpg',
      '/Cars/Toyota land cruiser VXR premium edition - تويوتا لاند كروزر في اكس ار بريميوم اديشن_/صور السياره_/FB_IMG_1753068579284.jpg',
      '/Cars/Toyota land cruiser VXR premium edition - تويوتا لاند كروزر في اكس ار بريميوم اديشن_/صور السياره_/FB_IMG_1753068577249.jpg',
      '/Cars/Toyota land cruiser VXR premium edition - تويوتا لاند كروزر في اكس ار بريميوم اديشن_/صور السياره_/FB_IMG_1753068573708.jpg',
      '/Cars/Toyota land cruiser VXR premium edition - تويوتا لاند كروزر في اكس ار بريميوم اديشن_/صور السياره_/FB_IMG_1753068568880.jpg',
      '/Cars/Toyota land cruiser VXR premium edition - تويوتا لاند كروزر في اكس ار بريميوم اديشن_/صور السياره_/FB_IMG_1753068564138.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '260,000 كم',
    rating: 4.2,
    features: [
      'ابيض',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - لاندكروزر في اكس ار بريميوم ادشين موديل 2015\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 260,000 كم\nاللون: ابيض\nتصميم فاخر ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
  warranty: '',
  inspection: '',
  financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 30,
    brand: 'ميني كوبر',
    model: 'Mini Cooper',
    year: 2020,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0023.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0024.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0022.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0021.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0028.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0034.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0033.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0032.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0031.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0030.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0029.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0027.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0026.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0035.jpg',
      '/Cars/Mini cooper - ميني كوبر_/صور السياره/IMG-20250717-WA0025.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'أوتوماتيك',
    mileage: '51,000 كم',
    rating: 4.5,
    features: [
      'كاملة',
      'جلد أسود فخم',
      'تصميم رياضي فاخر ومميز',
      'محرك 4 سلندر',
      'لون أبيض',
      'حالة ممتازة جدًا'
    ],
    description: '🚗 سياره للبيع - Mini cooper موديل 2020 من معرض اللوفر للسيارات\nالحالة: ممتازة جدًا\nقاطع: 51,000 كم فقط\nالمحرك: 4 سلندر\nالمواصفات: كاملة\nاللون: ابيض- من الداخل جلد اسود فخم\nتصميم رياضي فاخر ومميز',
  warranty: '',
  inspection: '',
  financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 39,
    brand: 'فورد',
    model: 'F150 Full Option',
    year: 2017,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Ford F150 full option - فورد اف150 فل اوبشن/صور السياره_/FB_IMG_1753071729257.jpg',
      '/Cars/Ford F150 full option - فورد اف150 فل اوبشن/صور السياره_/FB_IMG_1753071725352.jpg',
      '/Cars/Ford F150 full option - فورد اف150 فل اوبشن/صور السياره_/FB_IMG_1753071731783.jpg',
      '/Cars/Ford F150 full option - فورد اف150 فل اوبشن/صور السياره_/FB_IMG_1753071739177.jpg',
      '/Cars/Ford F150 full option - فورد اف150 فل اوبشن/صور السياره_/FB_IMG_1753071736439.jpg',
      '/Cars/Ford F150 full option - فورد اف150 فل اوبشن/صور السياره_/FB_IMG_1753071734000.jpg',
      '/Cars/Ford F150 full option - فورد اف150 فل اوبشن/صور السياره_/FB_IMG_1753071741580.jpg',
      '/Cars/Ford F150 full option - فورد اف150 فل اوبشن/صور السياره_/FB_IMG_1753071746681.jpg',
      '/Cars/Ford F150 full option - فورد اف150 فل اوبشن/صور السياره_/FB_IMG_1753071744037.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'أوتوماتيك',
    mileage: '95,000 كم',
    rating: 4.3,
    features: [
      '6 سلندر',
      'سعة 4300 سي سي',
      'رمادي أنيق',
      'استخدام نظيف وهادئ',
      'نظافة غير قابلة للمقارنة',
      'كل شيء فيها على الفحص'
    ],
    description: `■ للبيع – فورد F150 فل أبشن لايت\nليست مجرد سيارة... بل تجربة قيادة بفخامة محسوبة\nموديل 2017\nعداد: 95,000 كم فقط – استخدام نظيف وهادئ\nمحرك 6 سلندر – سعة 4300 سي سي\nقير أوتوماتيك – بنزين\nاللون: رمادي أنيق، يفرض حضوره بهدوء\nالحالة: نظافة غير قابلة للمقارنة – كل شيء فيها على الفحص`,
    warranty: '',
    inspection: 'كل شيء فيها على الفحص',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 40,
    brand: 'شيفروليه',
    model: 'Tahoe',
    year: 2016,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/chevrolet tahoe - شيفروليه تاهو/صور السياره_/FB_IMG_1753069490738.jpg',
      '/Cars/chevrolet tahoe - شيفروليه تاهو/صور السياره_/FB_IMG_1753069486574.jpg',
      '/Cars/chevrolet tahoe - شيفروليه تاهو/صور السياره_/FB_IMG_1753069480875.jpg',
      '/Cars/chevrolet tahoe - شيفروليه تاهو/صور السياره_/FB_IMG_1753069493930.jpg',
      '/Cars/chevrolet tahoe - شيفروليه تاهو/صور السياره_/FB_IMG_1753069498131.jpg',
      '/Cars/chevrolet tahoe - شيفروليه تاهو/صور السياره_/IMG_20250721_064527.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '160,000 كم',
    rating: 4.1,
    features: [
      'دبل صبغ الوكاله',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - شيفروليه تاهو موديل 2016\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nدبل صبغ الوكاله\nتصميم فاخر ومميز\nقاطع: 160,000 كم\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    // ...removed warranty and inspection fields...
  warranty: '',
  inspection: '',
  financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 38,
    brand: 'جينيسيس',
    model: 'G80',
    year: 2021,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Genesis G80 - جينيسيس جي80/صور السياره_/IMG-20250717-WA0069.jpg',
      '/Cars/Genesis G80 - جينيسيس جي80/صور السياره_/IMG-20250717-WA0068.jpg',
      '/Cars/Genesis G80 - جينيسيس جي80/صور السياره_/IMG-20250717-WA0067.jpg',
      '/Cars/Genesis G80 - جينيسيس جي80/صور السياره_/IMG-20250717-WA0066.jpg',
      '/Cars/Genesis G80 - جينيسيس جي80/صور السياره_/IMG-20250717-WA0065.jpg',
      '/Cars/Genesis G80 - جينيسيس جي80/صور السياره_/IMG-20250717-WA0064.jpg',
      '/Cars/Genesis G80 - جينيسيس جي80/صور السياره_/IMG-20250717-WA0063.jpg',
      '/Cars/Genesis G80 - جينيسيس جي80/صور السياره_/IMG-20250717-WA0062.jpg',
      '/Cars/Genesis G80 - جينيسيس جي80/صور السياره_/IMG-20250717-WA0061.jpg',
      '/Cars/Genesis G80 - جينيسيس جي80/صور السياره_/IMG-20250717-WA0060.jpg',
      '/Cars/Genesis G80 - جينيسيس جي80/صور السياره_/IMG-20250717-WA0059.jpg',
      '/Cars/Genesis G80 - جينيسيس جي80/صور السياره_/IMG-20250717-WA0058.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '120,000 كم',
    rating: 4.4,
    features: [
      'كاملة',
      'أبيض راقى',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - GENESIS G80 موديل 2021\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 120,000 كم فقط\nالمواصفات: كاملة\nاللون: أبيض راقى\nتصميم فاخر ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 31,
    brand: 'فورد',
    model: 'Everest',
    year: 2024,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0072.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0071.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0070.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0073.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0076.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0075.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0074.jpg',
      '/Cars/Ford Everest - فورد ايفرست/صور السياره_/IMG-20250717-WA0077.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: '',
    mileage: '6,000 كم',
    rating: 4.1,
    features: [
      'كاملة',
      'أبيض ومن الداخل جلد بيج',
      'تصميم فخم ومميز',
      'الحالة: ممتازة جدًا',
      'تحت الضمان'
    ],
    description: `🚗 سياره للبيع - فورد ايفرست موديل 2024\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 6,000 كم فقط\nالمواصفات: كاملة\nاللون: أبيض ومن الداخل جلد بيج\nتصميم فخم ومميز\nتحت الضمان`,
    warranty: 'تحت الضمان',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 29,
    brand: 'بي إم دبليو',
    model: 'X4',
    year: 2015,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/BMW X4 - بي ام دابليو اكس4/صور السياره_/FB_IMG_1753071357671.jpg',
      '/Cars/BMW X4 - بي ام دابليو اكس4/صور السياره_/FB_IMG_1753071360930.jpg',
      '/Cars/BMW X4 - بي ام دابليو اكس4/صور السياره_/FB_IMG_1753071363944.jpg',
      '/Cars/BMW X4 - بي ام دابليو اكس4/صور السياره_/FB_IMG_1753071366944.jpg',
      '/Cars/BMW X4 - بي ام دابليو اكس4/صور السياره_/FB_IMG_1753071369858.jpg',
      '/Cars/BMW X4 - بي ام دابليو اكس4/صور السياره_/FB_IMG_1753071373032.jpg',
      '/Cars/BMW X4 - بي ام دابليو اكس4/صور السياره_/FB_IMG_1753071376016.jpg',
      '/Cars/BMW X4 - بي ام دابليو اكس4/صور السياره_/IMG_20250721_071644.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'أوتوماتيك',
    mileage: '120,000 كم',
    rating: 4.5,
    features: [
      'كاملة',
      'أسود أنيق',
      'محرك 4 سلندر',
      'تصميم رياضي فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - BMW X4 موديل 2015\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 120,000 كم فقط\nالمواصفات: كاملة\nاللون: أسود أنيق\nالمحرك: 4 سلندر\nتصميم رياضي فاخر ومميز`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 32,
    brand: 'فولكس فاجن',
    model: 'Beetle',
    year: 2015,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065714751.jpg',
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065710783.jpg',
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065706946.jpg',
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065703004.jpg',
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065700058.jpg',
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065721305.jpg',
      '/Cars/Volkswagen beetle - فولكس فاجن بيتل/صور السياره_/FB_IMG_1753065718282.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'أوتوماتيك',
    mileage: '113,000 كم',
    rating: 4.8,
    features: [
      '4 سلندر',
      'احمر خارجي',
      'بيج داخلي',
      'وارد قطر',
      'مالك أول',
      'الحالة: ممتازه جدا'
    ],
    description: `🚗 سياره للبيع\nفولكس فاجن بيتل عادي 2015\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازه جدا\nاللون: احمر خارجي ،بيج داخلي\nقاطع: 113,000 كم فقط\n4 سلندر - قير اوتوماتيك\nوارد قطر - مالك أول`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 33,
    brand: 'فورد',
    model: 'Mustang EcoBoost',
    year: 2019,
  price: 0,
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Ford Mustang EcoBoost - فورد موستنج ايكوبوست/صور السياره_/FB_IMG_1753066586933.jpg',
      '/Cars/Ford Mustang EcoBoost - فورد موستنج ايكوبوست/صور السياره_/FB_IMG_1753066582016.jpg',
      '/Cars/Ford Mustang EcoBoost - فورد موستنج ايكوبوست/صور السياره_/FB_IMG_1753066577890.jpg',
      '/Cars/Ford Mustang EcoBoost - فورد موستنج ايكوبوست/صور السياره_/FB_IMG_1753066574920.jpg',
      '/Cars/Ford Mustang EcoBoost - فورد موستنج ايكوبوست/صور السياره_/FB_IMG_1753066571810.jpg',
      '/Cars/Ford Mustang EcoBoost - فورد موستنج ايكوبوست/صور السياره_/FB_IMG_1753066568171.jpg',
      '/Cars/Ford Mustang EcoBoost - فورد موستنج ايكوبوست/صور السياره_/FB_IMG_1753066564445.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '68,000 كم',
    rating: 4.4,
    features: [
      'Turbo',
      'وارد أمريكا',
      'سقف بانوراما',
      'اصفر خارجي',
      'اسود داخلي',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - فورد موستنج EcoBoost موديل 2019\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 68,000 كم فقط\nاللون: اصفر خارجي اسود داخلي\nفئة Turbo- وارد أمريكا - سقف بانوراما\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 35,
    brand: 'سوزوكي',
    model: 'Jimny',
    year: 2018,
  price: 0, // تم إضافة السعر
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Suzuki jimny - سوزوكي جمني_/صور السياره_/IMG-20250717-WA0113.jpg',
      '/Cars/Suzuki jimny - سوزوكي جمني_/صور السياره_/IMG-20250717-WA0114.jpg',
      '/Cars/Suzuki jimny - سوزوكي جمني_/صور السياره_/IMG-20250717-WA0112.jpg',
      '/Cars/Suzuki jimny - سوزوكي جمني_/صور السياره_/IMG-20250717-WA0115.jpg',
      '/Cars/Suzuki jimny - سوزوكي جمني_/صور السياره_/IMG-20250717-WA0111.jpg',
      '/Cars/Suzuki jimny - سوزوكي جمني_/صور السياره_/IMG-20250717-WA0119.jpg',
      '/Cars/Suzuki jimny - سوزوكي جمني_/صور السياره_/IMG-20250717-WA0118.jpg',
      '/Cars/Suzuki jimny - سوزوكي جمني_/صور السياره_/IMG-20250717-WA0117.jpg',
      '/Cars/Suzuki jimny - سوزوكي جمني_/صور السياره_/IMG-20250717-WA0116.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '79,000 كم',
    rating: 4.2,
    features: [
      'كاملة',
      'أسود من الداخل مخمل اسود',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - سزوكي جمني موديل 2018\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 79,000 كم فقط\nالمواصفات: كاملة\nاللون: أسود من الداخل مخمل اسود\nتصميم فاخر ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 36,
    brand: 'تويوتا',
    model: 'برادو',
    year: 2022,
  price: 0, // تم إضافة السعر
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Toyota prado 2022 - تويوتا برادو/صور السياره_/FB_IMG_1753067924761.jpg',
      '/Cars/Toyota prado 2022 - تويوتا برادو/صور السياره_/FB_IMG_1753067921354.jpg',
      '/Cars/Toyota prado 2022 - تويوتا برادو/صور السياره_/FB_IMG_1753067918387.jpg',
      '/Cars/Toyota prado 2022 - تويوتا برادو/صور السياره_/FB_IMG_1753067915455.jpg',
      '/Cars/Toyota prado 2022 - تويوتا برادو/صور السياره_/FB_IMG_1753067912439.jpg',
      '/Cars/Toyota prado 2022 - تويوتا برادو/صور السياره_/FB_IMG_1753067909333.jpg',
      '/Cars/Toyota prado 2022 - تويوتا برادو/صور السياره_/FB_IMG_1753067905958.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '220,000 كم',
    rating: 4.1,
    features: [
      'ابيض من الداخل مخمل بيج',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - تويوتا برادو موديل 2022\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 220,000 كم\nاللون: ابيض من الداخل مخمل بيج\nتصميم فاخر ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 37,
    brand: 'تويوتا',
    model: 'برادو',
    year: 2015,
  price: 0, // تم إضافة السعر
    status: 'available',
    views: 0,
    inquiries: 0,
    images: [
      '/Cars/Toyota prado 2015 - تويوتا برادو_/صور السياره_/IMG_20250721_070708.jpg',
      '/Cars/Toyota prado 2015 - تويوتا برادو_/صور السياره_/FB_IMG_1753070802742.jpg',
      '/Cars/Toyota prado 2015 - تويوتا برادو_/صور السياره_/FB_IMG_1753070798907.jpg',
      '/Cars/Toyota prado 2015 - تويوتا برادو_/صور السياره_/FB_IMG_1753070795407.jpg'
    ],
    mainImageIndex: 0,
    fuel: 'بنزين',
    transmission: 'اوتوماتيك',
    mileage: '2,000 كم',
    rating: 4.0,
    features: [
      '6 سلندر',
      'صبغ الوكاله',
      'تصميم فاخر ومميز',
      'الحالة: ممتازة جدًا'
    ],
    description: `🚗 سياره للبيع - تويوتا برادو موديل 2015\nمن معرض اللوفر للسيارات 🔥\nالحالة: ممتازة جدًا\nقاطع: 2,000 كم فقط\nالمحرك: 6 سلندر\nصبغ الوكاله\nتصميم فاخر ومميز\nنوع الوقود: بنزين\nناقل الحركة: اوتوماتيك`,
    warranty: '',
    inspection: '',
    financing: false,
    exchange: false,
    maintenance: false,
    support247: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

export const CarsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>(() => initialCars);

  useEffect(() => {
    // لم نعد نخزن في localStorage
  }, [cars]);

  const addCar = (carData: Omit<Car, 'id' | 'views' | 'inquiries' | 'createdAt' | 'updatedAt'>) => {
    const newCar: Car = {
      ...carData,
      id: Math.max(...cars.map(c => c.id), 0) + 1,
      views: 0,
      inquiries: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCars(prev => [newCar, ...prev]);
    return newCar;
  };

  const updateCar = (id: number, carData: Partial<Car>) => {
    setCars(prev => prev.map(car => 
      car.id === id 
        ? { ...car, ...carData, updatedAt: new Date().toISOString() }
        : car
    ));
    return cars.find(car => car.id === id);
  };

  const deleteCar = (id: number) => {
    setCars(prev => prev.filter(car => car.id !== id));
  };

  const getCarById = (id: number) => {
    return cars.find(car => car.id === id);
  };

  const getAvailableCars = () => {
    return cars.filter(car => car.status === 'available');
  };

  const incrementViews = (id: number) => {
    setCars(prev => prev.map(car => 
      car.id === id 
        ? { ...car, views: car.views + 1, updatedAt: new Date().toISOString() }
        : car
    ));
  };

  const incrementInquiries = (id: number) => {
    setCars(prev => prev.map(car => 
      car.id === id 
        ? { ...car, inquiries: car.inquiries + 1, updatedAt: new Date().toISOString() }
        : car
    ));
  };

  const searchCars = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return cars.filter(car => 
      car.brand.toLowerCase().includes(lowercaseQuery) ||
      car.model.toLowerCase().includes(lowercaseQuery) ||
      car.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
    );
  };

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

  return (
    <CarsContext.Provider value={{
      cars,
      addCar,
      updateCar,
      deleteCar,
      getCarById,
      getAvailableCars,
      incrementViews,
      incrementInquiries,
      searchCars,
      filterCars
    }}>
      {children}
    </CarsContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarsContext);
  if (context === undefined) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
};