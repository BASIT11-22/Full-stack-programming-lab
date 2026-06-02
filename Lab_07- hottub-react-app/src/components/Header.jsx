import React from 'react';
import { ShoppingCart, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartCount, cartTotal } = useCart();

  return (
    <>
      {/* Top Header */}
      <div className="bg-gray-200 py-1 text-xs text-gray-600 border-b border-gray-300">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>Call for Customer support: <span className="text-red-600 font-bold">020 38893565</span></div>
          <div className="flex space-x-4">
            <Link to="/account" className="hover:underline">My Account</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="#" className="hover:underline">Wishlist</Link>
            <Link to="/checkout" className="hover:underline">To Checkout</Link>
          </div>
        </div>
      </div>

      {/* Logo and Cart Area */}
      <header className="bg-white py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold tracking-tighter">
              <span className="text-blue-900 uppercase">HOTSPRING</span><br />
              <span className="text-red-600 text-sm italic">Portable Spas</span>
            </Link>
          </div>
          <div className="relative">
            <Link to="/cart" className="border border-gray-300 rounded px-4 py-2 flex items-center bg-gray-50 cursor-pointer group hover:border-red-600 transition-colors">
              <ShoppingCart className="text-red-600 mr-2 w-4 h-4" />
              <span className="text-sm font-semibold">
                My Cart: <span className="text-gray-500">{cartCount} items in - ${cartTotal.toFixed(2)}</span>
              </span>
              <ChevronDown className="ml-4 text-gray-400 w-3 h-3 transition-transform group-hover:rotate-180" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
