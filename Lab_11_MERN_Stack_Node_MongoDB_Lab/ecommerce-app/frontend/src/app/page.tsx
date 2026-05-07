'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import { Product } from '@/types';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
            <div className="mesh-bg" />
            <Navbar />
            
            <main>
                <Hero />
                
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                                CURATED <br />
                                <span className="text-indigo-500">ESSENTIALS</span>
                            </h2>
                            <p className="text-gray-500 max-w-md">
                                A hand-picked selection of the world's most innovative and beautifully designed products.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            className="flex gap-4"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            {['All', 'Electronics', 'Fashion', 'Home'].map((cat) => (
                                <button 
                                    key={cat}
                                    className="px-6 py-2 rounded-full border border-white/10 hover:bg-white text-sm font-bold hover:text-black transition-all"
                                >
                                    {cat}
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div 
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex justify-center items-center h-96"
                            >
                                <div className="relative w-20 h-20">
                                    <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
                                </div>
                            </motion.div>
                        ) : error ? (
                            <motion.div 
                                key="error"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-500/10 border border-red-500/20 p-12 rounded-[32px] text-center"
                            >
                                <p className="text-red-500 text-xl font-bold mb-4">{error}</p>
                                <p className="text-gray-500 mb-8 text-sm">Make sure your backend is running and the database is initialized.</p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button 
                                        onClick={() => window.location.reload()}
                                        className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-all"
                                    >
                                        Retry Connection
                                    </button>
                                    <button 
                                        onClick={async () => {
                                            try {
                                                await fetch('http://localhost:5000/api/products/seed');
                                                window.location.reload();
                                            } catch (e) {
                                                alert("Make sure backend is running on port 5000");
                                            }
                                        }}
                                        className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                                    >
                                        Initialize Store
                                    </button>
                                </div>
                            </motion.div>
                        ) : products.length === 0 ? (
                            <motion.div 
                                key="empty"
                                className="text-center py-20"
                            >
                                <h3 className="text-2xl font-bold mb-4 text-gray-400">Your Store is Empty</h3>
                                <button 
                                    onClick={async () => {
                                        try {
                                            await fetch('http://localhost:5000/api/products/seed');
                                            window.location.reload();
                                        } catch (e) {
                                            alert("Make sure backend is running on port 5000");
                                        }
                                    }}
                                    className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all"
                                >
                                    Seed Initial Products
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="grid"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12"
                                layout
                            >
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </main>

            <Footer />
        </div>
    );
}
