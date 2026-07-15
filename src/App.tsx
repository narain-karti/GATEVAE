import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Products from './components/Products';
import Spotlight from './components/Spotlight';
import Brands from './components/Brands';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Search from './components/Search';
import ProductDetail from './components/ProductDetail';
import AuthModal from './components/AuthModal';
import ScrollToTop from './components/ScrollToTop';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import CartPage from './pages/CartPage';
import ComparePage from './pages/ComparePage';
import Accessories from './pages/Accessories';
import Deals from './pages/Deals';
import About from './pages/About';
import Innovation from './pages/Innovation';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Shipping from './pages/Shipping';
import Warranty from './pages/Warranty';
import QuickViewModal from './components/QuickViewModal';
import { StoreProvider } from './context/StoreContext';
import { useSEO } from './hooks/useSEO';

function Home() {
  useSEO({ 
    title: 'Home', 
    description: 'Explore the latest futuristic technology and premium gadgets at GATEVAE.' 
  });

  return (
    <>
      <Hero />
      <Categories />
      <Products />
      <Spotlight />
      <Brands />
      <Features />
      <Testimonials />
      <Newsletter />
    </>
  );
}

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

import ChatbotBubble from './components/ChatbotBubble';

function MainContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-[#FAFAFA] flex flex-col">
      <ScrollToTop />
      <Navbar />
      <Search />
      <AuthModal />
      <QuickViewModal />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/about" element={<About />} />
          <Route path="/innovation" element={<Innovation />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/:category" element={<Shop />} />
        </Routes>
      </main>
      
      <Footer />
      <ChatbotBubble />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}

