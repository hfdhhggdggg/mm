import React, { useState } from 'react';
import { 
  Car, 
  Search, 
  DollarSign, 
  Calendar, 
  Fuel, 
  Settings, 
  User, 
  Phone, 
  Mail, 
  MessageCircle,
  CheckCircle,
  Send,
  Star,
  Shield,
  Award
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CarRequestSection = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    carBrand: '',
    carModel: '',
    year: '',
    budget: '',
    fuelType: '',
    transmission: '',
    color: '',
    features: [] as string[],
    notes: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter(f => f !== feature)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Send WhatsApp message
      const message = `طلب سيارة جديد:
الاسم: ${formData.name}
الهاتف: ${formData.phone}
البريد الإلكتروني: ${formData.email}

تفاصيل السيارة المطلوبة:
الماركة: ${formData.carBrand}
الموديل: ${formData.carModel}
السنة: ${formData.year}
الميزانية: ${formData.budget} ريال قطري
نوع الوقود: ${formData.fuelType}
ناقل الحركة: ${formData.transmission}
اللون المفضل: ${formData.color}
المميزات المطلوبة: ${formData.features.join(', ')}
ملاحظات إضافية: ${formData.notes}
مستوى الأولوية: ${formData.urgency === 'urgent' ? 'عاجل' : formData.urgency === 'normal' ? 'عادي' : 'غير عاجل'}`;
      
      const whatsappUrl = `https://wa.me/97466931144?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // Send email
      const emailSubject = `طلب سيارة جديد من ${formData.name}`;
      const emailBody = `طلب سيارة جديد:

معلومات العميل:
الاسم: ${formData.name}
الهاتف: ${formData.phone}
البريد الإلكتروني: ${formData.email}

تفاصيل السيارة المطلوبة:
الماركة: ${formData.carBrand || 'غير محدد'}
الموديل: ${formData.carModel || 'غير محدد'}
السنة: ${formData.year || 'غير محدد'}
الميزانية: ${formData.budget ? formData.budget + ' ريال قطري' : 'غير محدد'}
نوع الوقود: ${formData.fuelType || 'غير محدد'}
ناقل الحركة: ${formData.transmission || 'غير محدد'}
اللون المفضل: ${formData.color || 'غير محدد'}
المميزات المطلوبة: ${formData.features.length > 0 ? formData.features.join(', ') : 'لا توجد'}
ملاحظات إضافية: ${formData.notes || 'لا توجد'}
مستوى الأولوية: ${formData.urgency === 'urgent' ? 'عاجل (خلال 3 أيام)' : formData.urgency === 'normal' ? 'عادي (خلال أسبوع)' : 'مرن (خلال شهر)'}

تاريخ الطلب: ${new Date().toLocaleDateString('ar-EG')}
وقت الطلب: ${new Date().toLocaleTimeString('ar-EG')}`;

      const emailUrl = `mailto:mohamedali1289g@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(emailUrl, '_blank');
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          carBrand: '',
          carModel: '',
          year: '',
          budget: '',
          fuelType: '',
          transmission: '',
          color: '',
          features: [],
          notes: '',
          urgency: 'normal'
        });
      }, 3000);
    }, 1000);
  };

  const carBrands = [
    'مرسيدس', 'BMW', 'أودي', 'لكزس', 'بورش', 'جاكوار', 'تويوتا', 'هوندا', 
    'نيسان', 'هيونداي', 'كيا', 'فولكس واجن', 'فورد', 'شيفروليه', 'جيب', 'لاند روفر'
  ];

  const availableFeatures = [
    {
      key: 'sunroof',
      ar: 'فتحة سقف',
      en: 'Sunroof'
    },
    {
      key: 'leather',
      ar: 'جلد طبيعي',
      en: 'Genuine Leather'
    },
    {
      key: 'smartScreen',
      ar: 'شاشة ذكية',
      en: 'Smart Display'
    },
    {
      key: 'soundSystem',
      ar: 'نظام صوتي متطور',
      en: 'Premium Sound System'
    },
    {
      key: 'awd',
      ar: 'دفع رباعي',
      en: 'All-Wheel Drive'
    },
    {
      key: 'leatherSeats',
      ar: 'مقاعد جلد',
      en: 'Leather Seats'
    },
    {
      key: 'navigation',
      ar: 'نظام ملاحة',
      en: 'Navigation System'
    },
    {
      key: 'camera360',
      ar: 'كاميرات 360',
      en: '360° Cameras'
    },
    {
      key: 'massageSeats',
      ar: 'مقاعد مساج',
      en: 'Massage Seats'
    },
    {
      key: 'ledLights',
      ar: 'إضاءة LED',
      en: 'LED Lighting'
    },
    {
      key: 'boseSound',
      ar: 'نظام صوتي بوز',
      en: 'Bose Sound System'
    },
    {
      key: 'autopilot',
      ar: 'قيادة ذاتية',
      en: 'Autopilot'
    },
    {
      key: 'comfort',
      ar: 'راحة فائقة',
      en: 'Ultimate Comfort'
    },
    {
      key: 'climateControl',
      ar: 'تحكم مناخي',
      en: 'Climate Control'
    },
    {
      key: 'wirelessCharging',
      ar: 'شحن لاسلكي',
      en: 'Wireless Charging'
    },
    {
      key: 'safetySystem',
      ar: 'نظام أمان متقدم',
      en: 'Advanced Safety System'
    }
  ];

  const services = [
    {
      icon: Search,
      title: t('request.customSearch'),
      description: t('request.customSearchDesc')
    },
    {
      icon: Shield,
      title: t('request.fullWarranty'),
      description: t('request.fullWarrantyDesc')
    },
    {
      icon: Award,
      title: t('request.bestPrices'),
      description: t('request.bestPricesDesc')
    },
    {
      icon: MessageCircle,
      title: t('request.continuousFollow'),
      description: t('request.continuousFollowDesc')
    }
  ];

  return (
    <section id="request" className="py-20 bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">{t('request.title')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('request.subtitle')}
          </p>
        </div>

        {/* Services Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-50 p-6 rounded-2xl hover:bg-red-50 transition-colors duration-300">
                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Request Form */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('request.fillRequest')}</h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{t('request.success')}</h4>
                <p className="text-gray-600">{t('request.successDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{t('request.personalInfo')}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('request.fullName')} *
                      </label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder={t('request.enterName')}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('request.phoneNumber')} *
                      </label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder={t('request.enterPhone')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('request.email')}</label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder={t('request.enterEmail')}
                      />
                    </div>
                  </div>
                </div>

                {/* Car Specifications */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{t('request.carSpecs')}</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('request.preferredBrand')}</label>
                      <select
                        name="carBrand"
                        value={formData.carBrand}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">{t('request.chooseBrand')}</option>
                        {carBrands.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('request.model')}</label>
                      <input
                        type="text"
                        name="carModel"
                        value={formData.carModel}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder={t('request.enterModel')}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('request.preferredYear')}</label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">{t('request.chooseYear')}</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('request.fuelType')}</label>
                      <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">{t('request.chooseFuel')}</option>
                        <option value="بنزين">{language === 'ar' ? 'بنزين' : 'Petrol'}</option>
                        <option value="هايبرد">{language === 'ar' ? 'هايبرد' : 'Hybrid'}</option>
                        <option value="كهربائي">{language === 'ar' ? 'كهربائي' : 'Electric'}</option>
                        <option value="ديزل">{language === 'ar' ? 'ديزل' : 'Diesel'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('request.transmission')}</label>
                      <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">{t('request.chooseTransmission')}</option>
                        <option value="أوتوماتيك">{language === 'ar' ? 'أوتوماتيك' : 'Automatic'}</option>
                        <option value="يدوي">{language === 'ar' ? 'يدوي' : 'Manual'}</option>
                        <option value="CVT">CVT</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('request.budget')}
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="number"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder={t('request.enterBudget')}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('request.preferredColor')}</label>
                      <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder={t('request.enterColor')}
                      />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{t('request.requiredFeatures')}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableFeatures.map((feature) => {
                      const featureText = language === 'ar' ? feature.ar : feature.en;
                      const featureValue = feature.ar; // Always use Arabic as the value for consistency
                      
                      return (
                      <label key={feature.key} className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="checkbox"
                          checked={formData.features.includes(featureValue)}
                          onChange={(e) => handleFeatureChange(featureValue, e.target.checked)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{featureText}</span>
                      </label>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('request.additionalNotes')}</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    placeholder={t('request.enterNotes')}
                  />
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('request.priorityLevel')}</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="normal">{t('request.normal')}</option>
                    <option value="urgent">{t('request.urgent')}</option>
                    <option value="flexible">{t('request.flexible')}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('request.sending')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('request.sendRequest')}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Information Panel */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('request.whyChoose')}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-red-100 p-2 rounded-full mt-1">
                    <Search className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">{t('request.comprehensiveSearch')}</h4>
                    <p className="text-gray-600 text-sm">{t('request.comprehensiveSearchDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-red-100 p-2 rounded-full mt-1">
                    <DollarSign className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">{t('request.bestPrices')}</h4>
                    <p className="text-gray-600 text-sm">{t('request.bestPricesDesc2')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-red-100 p-2 rounded-full mt-1">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">{t('request.comprehensiveInspection')}</h4>
                    <p className="text-gray-600 text-sm">{t('request.comprehensiveInspectionDesc')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-red-100 p-2 rounded-full mt-1">
                    <MessageCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">{t('request.continuousFollow')}</h4>
                    <p className="text-gray-600 text-sm">{t('request.continuousFollowDesc2')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-red-600 text-white p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">{t('request.needHelp')}</h3>
              <p className="mb-6">{t('request.needHelpDesc')}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => window.open('https://wa.me/97466931144', '_blank')}
                  className="bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                </button>
                <button 
                  onClick={() => window.open('tel:+97466931144', '_self')}
                  className="bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <Phone className="w-5 h-5" />
                  <span>{language === 'ar' ? 'اتصال' : 'Call'}</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100">
                <div className="text-3xl font-bold text-red-600 mb-2">2,500+</div>
                <div className="text-gray-600 text-sm">{t('request.requestsCompleted')}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100">
                <div className="text-3xl font-bold text-red-600 mb-2">98%</div>
                <div className="text-gray-600 text-sm">{t('request.satisfactionRate')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarRequestSection;