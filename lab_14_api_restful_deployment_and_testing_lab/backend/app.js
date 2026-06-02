const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors({
    origin: [
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const { router: weatherRoutes } = require("./routes/weatherRoutes");
const { router: newsRoutes } = require("./routes/newsRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/news", newsRoutes);

// Health check endpoint
app.get("/", (req, res) => {
    res.json({
        message: "MERN Stack Testing API running!",
        endpoints: {
            auth: "/api/auth",
            patients: "/api/patients",
            weather: "/api/weather/:city",
            news: "/api/news/:country"
        }
    });
});

// Centralized error handling
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err.message || err);
    res.status(err.status || 500).json({
        error: {
            message: err.message || "Internal Server Error",
            status: err.status || 500
        }
    });
});

module.exports = app;
