'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';

const Navbar = () => {
    return (
        <motion.nav 
            className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 glass rounded-full px-6 py-3"
            initial={{ y: -100, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            transition={{ duration: 0.8, ease: "circOut" }}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-xl font-black tracking-tighter text-white">
                        LAB<span className="text-indigo-500">11</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        {['Collections', 'New', 'Sales'].map((item) => (
                            <Link 
                                key={item} 
                                href={`/${item.toLowerCase()}`}
                                className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute top-0 right-0 w-4 h-4 bg-indigo-600 text-white text-[10px] flex items-center justify-center rounded-full">
                            0
                        </span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors hidden sm:block">
                        <User className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors md:hidden">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
