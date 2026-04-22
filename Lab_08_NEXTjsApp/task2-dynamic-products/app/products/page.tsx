"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { ArrowUpRight, Plus } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-bold tracking-tight mb-4"
          >
            The Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 max-w-xl"
          >
            Explore our meticulously curated selection of high-performance digital tools. Each piece is chosen for its design excellence and functional purity.
          </motion.p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/products/${product.id}`}>
                <div className="card-premium h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                    
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/10">
                        {product.availability}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                       <div className="p-3 bg-white text-black rounded-full">
                          <Plus size={20} />
                       </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">{product.title}</h3>
                      <ArrowUpRight size={18} className="text-white/20 group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <p className="text-white/40 text-sm mb-8 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-2xl font-light tracking-tighter">${product.price.toLocaleString()}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 group-hover:text-indigo-300">View Details</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
