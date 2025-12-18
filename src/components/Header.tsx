import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg relative z-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Top Bar */}
  <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* small logo in top bar (drop-in image at /logo.png) */}
              <img
                src="/logo.png"
                alt="AL LOUVER"
                className="w-4 h-auto rounded-md shadow-sm object-contain"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/favicon.jpg'; }}
              />
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <button 
                onClick={() => toggleLanguage()}
                className="flex items-center space-x-2 space-x-reverse hover:text-blue-600 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'ar' ? 'English' : 'العربية'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            {/* main logo image - place your file at /public/logo.png */}
            <img
              src="/logo.png"
              alt="AL LOUVER"
              className="w-16 h-auto object-contain rounded-md shadow"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/favicon.jpg'; }}
            />
            <div className="mr-3">
              <h1 className="text-xl font-bold text-gray-800">{t('header.title')}</h1>
              <p className="text-sm text-gray-600">{t('header.subtitle')}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            <a href="#home" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">{t('header.home')}</a>
            <a href="#cars" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">{t('header.cars')}</a>

            <a href="#testimonials" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">{t('header.testimonials')}</a>
            <a href="#request" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">{t('header.request')}</a>
            <a href="#contact" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">{t('header.contact')}</a>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button className="bg-brand-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              {t('header.cta')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="lg:hidden">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">{t('header.home')}</a>
              <a href="#cars" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">{t('header.cars')}</a>

              <a href="#testimonials" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">{t('header.testimonials')}</a>
              <a href="#request" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">{t('header.request')}</a>
              <a href="#contact" className="text-gray-800 hover:text-blue-600 font-medium transition-colors">{t('header.contact')}</a>
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors w-full">
                {t('header.cta')}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;