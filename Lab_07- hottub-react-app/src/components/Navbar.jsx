import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-red-600 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex divide-x divide-red-500 uppercase text-sm font-bold w-full md:w-auto">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'bg-red-700' : 'hover:bg-red-700'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/category" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'bg-red-700' : 'hover:bg-red-700'}`
            }
          >
            Category
          </NavLink>
          <NavLink 
            to="/brand" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'bg-red-700' : 'hover:bg-red-700'}`
            }
          >
            Brand
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'bg-red-700' : 'hover:bg-red-700'}`
            }
          >
            Info
          </NavLink>
        </div>
        <div className="flex w-full md:w-auto mt-2 md:mt-0 pb-2 md:pb-0">
          <input 
            type="text" 
            placeholder="Search..."
            className="px-3 py-1 text-black text-sm outline-none w-full md:w-64"
          />
          <button className="bg-gray-800 px-4 py-1 text-sm font-bold hover:bg-black transition-colors uppercase">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
