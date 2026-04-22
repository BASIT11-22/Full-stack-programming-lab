const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-100 bg-white mt-auto">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest text-gray-400 uppercase">
        <p>&copy; {new Date().getFullYear()} TechStore Minimal</p>
        <div className="flex space-x-8">
          <a href="#" className="hover:text-black transition-colors">Twitter</a>
          <a href="#" className="hover:text-black transition-colors">Instagram</a>
          <a href="#" className="hover:text-black transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
