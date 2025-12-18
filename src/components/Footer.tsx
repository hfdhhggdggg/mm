import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  MessageCircle,
  Clock,
  Car,
  Shield,
  Award,
  ArrowUp
} from 'lucide-react';
import MapComponent from './MapComponent';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: t('header.home'), href: '#home' },
    { name: t('header.cars'), href: '#cars' },
    { name: t('header.about'), href: '#about' },
    { name: t('header.testimonials'), href: '#testimonials' },
    { name: t('header.request'), href: '#request' },
    { name: t('header.contact'), href: '#contact' }
  ];

  const services = [
    { name: t('footer.carSales'), icon: Car },
    { name: t('footer.comprehensiveWarranty'), icon: Shield },
    { name: t('footer.excellentService'), icon: Award },
    { name: t('footer.periodicMaintenance'), icon: Clock }
  ];

  return (
    <footer className="bg-black text-white relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="bg-red-600 text-white p-3 rounded-lg">
                <span className="text-xl font-bold">اللوفر</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('header.title')}</h3>
                <p className="text-gray-300">{t('footer.dohaQatar')}</p>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 space-x-reverse">
              <a 
                href="https://www.facebook.com/share/1F7P92yjMn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/m3rdlouver1?igsh=MWh1ZzhwOHpqcGtobw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/97466931144" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2 space-x-reverse"
                  >
                    <span>←</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6">{t('footer.services')}</h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.name} className="flex items-center space-x-3 space-x-reverse">
                  <div className="bg-red-600 p-2 rounded-full">
                    <service.icon className="w-4 h-4" />
                  </div>
                  <span className="text-gray-300">{service.name}</span>
                </li>
              ))}
            </ul>

            {/* Working Hours */}
            <div className="mt-8">
              <h5 className="font-semibold mb-3 flex items-center space-x-2 space-x-reverse">
                <Clock className="w-5 h-5 text-red-600" />
                <span>{t('footer.workingHours')}</span>
              </h5>
              <div className="text-gray-300 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>{t('footer.satThu')}</span>
                  <span>{t('footer.satThuTime')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('footer.friday')}</span>
                  <span>{t('footer.fridayTime')}</span>
                </div>
                <div className="text-red-600 font-medium mt-2">
                  {t('footer.support247')}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">{t('footer.contactUs')}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-red-600 p-2 rounded-full mt-1">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium">{t('footer.phone')}</p>
                  <p className="text-gray-300">+974 6693 1144</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-red-600 p-2 rounded-full mt-1">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium">{t('footer.email')}</p>
                  <p className="text-gray-300">
                    {t('footer.emailLabel')}: 
                    <a href="mailto:m3rdlouver1@gmail.com" className="underline hover:text-blue-400 transition-colors">m3rdlouver1@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-red-600 p-2 rounded-full mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium">{t('footer.location')}</p>
                  <p className="text-gray-300">الدوحة، قطر</p>
                  <a 
                    href="https://maps.app.goo.gl/RJ6w7feVUsJqmbAD8"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-400 text-sm transition-colors"
                  >
                    {t('footer.viewMap')} ←
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-6">
              <a 
                href="https://wa.me/97466931144" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2 space-x-reverse w-full"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t('footer.whatsapp')}</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-right">
              {t('footer.copyright')}
            </div>
            
            <div className="flex items-center space-x-6 space-x-reverse text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-blue-600 transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#terms" className="text-gray-400 hover:text-blue-600 transition-colors">
                {t('footer.terms')}
              </a>
              <a href="#sitemap" className="text-gray-400 hover:text-blue-600 transition-colors">
                {t('footer.sitemap')}
              </a>
            </div>

            <div className="text-gray-400 text-sm flex items-center space-x-2 space-x-reverse">
              <span>{t('footer.madeWith')}</span>
              <span className="text-blue-600">💙</span>
              <span>{t('footer.inQatar')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 left-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-110 z-50"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/97466931144"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-50 animate-pulse"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </footer>
  );
};

export default Footer;