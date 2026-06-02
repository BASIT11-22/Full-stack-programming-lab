import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded p-4 group transition-all duration-300 hover:shadow-2xl">
      <div className="relative h-64 mb-4 overflow-hidden rounded flex items-center justify-center bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="max-h-full object-contain group-hover:scale-105 transition-transform" 
        />
        {product.isHot && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
            HOT
          </div>
        )}
      </div>
      <div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-bold text-gray-800 mb-2 uppercase hover:text-red-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center space-x-1 text-yellow-500 text-[10px] mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
          ))}
          <span className="text-gray-400 ml-1">({product.rating})</span>
        </div>
        <div className="text-red-600 font-extrabold text-lg mb-4">${product.price.toFixed(2)}</div>
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 text-sm font-bold uppercase transition-all flex items-center justify-center gap-2 ${
            added ? 'bg-green-600' : 'bg-red-600 hover:bg-red-700'
          } text-white`}
        >
          {added ? (
            <>
              <Check size={16} /> ADDED
            </>
          ) : (
            <>
              <ShoppingCart size={16} /> ADD TO CART
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
