'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="py-8 bg-white">
      <nav className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tighter uppercase">
          TechStore
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-2">
          <Link 
            href="/" 
            className={pathname === '/' ? 'nav-button-active' : 'nav-button'}
          >
            Home
          </Link>
          <Link 
            href="/products" 
            className={pathname.startsWith('/products') ? 'nav-button-active' : 'nav-button'}
          >
            Products
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
