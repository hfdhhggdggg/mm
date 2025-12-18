import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Image as ImageIcon, 
  Move, 
  Star,
  Eye,
  Phone,
  ChevronLeft,
  ChevronRight,
  GripVertical
} from 'lucide-react';
import { useCars, Car } from '../contexts/CarsContext';

interface CarFormData {
  brand: string;
  model: string;
  year: number;
  price: number;
  status: 'available' | 'sold' | 'reserved';
  fuel: string;
  transmission: string;
  mileage: string;
  rating: number;
  features: string[];
  description: string;
  warranty: string;
  inspection: string;
  financing: boolean;
  exchange: boolean;
  maintenance: boolean;
  support247: boolean;
  images: string[];
  mainImageIndex: number;
}

const CarManagement = () => {
  const { cars, addCar, updateCar, deleteCar } = useCars();
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<CarFormData>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    status: 'available',
    fuel: 'بنزين',
    transmission: 'أوتوماتيك',
    mileage: '0 كم',
    rating: 4.5,
    features: [],
    description: '',
    warranty: 'سنتين أو 100,000 كم',
    inspection: '142 نقطة فحص',
    financing: true,
    exchange: true,
    maintenance: true,
    support247: true,
    images: [],
    mainImageIndex: 0
  });

  const resetForm = () => {
    setFormData({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      status: 'available',
      fuel: 'بنزين',
      transmission: 'أوتوماتيك',
      mileage: '0 كم',
      rating: 4.5,
      features: [],
      description: '',
      warranty: 'سنتين أو 100,000 كم',
      inspection: '142 نقطة فحص',
      financing: true,
      exchange: true,
      maintenance: true,
      support247: true,
      images: [],
      mainImageIndex: 0
    });
    setEditingCar(null);
    setShowForm(false);
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      status: car.status,
      fuel: car.fuel,
      transmission: car.transmission,
      mileage: car.mileage,
      rating: car.rating,
      features: [...car.features],
      description: car.description,
      warranty: car.warranty,
      inspection: car.inspection,
      financing: car.financing,
      exchange: car.exchange,
      maintenance: car.maintenance,
      support247: car.support247,
      images: [...car.images],
      mainImageIndex: car.mainImageIndex
    });
    setShowForm(true);
  };

  const handleDelete = (carId: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذه السيارة؟')) {
      deleteCar(carId);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, imageUrl]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newImages = prev.images.filter((_, i) => i !== index);
      const newMainIndex = prev.mainImageIndex >= newImages.length ? 0 : 
                          prev.mainImageIndex > index ? prev.mainImageIndex - 1 : prev.mainImageIndex;
      return {
        ...prev,
        images: newImages,
        mainImageIndex: newMainIndex
      };
    });
  };

  const setMainImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mainImageIndex: index
    }));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      
      let newMainIndex = prev.mainImageIndex;
      if (prev.mainImageIndex === fromIndex) {
        newMainIndex = toIndex;
      } else if (fromIndex < prev.mainImageIndex && toIndex >= prev.mainImageIndex) {
        newMainIndex = prev.mainImageIndex - 1;
      } else if (fromIndex > prev.mainImageIndex && toIndex <= prev.mainImageIndex) {
        newMainIndex = prev.mainImageIndex + 1;
      }

      return {
        ...prev,
        images: newImages,
        mainImageIndex: newMainIndex
      };
    });
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedImageIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedImageIndex !== null && draggedImageIndex !== dropIndex) {
      moveImage(draggedImageIndex, dropIndex);
    }
    setDraggedImageIndex(null);
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, feature]
        : prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCar) {
      updateCar(editingCar.id, {
        ...formData,
        updatedAt: new Date().toISOString()
      });
    } else {
      addCar({
        ...formData,
        views: 0,
        inquiries: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    resetForm();
  };

  const availableFeatures = [
    'فتحة سقف', 'جلد طبيعي', 'شاشة ذكية', 'نظام صوتي متطور',
    'دفع رباعي', 'مقاعد جلد', 'نظام ملاحة', 'كاميرات 360',
    'مقاعد مساج', 'إضاءة LED', 'نظام صوتي بوز', 'قيادة ذاتية',
    'راحة فائقة', 'تحكم مناخي', 'شحن لاسلكي', 'نظام أمان متقدم'
  ];

  const carBrands = [
    'مرسيدس', 'BMW', 'أودي', 'لكزس', 'بورش', 'جاكوار', 'تويوتا', 'هوندا',
    'نيسان', 'هيونداي', 'كيا', 'فولكس واجن', 'فورد', 'شيفروليه', 'جيب', 'لاند روفر'
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة السيارات</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2 space-x-reverse"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة سيارة جديدة</span>
        </button>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src={car.images[car.mainImageIndex] || car.images[0] || 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'} 
                alt={`${car.brand} ${car.model}`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
                {car.price.toLocaleString()} ريال
              </div>
              <div className={`absolute top-2 left-2 px-2 py-1 rounded text-sm ${
                car.status === 'available' ? 'bg-green-100 text-green-800' :
                car.status === 'sold' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {car.status === 'available' ? 'متاحة' : car.status === 'sold' ? 'مباعة' : 'محجوزة'}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{car.brand} {car.model}</h3>
              <p className="text-gray-600 mb-2">{car.year}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Eye className="w-4 h-4" />
                    <span>{car.views}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Phone className="w-4 h-4" />
                    <span>{car.inquiries}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{car.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 space-x-reverse">
                <button
                  onClick={() => handleEdit(car)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-1 space-x-reverse"
                >
                  <Edit className="w-4 h-4" />
                  <span>تعديل</span>
                </button>
                <button
                  onClick={() => handleDelete(car.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 flex items-center justify-center space-x-1 space-x-reverse"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>حذف</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {editingCar ? 'تعديل السيارة' : 'إضافة سيارة جديدة'}
                </h3>
                <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الماركة *</label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      required
                    >
                      <option value="">اختر الماركة</option>
                      {carBrands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الموديل *</label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">السنة *</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                      min="2000"
                      max="2025"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">السعر (ريال قطري) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">نوع الوقود</label>
                    <select
                      value={formData.fuel}
                      onChange={(e) => setFormData(prev => ({ ...prev, fuel: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      <option value="بنزين">بنزين</option>
                      <option value="هايبرد">هايبرد</option>
                      <option value="كهربائي">كهربائي</option>
                      <option value="ديزل">ديزل</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ناقل الحركة</label>
                    <select
                      value={formData.transmission}
                      onChange={(e) => setFormData(prev => ({ ...prev, transmission: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      <option value="أوتوماتيك">أوتوماتيك</option>
                      <option value="يدوي">يدوي</option>
                      <option value="CVT">CVT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المسافة المقطوعة</label>
                    <input
                      type="text"
                      value={formData.mileage}
                      onChange={(e) => setFormData(prev => ({ ...prev, mileage: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="مثال: 50,000 كم"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      <option value="available">متاحة</option>
                      <option value="sold">مباعة</option>
                      <option value="reserved">محجوزة</option>
                    </select>
                  </div>
                </div>

                {/* Images Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">صور السيارة</label>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex flex-col items-center justify-center py-8 text-gray-500 hover:text-gray-700"
                    >
                      <Upload className="w-8 h-8 mb-2" />
                      <span>اضغط لرفع الصور أو اسحبها هنا</span>
                      <span className="text-sm">يمكن رفع عدة صور في نفس الوقت</span>
                    </button>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div
                          key={index}
                          className={`relative group cursor-move border-2 rounded-lg overflow-hidden ${
                            index === formData.mainImageIndex ? 'border-red-500' : 'border-gray-200'
                          }`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                        >
                          <img 
                            src={image} 
                            alt={`صورة ${index + 1}`}
                            className="w-full h-24 object-cover"
                          />
                          
                          {/* Main Image Badge */}
                          {index === formData.mainImageIndex && (
                            <div className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded">
                              رئيسية
                            </div>
                          )}
                          
                          {/* Drag Handle */}
                          <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            <GripVertical className="w-3 h-3" />
                          </div>
                          
                          {/* Controls */}
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 space-x-reverse">
                            {index !== formData.mainImageIndex && (
                              <button
                                type="button"
                                onClick={() => setMainImage(index)}
                                className="bg-blue-600 text-white p-1 rounded text-xs"
                                title="جعل رئيسية"
                              >
                                <Star className="w-3 h-3" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="bg-red-600 text-white p-1 rounded text-xs"
                              title="حذف"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المميزات</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {availableFeatures.map((feature) => (
                      <label key={feature} className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature)}
                          onChange={(e) => handleFeatureChange(feature, e.target.checked)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="وصف مفصل للسيارة..."
                  />
                </div>

                {/* Services */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="checkbox"
                      checked={formData.financing}
                      onChange={(e) => setFormData(prev => ({ ...prev, financing: e.target.checked }))}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">تمويل ميسر</span>
                  </label>

                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="checkbox"
                      checked={formData.exchange}
                      onChange={(e) => setFormData(prev => ({ ...prev, exchange: e.target.checked }))}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">استبدال السيارة</span>
                  </label>

                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="checkbox"
                      checked={formData.maintenance}
                      onChange={(e) => setFormData(prev => ({ ...prev, maintenance: e.target.checked }))}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">صيانة دورية</span>
                  </label>

                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="checkbox"
                      checked={formData.support247}
                      onChange={(e) => setFormData(prev => ({ ...prev, support247: e.target.checked }))}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">دعم 24/7</span>
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex space-x-4 space-x-reverse pt-6 border-t">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingCar ? 'حفظ التعديلات' : 'إضافة السيارة'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarManagement;