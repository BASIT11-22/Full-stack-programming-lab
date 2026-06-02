import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#002133] text-gray-400 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Contact Us */}
        <div>
          <h4 className="text-white font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-red-600 uppercase">
            CONTACT US
          </h4>
          <div className="text-xs space-y-3">
            <p>yourname@email.com</p>
            <p className="text-white font-bold">CALL 24/7: 888 - 201 - 8899</p>
            <p>Your Address:<br />Street<br />State & Zip Code<br />City & Country</p>
            <p>Email: servicemail@yourname.com</p>
            <div className="flex space-x-3 mt-4 text-lg">
              <a href="#" className="hover:text-red-500 transition-colors"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-red-500 transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-red-500 transition-colors"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="hover:text-red-500 transition-colors"><i className="fab fa-youtube"></i></a>
              <a href="#" className="hover:text-red-500 transition-colors"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        {/* Information */}
        <div>
          <h4 className="text-white font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-red-600 uppercase">
            Information
          </h4>
          <ul className="text-xs space-y-3 uppercase">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Customer Service</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Site Map</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Search Terms</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h4 className="text-white font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-red-600 uppercase">
            My Account
          </h4>
          <ul className="text-xs space-y-3 uppercase">
            <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">View Cart</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">My Wishlist</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-red-600 uppercase">
            Signup for a Newsletter
          </h4>
          <div className="space-y-4">
            <p className="text-[10px] uppercase">Sign up for our newsletter:</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Address"
                className="bg-black border border-gray-700 px-3 py-2 text-xs w-full focus:outline-none"
              />
              <button className="bg-gray-800 text-white px-4 py-2 text-xs hover:bg-gray-700 uppercase">Go</button>
            </div>
            <div>
              <p className="text-[10px] uppercase mb-2">Payment Solutions</p>
              <div className="flex space-x-1">
                <div className="bg-white p-1 rounded-sm flex items-center justify-center w-8 h-5"><CreditCard size={14} className="text-blue-800" /></div>
                <div className="bg-white p-1 rounded-sm flex items-center justify-center w-8 h-5"><CreditCard size={14} className="text-red-600" /></div>
                <div className="bg-white p-1 rounded-sm flex items-center justify-center w-8 h-5"><CreditCard size={14} className="text-blue-500" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-[10px] uppercase">
        &copy; {new Date().getFullYear()} Hottubspaservice.com. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
