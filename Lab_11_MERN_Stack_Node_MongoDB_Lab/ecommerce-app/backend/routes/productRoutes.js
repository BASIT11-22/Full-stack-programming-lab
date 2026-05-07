const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Seed data route
router.get('/seed', async (req, res) => {
    const products = [
        {
            name: "Premium Wireless Headphones",
            description: "High-quality sound with noise cancellation and 40-hour battery life.",
            price: 299,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
            category: "Electronics",
            stock: 15
        },
        {
            name: "Smart Watch Series X",
            description: "Advanced health tracking, GPS, and water resistance up to 50m.",
            price: 399,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop",
            category: "Electronics",
            stock: 20
        },
        {
            name: "Minimalist Leather Backpack",
            description: "Durable top-grain leather with a padded laptop compartment.",
            price: 150,
            image: "https://images.unsplash.com/photo-1553062407-98eeb94c6a62?q=80&w=2070&auto=format&fit=crop",
            category: "Fashion",
            stock: 10
        },
        {
            name: "Ergonomic Office Chair",
            description: "Adjustable height and lumbar support for all-day comfort.",
            price: 250,
            image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2070&auto=format&fit=crop",
            category: "Home",
            stock: 5
        }
    ];

    try {
        await Product.deleteMany({});
        const createdProducts = await Product.insertMany(products);
        res.status(201).json(createdProducts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
