'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { Plus, Heart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <motion.div 
            className="group relative bg-[#0F0F0F] rounded-[32px] overflow-hidden border border-white/5 hover:border-white/10 transition-colors"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Tags */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="glass px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-indigo-400">
                        {product.category}
                    </span>
                </div>

                <button className="absolute top-6 right-6 p-3 glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 hover:text-red-500">
                    <Heart className="w-4 h-4" />
                </button>

                {/* Internal Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-60"></div>
            </div>

            <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-1">
                            {product.description}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-tighter">Price</span>
                        <span className="text-2xl font-black text-white">${product.price}</span>
                    </div>
                    
                    <button className="h-14 w-14 bg-white text-black rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all transform active:scale-90 group/btn">
                        <Plus className="w-6 h-6 group-hover/btn:rotate-90 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
