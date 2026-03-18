// NotFound.js - 404 Not Found Page
// Shown when the user navigates to an undefined route
import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

function NotFound() {
    return (
        <div className="page notfound-page">
            <div className="notfound-content">
                <h1 className="error-code">404</h1>
                <h2>Oops! Page Not Found</h2>
                <p>
                    The page you are looking for doesn't exist or has been moved.
                </p>
                {/* Link back to the Home page */}
                <Link to="/" className="home-link">
                    ← Go Back to Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
