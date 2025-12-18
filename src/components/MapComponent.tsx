import React from 'react';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';

interface MapComponentProps {
  className?: string;
  height?: string;
  showInfo?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  className = '', 
  height = 'h-96',
  showInfo = false 
}) => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.2891!2d51.5074!3d25.2854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c5c5c5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2z2YXYudix2LYg2KfZhNmE2YjZgdix2Kkg2YTZhNiz2YrYp9ix2KfYqg!5e0!3m2!1sar!2sqa!4v1234567890";
  const directionsUrl = "https://maps.app.goo.gl/RJ6w7feVUsJqmbAD8";

  const openDirections = () => {
    window.open(directionsUrl, '_blank');
  };

  const openInGoogleMaps = () => {
    // Try to open in Google Maps app first, fallback to web
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Try to open in Google Maps app
      window.location.href = 'google.navigation:q=25.2854,51.5074';
      
      // Fallback to web version after a short delay
      setTimeout(() => {
        window.open(directionsUrl, '_blank');
      }, 1000);
    } else {
      window.open(directionsUrl, '_blank');
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${height}`}>
        {/* Map Header */}
        {showInfo && (
          <div className="bg-red-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="w-6 h-6" />
                <div>
                  <h3 className="font-bold">معرض اللوفر للسيارات</h3>
                  <p className="text-sm opacity-90">الدوحة، قطر</p>
                </div>
              </div>
              <button
                onClick={openDirections}
                className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 space-x-reverse"
              >
                <Navigation className="w-4 h-4" />
                <span>الاتجاهات</span>
              </button>
            </div>
          </div>
        )}

        {/* Map Iframe */}
        <div className={showInfo ? 'h-80' : 'h-full'}>
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="موقع معرض اللوفر للسيارات"
            className="w-full h-full"
          />
        </div>

        {/* Map Overlay Buttons */}
        <div className="absolute top-4 left-4 space-y-2">
          <button
            onClick={openDirections}
            className="bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            title="فتح في خرائط جوجل"
          >
            <Navigation className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => window.open('tel:+97466931144', '_self')}
            className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            title="اتصل بنا"
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Info Card */}
        {!showInfo && (
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
            <div className="flex items-start space-x-3 space-x-reverse">
              <MapPin className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <h4 className="font-bold text-gray-800 text-sm">معرض اللوفر للسيارات</h4>
                <p className="text-xs text-gray-600 mb-2">الدوحة، قطر</p>
                <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>مفتوح الآن</span>
                </div>
                <button
                  onClick={openDirections}
                  className="mt-2 text-red-600 hover:text-red-700 text-xs font-medium transition-colors"
                >
                  عرض الاتجاهات ←
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;