import React, { useState, useEffect } from 'react';
import { Car, Users, Calendar, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCars } from '../contexts/CarsContext';

const StatsSection = () => {
  const { language, t } = useLanguage();
  const { cars, getAvailableCars } = useCars();
  const [stats, setStats] = useState({
    cars: 0,
    customers: 0,
    experience: 0,
    warranty: 0
  });

  const finalStats = {
    cars: getAvailableCars().length,
    customers: 2500,
    experience: 15,
    warranty: 100
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = {
      cars: finalStats.cars / steps,
      customers: finalStats.customers / steps,
      experience: finalStats.experience / steps,
      warranty: finalStats.warranty / steps
    };

    const timer = setInterval(() => {
      setStats(prevStats => {
        const newStats = {
          cars: Math.min(finalStats.cars, Math.floor(prevStats.cars + increment.cars)),
          customers: Math.min(finalStats.customers, Math.floor(prevStats.customers + increment.customers)),
          experience: Math.min(finalStats.experience, Math.floor(prevStats.experience + increment.experience)),
          warranty: Math.min(finalStats.warranty, Math.floor(prevStats.warranty + increment.warranty))
        };

        if (newStats.cars >= finalStats.cars && 
            newStats.customers >= finalStats.customers && 
            newStats.experience >= finalStats.experience && 
            newStats.warranty >= finalStats.warranty) {
          clearInterval(timer);
        }

        return newStats;
      });
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // تحديث الإحصائيات عند تغيير السيارات
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      cars: getAvailableCars().length
    }));
  }, [cars, getAvailableCars]);

  const statItems = [
    {
      icon: Car,
      number: stats.cars,
      suffix: '+',
      title: t('stats.availableCars'),
      description: t('stats.availableCarsDesc')
    },
    {
      icon: Users,
      number: stats.customers,
      suffix: '+',
      title: t('stats.happyCustomers'),
      description: t('stats.happyCustomersDesc')
    },
    {
      icon: Calendar,
      number: stats.experience,
      suffix: '',
      title: t('stats.experience'),
      description: t('stats.experienceDesc')
    },
    {
      icon: Shield,
      number: stats.warranty,
      suffix: '+',
      title: t('stats.warranty'),
      description: t('stats.warrantyDesc')
    }
  ];

  return (
    <section className="py-16 bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('stats.title')}</h2>
          <p className="text-xl text-gray-600">{t('stats.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {item.number}{item.suffix}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;