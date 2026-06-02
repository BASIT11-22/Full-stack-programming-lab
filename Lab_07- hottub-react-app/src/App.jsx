import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Category from './pages/Category';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        {/* Placeholder routes for future implementation */}
        <Route path="/about" element={<div className="container mx-auto py-20 text-center font-bold uppercase">About Us Page</div>} />
        <Route path="/login" element={<div className="container mx-auto py-20 text-center font-bold uppercase">Login Page</div>} />
        <Route path="/register" element={<div className="container mx-auto py-20 text-center font-bold uppercase">Register Page</div>} />
        <Route path="/checkout" element={<div className="container mx-auto py-20 text-center font-bold uppercase">Checkout Page</div>} />
        <Route path="/account" element={<div className="container mx-auto py-20 text-center font-bold uppercase">My Account Page</div>} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
