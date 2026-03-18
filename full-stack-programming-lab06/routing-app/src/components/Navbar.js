// Navbar.js - Navigation component for the Routing App
// Uses Link from react-router-dom for client-side navigation
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">🌐 MyWebsite</Link>
            </div>
            <ul className="nav-links">
                {/* Each Link navigates to a route without page reload */}
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/products">Products</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
