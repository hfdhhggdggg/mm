import React, { useState } from 'react';
import { Heart, Eye, Calendar, Fuel, Settings, Star, Car } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCars, Car as CarType } from '../contexts/CarsContext';
import CarDetailsModal from './CarDetailsModal';
import AllCarsPage from './AllCarsPage';

const FeaturedCars = () => {
  const { language, t } = useLanguage();
  const { cars, getAvailableCars, incrementViews, incrementInquiries } = useCars();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAllCars, setShowAllCars] = useState(false);

  // Helper function to translate car data based on current language
  const translateCarData = (car: CarType) => {
    
    const translations: { [key: string]: any } = {
      // Brands
      'مرسيدس': language === 'ar' ? 'مرسيدس' : 'Mercedes',
      'بي إم دبليو': language === 'ar' ? 'بي إم دبليو' : 'BMW',
      'أودي': language === 'ar' ? 'أودي' : 'Audi',
      'لكزس': language === 'ar' ? 'لكزس' : 'Lexus',
      'بورش': language === 'ar' ? 'بورش' : 'Porsche',
      'جاكوار': language === 'ar' ? 'جاكوار' : 'Jaguar',
      'تويوتا': language === 'ar' ? 'تويوتا' : 'Toyota',
      'هوندا': language === 'ar' ? 'هوندا' : 'Honda',
      
      // Fuel types
      'Petrol': language === 'ar' ? 'بنزين' : 'Petrol',
      'Hybrid': language === 'ar' ? 'هايبرد' : 'Hybrid',
      'Electric': language === 'ar' ? 'كهربائي' : 'Electric',
      'Diesel': language === 'ar' ? 'ديزل' : 'Diesel',
      
      // Transmission
      'Automatic': language === 'ar' ? 'أوتوماتيك' : 'Automatic',
      'Manual': language === 'ar' ? 'يدوي' : 'Manual',
      'CVT': language === 'ar' ? 'سي في تي' : 'CVT',
      
      // Features
      'فتحة سقف': language === 'ar' ? 'فتحة سقف' : 'Sunroof',
      'جلد طبيعي': language === 'ar' ? 'جلد طبيعي' : 'Leather Seats',
      'شاشة ذكية': language === 'ar' ? 'شاشة ذكية' : 'Smart Display',
      'نظام صوتي متطور': language === 'ar' ? 'نظام صوتي متطور' : 'Premium Sound',
      'دفع رباعي': language === 'ar' ? 'دفع رباعي' : 'All-Wheel Drive',
      'مقاعد جلد': language === 'ar' ? 'مقاعد جلد' : 'Leather Seats',
      'نظام ملاحة': language === 'ar' ? 'نظام ملاحة' : 'Navigation',
      'كاميرات 360': language === 'ar' ? 'كاميرات 360' : '360 Cameras',
      'مقاعد مساج': language === 'ar' ? 'مقاعد مساج' : 'Massage Seats',
      'إضاءة LED': language === 'ar' ? 'إضاءة LED' : 'LED Lighting',
      'نظام صوتي بوز': language === 'ar' ? 'نظام صوتي بوز' : 'Bose Sound',
      'قيادة ذاتية': language === 'ar' ? 'قيادة ذاتية' : 'Autopilot',
      'راحة فائقة': language === 'ar' ? 'راحة فائقة' : 'Ultimate Comfort',
      'تحكم مناخي': language === 'ar' ? 'تحكم مناخي' : 'Climate Control',
      'شحن لاسلكي': language === 'ar' ? 'شحن لاسلكي' : 'Wireless Charging',
      'نظام أمان متقدم': language === 'ar' ? 'نظام أمان متقدم' : 'Advanced Safety',
      'أداء رياضي': language === 'ar' ? 'أداء رياضي' : 'Sport Performance',
      'تصميم فاخر': language === 'ar' ? 'تصميم فاخر' : 'Luxury Design',
      'تقنيات متقدمة': language === 'ar' ? 'تقنيات متقدمة' : 'Advanced Tech',
      'محرك قوي': language === 'ar' ? 'محرك قوي' : 'Powerful Engine',
      'تصميم أنيق': language === 'ar' ? 'تصميم أنيق' : 'Elegant Design',
      'أداء متميز': language === 'ar' ? 'أداء متميز' : 'Excellent Performance',
      'راحة عالية': language === 'ar' ? 'راحة عالية' : 'High Comfort',
      'تقنيات ذكية': language === 'ar' ? 'تقنيات ذكية' : 'Smart Tech',
      'اقتصادية في الوقود': language === 'ar' ? 'اقتصادية في الوقود' : 'Fuel Efficient',
      'موثوقية عالية': language === 'ar' ? 'موثوقية عالية' : 'High Reliability',
      'مساحة واسعة': language === 'ar' ? 'مساحة واسعة' : 'Spacious Interior',
      'تقنيات أمان': language === 'ar' ? 'تقنيات أمان' : 'Safety Tech',
      'تصميم عصري': language === 'ar' ? 'تصميم عصري' : 'Modern Design',
      'اقتصادية': language === 'ar' ? 'اقتصادية' : 'Economical',
      'صيانة سهلة': language === 'ar' ? 'صيانة سهلة' : 'Easy Maintenance',
      'راحة في القيادة': language === 'ar' ? 'راحة في القيادة' : 'Comfortable Driving'
    };

    return {
      ...car,
      brand: translations[car.brand] || car.brand,
      model: t(car.model) || car.model
        .replace('cars.models.cclass2024', language === 'ar' ? 'سي كلاس 2024' : 'C-Class 2024')
        .replace('cars.models.x52023', language === 'ar' ? 'إكس 5 2023' : 'X5 2023')
        .replace('cars.models.a82024', language === 'ar' ? 'إيه 8 2024' : 'A8 2024')
        .replace('cars.models.ls5002023', language === 'ar' ? 'إل إس 500 2023' : 'LS 500 2023')
        .replace('cars.models.cayenne2024', language === 'ar' ? 'كايين 2024' : 'Cayenne 2024')
        .replace('cars.models.fpace2023', language === 'ar' ? 'إف بيس 2023' : 'F-Pace 2023')
        .replace('cars.models.camry2024', language === 'ar' ? 'كامري 2024' : 'Camry 2024')
        .replace('cars.models.accord2023', language === 'ar' ? 'أكورد 2023' : 'Accord 2023'),
      fuel: translations[car.fuel] || car.fuel,
      transmission: translations[car.transmission] || car.transmission,
      mileage: language === 'ar' ? car.mileage.replace('km', 'كم') : car.mileage.replace('كم', 'km'),
      features: car.features.map(feature => translations[feature] || feature)
    };
  };

  const toggleFavorite = (carId: number) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const handleViewDetails = (car: CarType) => {
    incrementViews(car.id);
    setSelectedCar(car);
    setShowDetailsModal(true);
  };

  const handleWhatsAppCall = (car: CarType) => {
    incrementInquiries(car.id);
    const message = `مرحباً، أنا مهتم بسيارة ${car.brand} ${car.model} بسعر ${car.price.toLocaleString()} ريال قطري. هل يمكنكم تزويدي بمزيد من التفاصيل؟`;
    const whatsappUrl = `https://wa.me/97466931144?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedCar(null);
  };

  // If showing all cars page, render it instead
  if (showAllCars) {
    return <AllCarsPage onBack={() => setShowAllCars(false)} />;
  }

  // الحصول على السيارات المتاحة من الكونتكست
  const availableCars = getAvailableCars().slice(0, 6); // عرض أول 6 سيارات متاحة

  // التحقق من وجود سيارات
  if (availableCars.length === 0) {
    return (
      <section id="cars" className="py-20 bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">{t('cars.title')}</h2>
            <div className="bg-gray-100 rounded-2xl p-12">
              <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد سيارات متاحة حالياً</h3>
              <p className="text-gray-500">سيتم إضافة سيارات جديدة قريباً</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Debugging availableCars
  console.log('Available Cars:', availableCars);

  return (
    <section id="cars" className="py-20 bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">{t('cars.title')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('cars.subtitle')}
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableCars.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              {(() => {
                const translatedCar = translateCarData(car);
                return (
                  <>
                    {/* Car Image */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={translatedCar.images && translatedCar.images.length > 0 ? (translatedCar.images[translatedCar.mainImageIndex] || translatedCar.images[0]) : 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800'} 
                        alt={`${translatedCar.brand} ${translatedCar.model}`}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Favorite Button */}
                      <button 
                        onClick={() => toggleFavorite(translatedCar.id)}
                        className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200"
                        aria-label={favorites.includes(translatedCar.id) ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                      >
                        <Heart 
                          className={`w-5 h-5 ${favorites.includes(translatedCar.id) ? 'text-red-600 fill-current' : 'text-gray-600'}`} 
                        />
                      </button>

                      {/* Rating Badge */}
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center space-x-1 space-x-reverse">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-semibold">{translatedCar.rating}</span>
                      </div>

                      {/* Status Badge */}
                      {translatedCar.status === 'reserved' && (
                        <div className="absolute bottom-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {language === 'ar' ? 'محجوزة' : 'Reserved'}
                        </div>
                      )}
                    </div>

                    {/* Car Details */}
                    <div className="p-6">
                      {/* Brand and Model */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{translatedCar.brand}</h3>
                          <p className="text-gray-600">{translatedCar.model}</p>
                        </div>
                        <div className="text-left">
                          <p className="text-2xl font-bold text-red-600">{translatedCar.price.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">{t('cars.qr')}</p>
                        </div>
                      </div>

                      {/* Car Specs */}
                      <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{translatedCar.year}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Fuel className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{translatedCar.fuel}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Settings className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{translatedCar.transmission}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {translatedCar.features.slice(0, 3).map((feature, index) => (
                            <span 
                              key={index}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {feature}
                            </span>
                          ))}
                          {translatedCar.features.length > 3 && (
                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                              +{translatedCar.features.length - 3} {t('cars.more')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleViewDetails(translatedCar)}
                          className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2 space-x-reverse"
                          aria-label={`عرض تفاصيل ${translatedCar.brand} ${translatedCar.model}`}
                        >
                          <Eye className="w-4 h-4" />
                          <span>{t('cars.viewDetails')}</span>
                        </button>
                        <button 
                          onClick={() => handleWhatsAppCall(translatedCar)}
                          className="px-4 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors duration-200"
                          aria-label={`الاتصال بخصوص ${translatedCar.brand} ${translatedCar.model}`}
                        >
                          {t('cars.call')}
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => setShowAllCars(true)}
            className="bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 transform hover:scale-105 transition-all duration-300"
            aria-label="عرض جميع السيارات المتاحة"
          >
            {t('cars.viewAll')}
          </button>
        </div>

        {/* Car Details Modal */}
        {selectedCar && (
          <CarDetailsModal
            car={selectedCar}
            isOpen={showDetailsModal}
            onClose={closeDetailsModal}
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;