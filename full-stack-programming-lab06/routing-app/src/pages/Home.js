// Home.js - Home Page
import React from 'react';
import './Pages.css';

function Home() {
    return (
        <div className="page home-page">
            <div className="hero">
                <h1>👋 Welcome to MyWebsite</h1>
                <p className="hero-subtitle">
                    Your one-stop platform for quality products and great service.
                </p>
                <div className="hero-cards">
                    <div className="card">
                        <span className="card-icon">🛍️</span>
                        <h3>Shop Products</h3>
                        <p>Browse our curated collection of top-rated products.</p>
                    </div>
                    <div className="card">
                        <span className="card-icon">📞</span>
                        <h3>Contact Us</h3>
                        <p>Have questions? We're here to help 24/7.</p>
                    </div>
                    <div className="card">
                        <span className="card-icon">ℹ️</span>
                        <h3>Learn More</h3>
                        <p>Find out more about our team and our mission.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
