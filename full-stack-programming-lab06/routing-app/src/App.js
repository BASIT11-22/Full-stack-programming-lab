// App.js - Routing App Root Component
// Sets up BrowserRouter and defines all application routes
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
    return (
        // BrowserRouter wraps the entire app to enable client-side routing
        <BrowserRouter>
            {/* Navbar is always visible on every page */}
            <Navbar />
            <div className="page-content">
                <Routes>
                    {/* Define each route and its corresponding component */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/products" element={<Products />} />
                    {/* Catch-all route for 404 Not Found */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
