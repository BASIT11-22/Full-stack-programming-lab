import Link from 'next/link';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-col group">
      <Link href={`/products/${product.id}`} className="block relative aspect-square bg-gray-50 overflow-hidden mb-4">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-900 mb-1">{product.title}</h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider">{product.availability}</p>
        </div>
        <p className="text-sm font-semibold">${product.price}</p>
      </div>
      <Link 
        href={`/products/${product.id}`}
        className="mt-4 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-black w-fit pb-0.5 hover:opacity-50 transition-opacity"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
