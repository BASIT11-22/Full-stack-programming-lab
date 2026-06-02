import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 'prod-1',
    name: 'X3 SCYBA X SERIES 110',
    price: 500.00,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1560026222-e63013ed056d?q=80&w=1974&auto=format&fit=crop',
    isHot: true,
  },
  {
    id: 'prod-2',
    name: 'AQUATIX ELITE X5',
    price: 1200.00,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=2070&auto=format&fit=crop',
    isHot: false,
  },
  {
    id: 'prod-3',
    name: 'RELAXPRO S-100',
    price: 850.00,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1560026222-e63013ed056d?q=80&w=1974&auto=format&fit=crop',
    isHot: false,
  },
  {
    id: 'prod-4',
    name: 'ZENSPA COMPACT',
    price: 450.00,
    rating: 3.5,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=2070&auto=format&fit=crop',
    isHot: false,
  },
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-bg h-[500px] flex items-center justify-center text-center text-white px-4">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg uppercase">EXPERIENCE ULTIMATE RELAXATION</h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-md">Premium Hot Tubs and Spas for your home. Quality you can trust.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/category" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold transition-all transform hover:scale-105 uppercase">SHOP NOW</Link>
            <Link to="/about" className="bg-white hover:bg-gray-100 text-red-600 px-8 py-3 rounded font-bold transition-all transform hover:scale-105 uppercase">LEARN MORE</Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured Categories */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="relative overflow-hidden rounded-lg group cursor-pointer shadow-lg h-64">
            <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Portable Spas" />
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all flex flex-col justify-end p-6 text-white text-left">
              <h2 className="text-2xl font-bold uppercase">Portable Spas</h2>
              <p className="text-gray-200 text-sm">Flexible and Easy to Install</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg group cursor-pointer shadow-lg h-64">
            <img src="https://images.unsplash.com/photo-1540333563391-6281744f436d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Entry Level" />
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all flex flex-col justify-end p-6 text-white text-left">
              <h2 className="text-2xl font-bold uppercase">Entry Level</h2>
              <p className="text-gray-200 text-sm">Quality at an Affordable Price</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg group cursor-pointer shadow-lg h-64">
            <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2031&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Premier Collection" />
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all flex flex-col justify-end p-6 text-white text-left">
              <h2 className="text-2xl font-bold uppercase">Premier Collection</h2>
              <p className="text-gray-200 text-sm">Luxury Without Compromise</p>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <div className="flex justify-between items-center mb-8 border-b-2 border-red-600 pb-2">
          <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Featured Products</h2>
          <Link to="/category" className="text-red-600 font-bold hover:underline text-sm uppercase">View All</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Promo Banner */}
        <div className="mt-16 bg-red-600 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-xl overflow-hidden relative">
          <div className="z-10 text-left">
            <h2 className="text-3xl font-extrabold mb-2 uppercase">SAVE $1,000's</h2>
            <p className="text-lg opacity-90">ON THE TOP SPA BRANDS. LIMITED TIME OFFER!</p>
          </div>
          <Link to="/category" className="mt-6 md:mt-0 bg-white text-red-600 px-10 py-3 rounded-full font-bold uppercase shadow-lg hover:bg-gray-100 transition-all z-10">SHOP NOW</Link>
          <div className="absolute -left-10 -bottom-10 opacity-10 transform -rotate-12 text-[200px] pointer-events-none">
            🏷️
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
