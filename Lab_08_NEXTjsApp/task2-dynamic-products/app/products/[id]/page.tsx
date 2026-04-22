"use client";

import { products } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ShoppingCart, Share2, Heart, Check } from 'lucide-react';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation */}
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-12 transition-colors group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square rounded-[2rem] overflow-hidden bg-white/5 border border-white/10"
          >
            <Image 
              src={product.image} 
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Product Info */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold tracking-widest uppercase rounded-full border border-indigo-500/20">
                  New Arrival
                </span>
                <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">
                  SKU: LM-{product.id.padStart(4, '0')}
                </span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight mb-4">{product.title}</h1>
              <p className="text-3xl font-light tracking-tighter mb-8">${product.price.toLocaleString()}</p>
              
              <div className="h-px bg-white/10 w-full mb-8"></div>

              <div className="space-y-6 mb-12">
                <p className="text-white/60 leading-relaxed text-lg">
                  {product.fullDescription}
                </p>
                
                <ul className="space-y-3">
                  {['Free Express Shipping', '2 Year Global Warranty', '30-Day Money Back Guarantee'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white/40">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <Check size={12} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="btn-premium flex-grow group">
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
                <div className="flex gap-4">
                  <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Availability</h4>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${product.availability === 'In Stock' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-orange-500'}`}></div>
                  <span className="text-sm font-medium">{product.availability}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
