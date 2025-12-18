import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Calendar, 
  Fuel, 
  Settings, 
  Gauge, 
  Shield, 
  Award,
  CheckCircle,
  Phone,
  MessageCircle,
  Heart,
  Share2,
  MapPin,
  Clock,
  DollarSign,
  Car as CarIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
  Users
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCars } from '../contexts/CarsContext';

import type { Car } from '../contexts/CarsContext';

interface CarDetailsModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ car, isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const { incrementInquiries } = useCars();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!isOpen) return null;

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close modal with Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleWhatsAppCall = () => {
    incrementInquiries(car.id);
    const message = `مرحباً، أنا مهتم بسيارة ${car.brand} ${car.model} بسعر ${car.price.toLocaleString()} ريال قطري. هل يمكنكم تزويدي بمزيد من التفاصيل؟`;
    const whatsappUrl = `https://wa.me/97466931144?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneCall = () => {
    incrementInquiries(car.id);
    window.open('tel:+97466931144', '_self');
  };

  const handleShare = () => {
    const shareData = {
      title: `${car.brand} ${car.model}`,
      text: `شاهد هذه السيارة الرائعة: ${car.brand} ${car.model} بسعر ${car.price} ريال قطري`,
      url: window.location.href
    };

    // Check if Web Share API is supported and sharing is allowed
    if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
      try {
        navigator.share(shareData);
      } catch (error) {
        // Fallback if share fails (permission denied, user cancellation, etc.)
        fallbackToClipboard();
      }
    } else {
      // Fallback for browsers that don't support Web Share API or sharing is not allowed
      fallbackToClipboard();
    }

    function fallbackToClipboard() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert('تم نسخ الرابط إلى الحافظة');
        }).catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = window.location.href;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('تم نسخ الرابط إلى الحافظة');
        });
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const nextImage = () => {
    if (car.images && car.images.length > 1) {
      setCurrentImageIndex(prev => prev < car.images!.length - 1 ? prev + 1 : 0);
    }
  };

  const prevImage = () => {
    if (car.images && car.images.length > 1) {
      setCurrentImageIndex(prev => prev > 0 ? prev - 1 : car.images!.length - 1);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const carSpecs = [
    { icon: Calendar, label: language === 'ar' ? 'سنة الصنع' : 'Year', value: car.year },
    { icon: Fuel, label: language === 'ar' ? 'نوع الوقود' : 'Fuel Type', value: car.fuel },
    { icon: Settings, label: language === 'ar' ? 'ناقل الحركة' : 'Transmission', value: car.transmission },
    { icon: Gauge, label: language === 'ar' ? 'المسافة المقطوعة' : 'Mileage', value: car.mileage },
    { icon: Eye, label: language === 'ar' ? 'المشاهدات' : 'Views', value: car.views },
    { icon: Users, label: language === 'ar' ? 'الاستفسارات' : 'Inquiries', value: car.inquiries },
  ];

  const carServices = [
    { icon: Shield, label: language === 'ar' ? 'ضمان شامل' : 'Full Warranty', description: car.warranty, available: true },
    { icon: Award, label: language === 'ar' ? 'فحص شامل' : 'Complete Inspection', description: car.inspection, available: true },
    { icon: DollarSign, label: language === 'ar' ? 'تمويل ميسر' : 'Easy Financing', description: language === 'ar' ? 'بأقل الفوائد' : 'Low Interest Rates', available: car.financing },
    { icon: CarIcon, label: language === 'ar' ? 'استبدال السيارة' : 'Car Exchange', description: language === 'ar' ? 'نقبل سيارتك القديمة' : 'We accept your old car', available: car.exchange },
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return language === 'ar' ? 'متاحة' : 'Available';
      case 'sold': return language === 'ar' ? 'مباعة' : 'Sold';
      case 'reserved': return language === 'ar' ? 'محجوزة' : 'Reserved';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{car.brand} {car.model}</h2>
            <div className="flex items-center space-x-2 space-x-reverse mt-2">
              {renderStars(car.rating)}
              <span className="text-gray-600 text-sm">({car.rating}/5)</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(car.status)}`}>
                {getStatusText(car.status)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={handleShare}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              title={language === 'ar' ? 'مشاركة' : 'Share'}
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              title={language === 'ar' ? 'إغلاق' : 'Close'}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Car Image */}
            <div className="space-y-4">
              <div className="relative">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                  </div>
                )}
                <img 
                  src={!imageError && car.images && car.images.length > 0 ? (car.images[currentImageIndex] || car.images[0]) : 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800'} 
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  onLoadStart={() => setImageLoading(true)}
                />
                
                {/* Image Navigation */}
                {car.images && car.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      title={language === 'ar' ? 'الصورة السابقة' : 'Previous image'}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      title={language === 'ar' ? 'الصورة التالية' : 'Next image'}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {car.images?.length || 1}
                    </div>
                  </>
                )}
                
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                  {car.price.toLocaleString()} {language === 'ar' ? 'ريال قطري' : 'QAR'}
                </div>
                <button className="absolute top-4 left-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-6 h-6 text-gray-600 hover:text-blue-600" />
                </button>
              </div>

              {/* Additional Images Thumbnails */}
              {car.images && car.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {car.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index ? 'border-red-600' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={language === 'ar' ? `صورة ${index + 1}` : `Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800';
                        }}
                      />
                    </button>
                  ))}
                  {car.images.length > 4 && (
                    <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-sm font-medium">
                      +{car.images.length - 4}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Car Details */}
            <div className="space-y-6">
              {/* Price and Quick Actions */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    {car.price.toLocaleString()} <span className="text-lg">{language === 'ar' ? 'ريال قطري' : 'QAR'}</span>
                  </div>
                  <p className="text-gray-600">{language === 'ar' ? 'السعر شامل جميع الرسوم' : 'Price includes all fees'}</p>
                </div>
                
                {car.status === 'available' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={handleWhatsAppCall}
                      className="bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                    </button>
                    <button 
                      onClick={handlePhoneCall}
                      className="bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                    >
                      <Phone className="w-5 h-5" />
                      <span>{language === 'ar' ? 'اتصال' : 'Call'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className={`inline-block px-6 py-3 rounded-lg font-semibold ${getStatusColor(car.status)}`}>
                      {car.status === 'sold' ? (language === 'ar' ? 'تم البيع' : 'Sold') : (language === 'ar' ? 'محجوزة' : 'Reserved')}
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      {car.status === 'sold' 
                        ? (language === 'ar' ? 'هذه السيارة تم بيعها' : 'This car has been sold') 
                        : (language === 'ar' ? 'هذه السيارة محجوزة حالياً' : 'This car is currently reserved')
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Car Specifications */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{language === 'ar' ? 'المواصفات الأساسية' : 'Basic Specifications'}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {carSpecs.map((spec, index) => (
                    <div key={index} className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
                      <div className="bg-red-600 p-2 rounded-full">
                        <spec.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{spec.label}</p>
                        <p className="font-semibold text-gray-800">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Car Features */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{language === 'ar' ? 'مميزات السيارة' : 'Car Features'}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 space-x-reverse">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{language === 'ar' ? 'خدماتنا المميزة' : 'Our Premium Services'}</h3>
                <div className="space-y-3">
                  {carServices.filter(service => service.available).map((service, index) => (
                    <div key={index} className="flex items-center space-x-3 space-x-reverse p-3 border border-gray-200 rounded-lg">
                      <div className="bg-red-100 p-2 rounded-full">
                        <service.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{service.label}</p>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Car Description */}
              {car.description && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{language === 'ar' ? 'وصف السيارة' : 'Car Description'}</h3>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {car.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {/* Location */}
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-800 mb-2">{language === 'ar' ? 'موقعنا' : 'Our Location'}</h4>
              <p className="text-gray-600 text-sm">{language === 'ar' ? 'الدوحة، قطر' : 'Doha, Qatar'}</p>
              <p className="text-gray-600 text-sm">{language === 'ar' ? 'معرض اللوفر للسيارات' : 'AL Louvre Car Showroom'}</p>
              <button 
                onClick={() => window.open('https://maps.app.goo.gl/RJ6w7feVUsJqmbAD8', '_blank')}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm transition-colors"
              >
                {language === 'ar' ? 'عرض على الخريطة ←' : 'View on Map →'}
              </button>
            </div>

            {/* Working Hours */}
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-800 mb-2">{language === 'ar' ? 'ساعات العمل' : 'Working Hours'}</h4>
              <p className="text-gray-600 text-sm">
                {language === 'ar' ? 'السبت - الخميس: 8ص - 10م' : 'Saturday - Thursday: 8AM - 10PM'}
              </p>
              <p className="text-gray-600 text-sm">
                {language === 'ar' ? 'الجمعة: 2م - 10م' : 'Friday: 2PM - 10PM'}
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-800 mb-2">{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h4>
              <p className="text-gray-600 text-sm">+974 6693 1144</p>
              <p className="text-gray-600 text-sm">{language === 'ar' ? 'خدمة 24/7' : '24/7 Service'}</p>
            </div>
          </div>

          {/* Final CTA */}
          {car.status === 'available' && (
            <div className="mt-8 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-2">
                {language === 'ar' ? 'مهتم بهذه السيارة؟' : 'Interested in this car?'}
              </h3>
              <p className="mb-4">
                {language === 'ar' ? 'تواصل معنا الآن للحصول على أفضل عرض' : 'Contact us now to get the best offer'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={handleWhatsAppCall}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{language === 'ar' ? 'راسلنا على واتساب' : 'Message us on WhatsApp'}</span>
                </button>
                <button 
                  onClick={handlePhoneCall}
                  className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <Phone className="w-5 h-5" />
                  <span>{language === 'ar' ? 'اتصل بنا الآن' : 'Call us now'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetailsModal;