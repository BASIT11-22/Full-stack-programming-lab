import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md w-full sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">
          <Link href="/">My Next.js App</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
