const express = require("express");
const router = express.Router();
const axios = require("axios");

// Fallback data for testing offline/without API key
const fallbackCities = {
  islamabad: { name: "Islamabad", temperature: 32, condition: "Sunny", humidity: 45 },
  beijing: { name: "Beijing", temperature: 20, condition: "Haze", humidity: 55 },
  berlin: { name: "Berlin", temperature: 16, condition: "Cloudy", humidity: 70 },
  "rio de janeiro": { name: "Rio de Janeiro", temperature: 26, condition: "Sunny", humidity: 65 },
  toronto: { name: "Toronto", temperature: 14, condition: "Rainy", humidity: 80 },
  dubai: { name: "Dubai", temperature: 38, condition: "Sunny", humidity: 30 },
  singapore: { name: "Singapore", temperature: 29, condition: "Thundershower", humidity: 85 }
};

// Helper to generate realistic weather data based on the city name hash
function getSimulatedWeather(city) {
  if (!city || city.trim() === "") {
    throw new Error("City name cannot be empty");
  }
  const cleaned = city.trim().toLowerCase();
  if (fallbackCities[cleaned]) {
    return { ...fallbackCities[cleaned], isSimulated: true };
  }

  // Generate pseudo-random but deterministic values based on name
  let hash = 0;
  for (let i = 0; i < cleaned.length; i++) {
    hash = cleaned.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  const temperature = 5 + (hash % 30); // 5°C to 35°C
  const humidity = 30 + (hash % 65); // 30% to 95%
  const conditions = ["Sunny", "Cloudy", "Rainy", "Overcast", "Windy", "Clear", "Mist", "Snowy"];
  const condition = conditions[hash % conditions.length];
  const formattedName = city.trim().split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return {
    name: formattedName,
    temperature,
    condition,
    humidity,
    isSimulated: true
  };
}

// Handler function for both endpoints
const getWeather = async (req, res, next) => {
  const city = req.params.city || req.query.city;
  
  if (!city) {
    return res.status(400).json({ 
      error: "City parameter is required. Use /api/weather/:city or /api/weather?city=name" 
    });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    // Return simulated weather if no API key is set
    try {
      const data = getSimulatedWeather(city);
      return res.json({
        city: data.name,
        temperature: data.temperature,
        condition: data.condition,
        humidity: data.humidity,
        source: "simulated (no API key configured)"
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    const response = await axios.get(url);
    const weatherData = response.data;

    return res.json({
      city: weatherData.name,
      temperature: Math.round(weatherData.main.temp),
      condition: weatherData.weather[0].main, // e.g. Rain, Clouds, Clear
      humidity: weatherData.main.humidity,
      source: "live"
    });
  } catch (error) {
    console.warn(`Failed to fetch live weather for '${city}' from OpenWeather. Error: ${error.message}`);
    
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        error: `City '${city}' not found. Please check the spelling.`
      });
    }

    // Fallback to simulated data if other error occurs
    const data = getSimulatedWeather(city);
    return res.json({
      city: data.name,
      temperature: data.temperature,
      condition: data.condition,
      humidity: data.humidity,
      source: "simulated (live API failed)",
      apiError: error.message
    });
  }
};

// Bind handler to both parameter routes
router.get("/:city", getWeather);
router.get("/", getWeather);

module.exports = {
  router,
  getSimulatedWeather,
  fallbackCities
};
