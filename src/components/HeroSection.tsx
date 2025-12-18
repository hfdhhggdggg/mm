import React from 'react';
import { ArrowLeft, Star, Shield, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSection = () => {
  const { language, t } = useLanguage();

  return (
    <section id="home" className="relative bg-gradient-to-r from-gray-900 to-black text-white py-20 overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg" 
          alt="سيارات فاخرة" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
                {t('hero.title')}<br />
                <span className="text-red-600">{t('hero.subtitle')}</span>
              </h1>
              
            </div>

            {/* Features */}
            <div className={`flex flex-wrap gap-6 ${language === 'ar' ? 'justify-start' : 'justify-start'}`}>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-red-600 p-2 rounded-full">
                  <Star className="w-5 h-5" />
                </div>
                <span className="font-semibold">{t('hero.bestPrices')}</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-red-600 p-2 rounded-full">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-semibold">{t('hero.warranty')}</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-red-600 p-2 rounded-full">
                  <Award className="w-5 h-5" />
                </div>
                <span className="font-semibold">{t('hero.service')}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  const carsSection = document.getElementById('cars');
                  if (carsSection) {
                    carsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 space-x-reverse"
              >
                <span>{t('hero.browseCars')}</span>
                <ArrowLeft className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </button>
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                {t('hero.contactUs')}
              </button>
            </div>
          </div>

          {/* Image/Video Placeholder */}
          <div className="relative">
            <div className="bg-red-600/20 backdrop-blur-sm p-8 rounded-2xl border border-red-600/30">
              <img 
                src="https://i.postimg.cc/Gm5qZYVt/Whats-App-Image-2025-10-25-at-7-02-56-PM.jpg" 
                alt="سيارة فاخرة" 
                className="w-full h-80 object-cover rounded-xl"
              />
              <div className="absolute -top-4 -right-4 bg-red-600 text-white p-4 rounded-full shadow-lg">
                <Star className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 bg-red-600/20 p-4 rounded-full animate-bounce hidden lg:block">
        <Award className="w-6 h-6 text-red-600" />
      </div>
      <div className="absolute bottom-20 left-10 bg-white/20 p-4 rounded-full animate-pulse hidden lg:block">
        <Shield className="w-6 h-6 text-white" />
      </div>
    </section>
  );
};

export default HeroSection;