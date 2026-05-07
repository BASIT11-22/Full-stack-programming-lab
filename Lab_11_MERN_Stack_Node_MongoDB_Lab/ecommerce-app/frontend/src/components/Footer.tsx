import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-3xl font-black tracking-tighter text-white mb-8 block">
                            LAB<span className="text-indigo-500">11</span>
                        </span>
                        <p className="text-gray-500 max-w-sm text-lg leading-relaxed">
                            Crafting the future of digital commerce with precision, 
                            elegance, and uncompromising quality.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Storefront</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Collections</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Archives</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Legal</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Cookies</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-gray-600 text-xs gap-4">
                    <p>&copy; {new Date().getFullYear()} LAB11. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
