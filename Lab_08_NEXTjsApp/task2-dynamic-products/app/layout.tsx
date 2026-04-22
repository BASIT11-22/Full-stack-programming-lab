import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ShoppingBag, Search, User, Menu } from "lucide-react";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LUMINA | Future of Tech",
  description: "Curated collection of high-performance gadgets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-black text-white`}>
        <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
          <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-sm">L</span>
              </div>
              <span>LUMINA</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              <Link href="#" className="hover:text-white transition-colors">About</Link>
              <Link href="#" className="hover:text-white transition-colors">Support</Link>
            </div>

            <div className="flex items-center gap-5">
              <button className="hover:text-indigo-400 transition-colors">
                <Search size={20} />
              </button>
              <button className="hover:text-indigo-400 transition-colors relative">
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-[10px] flex items-center justify-center rounded-full">3</span>
              </button>
              <button className="md:hidden">
                <Menu size={20} />
              </button>
            </div>
          </nav>
        </header>

        <main className="pt-20">
          {children}
        </main>

        <footer className="border-t border-white/5 py-20 bg-[#080808]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-sm">L</span>
                </div>
                <span>LUMINA</span>
              </Link>
              <p className="text-white/40 text-sm leading-relaxed">
                Defining the intersection of performance and aesthetics. Our mission is to provide tools that empower your digital journey.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Shop</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Laptops</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Audio</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Smart Home</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><Link href="#" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Sustainability</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Newsletter</h4>
              <p className="text-sm text-white/40 mb-4">Subscribe to receive updates on new drops and exclusive offers.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 flex-grow"
                />
                <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/20">
            <p>© 2024 LUMINA DIGITAL. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
              <Link href="#">Cookies</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
