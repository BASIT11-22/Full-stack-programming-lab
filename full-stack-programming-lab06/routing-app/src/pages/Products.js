// Products.js - Products Page
// Displays a list of products with "Add to Cart" UI (no backend)
import React, { useState } from 'react';
import './Pages.css';

// Static list of products
const productList = [
    {
        id: 1,
        title: 'Wireless Headphones',
        description:
            'Premium noise-cancelling wireless headphones with 30-hour battery life and deep bass audio.',
        price: '$59.99',
        emoji: '🎧',
    },
    {
        id: 2,
        title: 'Smart Watch',
        description:
            'Feature-rich smart watch with health tracking, GPS, and a stunning AMOLED display.',
        price: '$129.99',
        emoji: '⌚',
    },
    {
        id: 3,
        title: 'Mechanical Keyboard',
        description:
            'Compact TKL mechanical keyboard with RGB backlight and tactile brown switches for fast typing.',
        price: '$84.99',
        emoji: '⌨️',
    },
    {
        id: 4,
        title: 'USB-C Hub',
        description:
            '7-in-1 USB-C hub with HDMI, USB 3.0 ports, SD card reader, and 100W Power Delivery.',
        price: '$39.99',
        emoji: '🔌',
    },
];

function Products() {
    // State: track which products have been added to cart (by id)
    const [cart, setCart] = useState([]);

    // Handler: toggle product in/out of cart
    const handleAddToCart = (productId) => {
        setCart((prevCart) => {
            if (prevCart.includes(productId)) {
                // Remove from cart if already added
                return prevCart.filter((id) => id !== productId);
            } else {
                // Add to cart
                return [...prevCart, productId];
            }
        });
    };

    return (
        <div className="page products-page">
            <h1>🛍️ Our Products</h1>
            <p className="page-subtitle">
                Browse our top products. Click "Add to Cart" to select items.
            </p>

            {/* Cart Status Banner */}
            {cart.length > 0 && (
                <div className="cart-banner">
                    🛒 {cart.length} item(s) in your cart
                </div>
            )}

            {/* Products Grid */}
            <div className="products-grid">
                {productList.map((product) => {
                    const isInCart = cart.includes(product.id);
                    return (
                        <div
                            key={product.id}
                            className={`product-card ${isInCart ? 'in-cart' : ''}`}
                        >
                            <span className="product-emoji">{product.emoji}</span>
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">{product.price}</p>

                            {/* Add to Cart / Remove from Cart Button */}
                            <button
                                className={`cart-btn ${isInCart ? 'btn-remove' : 'btn-add'}`}
                                onClick={() => handleAddToCart(product.id)}
                            >
                                {isInCart ? '✓ Remove from Cart' : '+ Add to Cart'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Products;
