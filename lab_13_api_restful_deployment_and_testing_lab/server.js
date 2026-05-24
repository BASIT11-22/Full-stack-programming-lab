const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Route Imports
const weatherRoutes = require('./routes/weatherRoutes');
const newsRoutes = require('./routes/newsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/news', newsRoutes);

// Fallback route for root
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Lab 13 RESTful API Server' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected server error occurred!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
