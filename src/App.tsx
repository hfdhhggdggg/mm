import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { CarsProvider } from './contexts/CarsContext';
import AnalyticsTracker from './components/AnalyticsTracker';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
// Stats section removed per request
import FeaturedCars from './components/FeaturedCars';
// Testimonials section removed per request
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [userCredentials, setUserCredentials] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Check for admin access in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setShowAdmin(true);
    }

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (credentials: any) => {
    setUserCredentials(credentials);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserCredentials(null);
    setShowAdmin(false);
    // Remove admin parameter from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('admin');
    window.history.replaceState({}, '', url.toString());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-800">معرض اللوفر للسيارات</p>
        </div>
      </div>
    );
  }

  // Show admin login/dashboard if admin parameter is present
  if (showAdmin) {
    if (!isLoggedIn) {
      return (
        <CarsProvider>
          <LanguageProvider>
            <LoginForm onLogin={handleLogin} />
          </LanguageProvider>
        </CarsProvider>
      );
    } else {
      return (
        <CarsProvider>
          <LanguageProvider>
            <AdminDashboard />
          </LanguageProvider>
        </CarsProvider>
      );
    }
  }

  return (
    <CarsProvider>
      <LanguageProvider>
        <AnalyticsTracker />
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <HeroSection />
            <FeaturedCars />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </CarsProvider>
  );
}

export default App;