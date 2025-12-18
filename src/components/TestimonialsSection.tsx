import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TestimonialsSection = () => {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: t('testimonials.customer1.name'),
      location: t('testimonials.customer1.location'),
      rating: 5,
      text: t('testimonials.customer1.text'),
      car: t('testimonials.customer1.car'),
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
    },
    {
      id: 2,
      name: t('testimonials.customer2.name'),
      location: t('testimonials.customer2.location'),
      rating: 5,
      text: t('testimonials.customer2.text'),
      car: t('testimonials.customer2.car'),
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
    },
    {
      id: 3,
      name: t('testimonials.customer3.name'),
      location: t('testimonials.customer3.location'),
      rating: 5,
      text: t('testimonials.customer3.text'),
      car: t('testimonials.customer3.car'),
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
    },
    {
      id: 4,
      name: t('testimonials.customer4.name'),
      location: t('testimonials.customer4.location'),
      rating: 5,
      text: t('testimonials.customer4.text'),
      car: t('testimonials.customer4.car'),
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg'
    },
    {
      id: 5,
      name: t('testimonials.customer5.name'),
      location: t('testimonials.customer5.location'),
      rating: 5,
      text: t('testimonials.customer5.text'),
      car: t('testimonials.customer5.car'),
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">{t('testimonials.title')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-red-600 opacity-20">
              <Quote className="w-16 h-16" />
            </div>

            {/* Current Testimonial */}
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Customer Image */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
                    <img 
                      src={testimonials[currentSlide].image} 
                      alt={testimonials[currentSlide].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 text-center md:text-right">
                  {/* Rating */}
                  <div className="flex justify-center md:justify-start mb-4 space-x-1 space-x-reverse">
                    {renderStars(testimonials[currentSlide].rating)}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-6">
                    "{testimonials[currentSlide].text}"
                  </blockquote>

                  {/* Customer Info */}
                  <div className="border-t pt-6">
                    <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">
                          {testimonials[currentSlide].name}
                        </h4>
                        <p className="text-gray-600">{testimonials[currentSlide].location}</p>
                      </div>
                      <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        {testimonials[currentSlide].car}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2 space-x-reverse">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-red-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="text-3xl font-bold text-red-600 mb-2">4.9</div>
            <div className="text-gray-600">{t('testimonials.avgRating')}</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="text-3xl font-bold text-red-600 mb-2">2,500+</div>
            <div className="text-gray-600">{t('testimonials.happyCustomers')}</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="text-3xl font-bold text-red-600 mb-2">98%</div>
            <div className="text-gray-600">{t('testimonials.satisfaction')}</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="text-3xl font-bold text-red-600 mb-2">15+</div>
            <div className="text-gray-600">{t('testimonials.experience')}</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('testimonials.shareExperience')}</h3>
          <p className="text-gray-600 mb-6">{t('testimonials.shareDesc')}</p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-300">
            {t('testimonials.writeReview')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;