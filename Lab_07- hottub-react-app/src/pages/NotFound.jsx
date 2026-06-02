import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-2xl mx-auto bg-white p-16 rounded-lg shadow-2xl border-t-8 border-red-600">
        <h1 className="text-9xl font-extrabold text-red-600 mb-4 tracking-tighter">404</h1>
        <h2 className="text-3xl font-bold mb-6 uppercase text-gray-800">Page Not Found</h2>
        <p className="text-gray-500 mb-10 uppercase text-sm tracking-wide">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded font-bold transition-all transform hover:scale-105 uppercase"
        >
          <Home size={20} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
