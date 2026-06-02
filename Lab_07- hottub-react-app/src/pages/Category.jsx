import React from 'react';
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
  {
      id: 'prod-5',
      name: 'PREMIER SPA X1',
      price: 2500.00,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
      isHot: true,
  },
  {
      id: 'prod-6',
      name: 'LUXURY TUB Z-200',
      price: 1800.00,
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1540333563391-6281744f436d?q=80&w=2070&auto=format&fit=crop',
      isHot: false,
  }
];

const Category = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b-2 border-red-600 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 uppercase tracking-tight">Our Products</h1>
          <p className="text-gray-500 text-sm mt-1 uppercase">Showing {products.length} Products</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <span className="text-xs font-bold uppercase text-gray-400">Sort By:</span>
          <select className="bg-white border rounded px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none">
            <option>Position</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
