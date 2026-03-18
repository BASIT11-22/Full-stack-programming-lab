// About.js - About Page
import React from 'react';
import './Pages.css';

function About() {
    return (
        <div className="page about-page">
            <h1>📖 About Us</h1>
            <div className="about-content">
                <p>
                    Welcome to <strong>MyWebsite</strong> — a modern e-commerce platform
                    built with passion and purpose. Our goal is to connect customers with
                    quality products at the best prices.
                </p>
                <p>
                    Founded in 2024, our team of dedicated developers and designers work
                    tirelessly to bring you a seamless and enjoyable shopping experience.
                    We believe in transparency, quality, and customer satisfaction above
                    all else.
                </p>

                <h2>🎯 Our Mission</h2>
                <p>
                    To deliver exceptional value by offering premium products, outstanding
                    customer service, and an intuitive user experience.
                </p>

                <h2>👥 Our Team</h2>
                <div className="team-grid">
                    <div className="team-card">
                        <span className="team-avatar">👨‍💻</span>
                        <h4>Ali Hassan</h4>
                        <p>Lead Developer</p>
                    </div>
                    <div className="team-card">
                        <span className="team-avatar">👩‍🎨</span>
                        <h4>Sara Ahmed</h4>
                        <p>UI/UX Designer</p>
                    </div>
                    <div className="team-card">
                        <span className="team-avatar">🧑‍💼</span>
                        <h4>Usman Khan</h4>
                        <p>Product Manager</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
