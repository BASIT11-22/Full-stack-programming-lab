import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* Welcome heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">
        Welcome to Our Modern Platform
      </h1>
      
      {/* Small introduction paragraph */}
      <p className="text-lg md:text-xl max-w-2xl text-gray-600 dark:text-gray-300 mb-8">
        This is a robust, responsive web application built with Next.js and Tailwind CSS. 
        It demonstrates clean routing, reusable components, and modern UI principles.
      </p>
      
      {/* Button/link to About page */}
      <Link 
        href="/about" 
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
      >
        Learn More About Us
      </Link>
    </div>
  );
}
