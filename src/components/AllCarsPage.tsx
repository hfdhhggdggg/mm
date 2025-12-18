import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  Heart, 
  Eye, 
  Calendar, 
  Fuel, 
  Settings, 
  Star,
  ArrowLeft,
  X,
  
  Car as CarIcon
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCars, Car as CarType } from '../contexts/CarsContext';
import CarDetailsModal from './CarDetailsModal';

const AllCarsPage = ({ onBack }: { onBack: () => void }) => {
  const { language, t } = useLanguage();
  const { cars, incrementViews, incrementInquiries } = useCars();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [yearRange, setYearRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const brands = [...new Set(cars.map(car => car.brand))];
  const fuelTypes = [...new Set(cars.map(car => car.fuel))];
  const statusTypes = [...new Set(cars.map(car => car.status))];

  const filteredAndSortedCars = useMemo(() => {
  const filtered = cars.filter(car => {
      const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = !selectedBrand || car.brand === selectedBrand;
      const matchesFuel = !selectedFuel || car.fuel === selectedFuel;
      const matchesStatus = !selectedStatus || car.status === selectedStatus;
      const matchesMinPrice = !priceRange.min || car.price >= parseInt(priceRange.min);
      const matchesMaxPrice = !priceRange.max || car.price <= parseInt(priceRange.max);
      const matchesMinYear = !yearRange.min || car.year >= parseInt(yearRange.min);
      const matchesMaxYear = !yearRange.max || car.year <= parseInt(yearRange.max);

      return matchesSearch && matchesBrand && matchesFuel && 
             matchesStatus &&
             matchesMinPrice && matchesMaxPrice && 
             matchesMinYear && matchesMaxYear;
    });

    // Sort cars
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'year-new':
          return b.year - a.year;
        case 'year-old':
          return a.year - b.year;
        case 'rating':
          return b.rating - a.rating;
        case 'views':
          return b.views - a.views;
        case 'newest':
        default:
          return b.id - a.id;
      }
    });

    return filtered;
  }, [cars, searchTerm, selectedBrand, selectedFuel, selectedStatus, priceRange, yearRange, sortBy]);

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

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedFuel('');
    setSelectedStatus('');
    setPriceRange({ min: '', max: '' });
    setYearRange({ min: '', max: '' });
    setSortBy('newest');
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'متاحة';
      case 'sold': return 'مباعة';
      case 'reserved': return 'محجوزة';
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

  const renderCarCard = (car: CarType) => (
    <div key={car.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={car.images && car.images.length > 0 ? (car.images[car.mainImageIndex] || car.images[0]) : 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800'} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <button 
          onClick={() => toggleFavorite(car.id)}
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200"
        >
          <Heart 
            className={`w-5 h-5 ${favorites.includes(car.id) ? 'text-red-600 fill-current' : 'text-gray-600'}`} 
          />
        </button>

        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center space-x-1 space-x-reverse">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-semibold">{car.rating}</span>
        </div>

        {/* Status Badge */}
        <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(car.status)}`}>
          {getStatusText(car.status)}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{car.brand}</h3>
            <p className="text-gray-600">{car.model}</p>
          </div>
          <div className="text-left">
            <p className="text-2xl font-bold text-red-600">{car.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500">{t('cars.qr')}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{car.year}</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Fuel className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{car.fuel}</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Settings className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{car.transmission}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {car.features.slice(0, 2).map((feature: string, index: number) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {feature}
              </span>
            ))}
            {car.features.length > 2 && (
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                +{car.features.length - 2} {t('cars.more')}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => handleViewDetails(car)}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2 space-x-reverse"
          >
            <Eye className="w-4 h-4" />
            <span>{t('cars.viewDetails')}</span>
          </button>
          <button 
            onClick={() => handleWhatsAppCall(car)}
            className="px-4 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors duration-200"
          >
            {t('cars.call')}
          </button>
        </div>
      </div>
    </div>
  );

  const renderCarListItem = (car: CarType) => (
    <div key={car.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-80 h-64 md:h-auto overflow-hidden">
          <img 
            src={car.images && car.images.length > 0 ? (car.images[car.mainImageIndex] || car.images[0]) : 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800'} 
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800';
            }}
          />
          <button 
            onClick={() => toggleFavorite(car.id)}
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-200"
          >
            <Heart 
              className={`w-5 h-5 ${favorites.includes(car.id) ? 'text-red-600 fill-current' : 'text-gray-600'}`} 
            />
          </button>
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center space-x-1 space-x-reverse">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">{car.rating}</span>
          </div>
          <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(car.status)}`}>
            {getStatusText(car.status)}
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{car.brand}</h3>
              <p className="text-lg text-gray-600">{car.model}</p>
            </div>
            <div className="text-left">
              <p className="text-3xl font-bold text-red-600">{car.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{t('cars.qr')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">{car.year}</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Fuel className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">{car.fuel}</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Settings className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">{car.transmission}</span>
            </div>
            <div className="text-gray-600">{car.mileage}</div>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature: string, index: number) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => handleViewDetails(car)}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2 space-x-reverse"
            >
              <Eye className="w-4 h-4" />
              <span>{t('cars.viewDetails')}</span>
            </button>
            <button 
              onClick={() => handleWhatsAppCall(car)}
              className="px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors duration-200"
            >
              {t('cars.call')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
                <span>العودة</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-800">جميع السيارات</h1>
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                {filteredAndSortedCars.length} سيارة
              </span>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">البحث والفلترة</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-600 hover:text-blue-600"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="ابحث عن سيارة..."
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الماركة</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">جميع الماركات</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Fuel Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع الوقود</label>
                  <select
                    value={selectedFuel}
                    onChange={(e) => setSelectedFuel(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">جميع الأنواع</option>
                    {fuelTypes.map(fuel => (
                      <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">حالة السيارة</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">جميع الحالات</option>
                    {statusTypes.map(status => (
                      <option key={status} value={status}>{getStatusText(status)}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نطاق السعر (ريال قطري)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      placeholder="من"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                        placeholder="إلى"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Year Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">سنة الصنع</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={yearRange.min}
                      onChange={(e) => setYearRange(prev => ({ ...prev, min: e.target.value }))}
                      placeholder="من"
                      min="2000"
                      max="2024"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={yearRange.max}
                      onChange={(e) => setYearRange(prev => ({ ...prev, max: e.target.value }))}
                      placeholder="إلى"
                      min="2000"
                      max="2024"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ترتيب حسب</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="newest">الأحدث</option>
                    <option value="price-low">السعر: من الأقل للأعلى</option>
                    <option value="price-high">السعر: من الأعلى للأقل</option>
                    <option value="year-new">السنة: الأحدث أولاً</option>
                    <option value="year-old">السنة: الأقدم أولاً</option>
                    <option value="rating">التقييم الأعلى</option>
                    <option value="views">الأكثر مشاهدة</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <X className="w-4 h-4" />
                  <span>مسح الفلاتر</span>
                </button>
              </div>
            </div>
          </div>

          {/* Cars Grid/List */}
          <div className="flex-1">
            {filteredAndSortedCars.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <CarIcon className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد سيارات</h3>
                <p className="text-gray-500">جرب تغيير معايير البحث أو الفلترة</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  مسح جميع الفلاتر
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-8' 
                  : 'space-y-6'
              }>
                {filteredAndSortedCars.map(car => 
                  viewMode === 'grid' ? renderCarCard(car) : renderCarListItem(car)
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedCar(null);
          }}
        />
      )}
    </div>
  );
};

export default AllCarsPage;