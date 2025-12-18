import React, { useEffect, useRef } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

const AnalyticsTracker: React.FC = () => {
  const { trackVisit, updateSessionDuration } = useAnalytics();
  const sessionStartTime = useRef<number>(Date.now());
  const lastActivityTime = useRef<number>(Date.now());

  useEffect(() => {
    // تسجيل الزيارة عند تحميل الصفحة
    trackVisit({
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer
    });

    // تتبع تغيير الصفحة (للـ SPA)
    const handleLocationChange = () => {
      trackVisit({
        page_url: window.location.href,
        page_title: document.title
      });
    };

    // تتبع النشاط على الصفحة
    const handleActivity = () => {
      lastActivityTime.current = Date.now();
    };

    // تحديث مدة الجلسة كل 30 ثانية
    const sessionInterval = setInterval(() => {
      const currentTime = Date.now();
      const sessionDuration = Math.floor((currentTime - sessionStartTime.current) / 1000);
      
      // إذا لم يكن هناك نشاط لأكثر من 5 دقائق، لا نحدث مدة الجلسة
      if (currentTime - lastActivityTime.current < 5 * 60 * 1000) {
        updateSessionDuration(sessionDuration);
      }
    }, 30000);

    // إضافة مستمعي الأحداث
    window.addEventListener('popstate', handleLocationChange);
    document.addEventListener('click', handleActivity);
    document.addEventListener('scroll', handleActivity);
    document.addEventListener('keypress', handleActivity);
    document.addEventListener('mousemove', handleActivity);

    // تنظيف عند إلغاء التحميل
    const handleBeforeUnload = () => {
      const sessionDuration = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      updateSessionDuration(sessionDuration);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(sessionInterval);
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleActivity);
      document.removeEventListener('scroll', handleActivity);
      document.removeEventListener('keypress', handleActivity);
      document.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [trackVisit, updateSessionDuration]);

  return null; // هذا المكون لا يعرض أي شيء
};

export default AnalyticsTracker;