import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  Clock, 
  TrendingUp, 
  Globe, 
  Smartphone, 
  Monitor,
  RefreshCw,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';

const AnalyticsDashboard: React.FC = () => {
  const { stats, loading, error, fetchAnalytics } = useAnalytics();
  const [selectedPeriod, setSelectedPeriod] = useState('7'); // آخر 7 أيام

  useEffect(() => {
    // تحديث البيانات كل 5 دقائق
    const interval = setInterval(() => {
      fetchAnalytics();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchAnalytics]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      day: 'numeric',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <span className="mr-3">جاري تحميل البيانات...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">خطأ في تحميل البيانات: {error}</p>
        <button 
          onClick={fetchAnalytics}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">تحليلات الموقع</h2>
          <p className="text-gray-600">إحصائيات مفصلة عن زوار الموقع</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="1">اليوم</option>
            <option value="7">آخر 7 أيام</option>
            <option value="30">آخر 30 يوم</option>
            <option value="90">آخر 3 أشهر</option>
          </select>
          <button
            onClick={fetchAnalytics}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2 space-x-reverse"
          >
            <RefreshCw className="w-4 h-4" />
            <span>تحديث</span>
          </button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">زوار اليوم</p>
              <p className="text-2xl font-bold text-gray-800">{stats.todayVisitors}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي الزوار</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalVisitors}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">مشاهدات الصفحات</p>
              <p className="text-2xl font-bold text-gray-800">{stats.pageViews}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">متوسط مدة الجلسة</p>
              <p className="text-2xl font-bold text-gray-800">{formatDuration(stats.avgSessionDuration)}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الإحصائيات اليومية */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">الزوار اليوميون</h3>
            <BarChart3 className="w-5 h-5 text-gray-600" />
          </div>
          <div className="space-y-3">
            {stats.dailyStats.slice(0, 7).map((day, index) => (
              <div key={day.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{formatDate(day.date)}</span>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-sm font-medium">{day.unique_visitors}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full"
                      style={{ 
                        width: `${Math.min((day.unique_visitors / Math.max(...stats.dailyStats.map(d => d.unique_visitors))) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* أكثر الصفحات زيارة */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">أكثر الصفحات زيارة</h3>
            <PieChart className="w-5 h-5 text-gray-600" />
          </div>
          <div className="space-y-3">
            {stats.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 truncate flex-1">
                  {page.page.replace(window.location.origin, '') || '/'}
                </span>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-sm font-medium">{page.views}</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ 
                        width: `${Math.min((page.views / Math.max(...stats.topPages.map(p => p.views))) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الزوار حسب البلد */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">الزوار حسب البلد</h3>
            <Globe className="w-5 h-5 text-gray-600" />
          </div>
          <div className="space-y-3">
            {stats.visitorsByCountry.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{country.country}</span>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-sm font-medium">{country.visitors}</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ 
                        width: `${Math.min((country.visitors / Math.max(...stats.visitorsByCountry.map(c => c.visitors))) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* آخر الزوار */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">آخر الزوار</h3>
            <Activity className="w-5 h-5 text-gray-600" />
          </div>
          <div className="space-y-3">
            {stats.recentVisitors.map((visitor, index) => (
              <div key={visitor.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {visitor.device_type === 'mobile' ? (
                      <Smartphone className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Monitor className="w-4 h-4 text-gray-500" />
                    )}
                    <span className="text-xs text-gray-500">{visitor.browser}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{visitor.country || 'غير معروف'}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(visitor.created_at).toLocaleTimeString('ar-EG')}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDuration(visitor.session_duration)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* معلومات إضافية */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">ملخص الأداء</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.uniqueVisitors}</div>
            <div className="text-sm text-gray-600">زوار فريدون</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.totalVisitors > 0 ? Math.round((stats.uniqueVisitors / stats.totalVisitors) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">معدل الزوار الجدد</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.uniqueVisitors > 0 ? Math.round(stats.pageViews / stats.uniqueVisitors) : 0}
            </div>
            <div className="text-sm text-gray-600">صفحات لكل زائر</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;