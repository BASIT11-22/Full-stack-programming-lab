"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Zap, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Animation Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-8">
              Future of Hardware
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              <span className="gradient-text">Precision Crafted</span> <br />
              <span className="text-white">Digital Tools.</span>
            </h1>
            <p className="text-white/50 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience the pinnacle of minimalist engineering. Our curated collection brings together peak performance and timeless aesthetics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/products" className="btn-premium group">
                Browse Collection
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#" className="btn-outline">
                Watch Keynote
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-500">
                <Cpu size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Unmatched Power</h3>
                <p className="text-white/40 leading-relaxed">
                  Every device is equipped with the latest silicon to ensure your workflow remains uninterrupted.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-purple-500">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Instant Response</h3>
                <p className="text-white/40 leading-relaxed">
                  Zero latency peripherals and ultra-fast storage for a computing experience that feels like magic.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-500">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Built to Last</h3>
                <p className="text-white/40 leading-relaxed">
                  Precision-milled aerospace aluminum and reinforced glass built for the rigors of daily professional use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
