const express = require("express");
const router = express.Router();
const axios = require("axios");

// Fallback news data for key countries to support offline/without-key usage
const fallbackNews = {
  us: [
    { title: "Quantum Computing Hardware achieves 99.9% gate fidelity", source: "Scientific American", url: "https://scientificamerican.com", publishedAt: new Date().toISOString() },
    { title: "New solar cell technology breaks efficiency records at 33%", source: "Renewable Energy News", url: "https://renewableenergy.com", publishedAt: new Date().toISOString() },
    { title: "Ocean cleanup project removes 100 tons of plastic debris from Pacific", source: "EcoWatch", url: "https://ecowatch.com", publishedAt: new Date().toISOString() },
    { title: "Deep space telescope captures details of earliest galaxy formations", source: "Cosmos Journal", url: "https://cosmosjournal.com", publishedAt: new Date().toISOString() },
    { title: "First clinical trials for universal mRNA influenza vaccine begin", source: "Medical News Today", url: "https://medicalnewstoday.com", publishedAt: new Date().toISOString() }
  ],
  gb: [
    { title: "Fusion energy pilot plant in UK schedules construction timeline", source: "Nature Physics", url: "https://nature.com", publishedAt: new Date().toISOString() },
    { title: "Electric vertical takeoff aircraft receives aerospace safety clearance", source: "AeroTech UK", url: "https://aerotech.co.uk", publishedAt: new Date().toISOString() }
  ],
  pk: [
    { title: "Local tech ecosystem witnesses 40% growth in early stage startups", source: "TechPakistan", url: "https://techpakistan.pk", publishedAt: new Date().toISOString() },
    { title: "Karakoram glacier monitoring station reports stable winter snowpack", source: "Dawn Pakistan", url: "https://dawn.com", publishedAt: new Date().toISOString() }
  ]
};

// Validates ISO-3166-1 alpha-2 country code format
function isValidCountryCode(code) {
  if (!code) return false;
  const regex = /^[a-zA-Z]{2}$/;
  return regex.test(code);
}

// Function to format articles limit (5-10 articles)
function formatArticles(articles, limit = 10) {
  if (!Array.isArray(articles)) return [];
  const minLimit = Math.max(5, Math.min(10, limit));
  return articles.slice(0, minLimit).map(article => ({
    title: article.title || "No Title",
    source: article.source ? (typeof article.source === 'object' ? article.source.name : article.source) : "Unknown Source",
    url: article.url || "#",
    publishedAt: article.publishedAt || new Date().toISOString()
  }));
}

const getNews = async (req, res, next) => {
  let countryCode = req.params.country || req.query.country || "us";
  countryCode = countryCode.trim().toLowerCase();

  if (!isValidCountryCode(countryCode)) {
    return res.status(400).json({
      error: "Invalid country code. Please provide a standard 2-letter ISO country code (e.g. 'us', 'gb', 'pk', 'jp', 'fr')."
    });
  }

  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    const articles = fallbackNews[countryCode] || fallbackNews.us;
    const formatted = formatArticles(articles, 10);
    return res.json({
      country: countryCode.toUpperCase(),
      articles: formatted,
      count: formatted.length,
      source: "simulated (no API key configured)"
    });
  }

  try {
    const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${apiKey}`;
    const response = await axios.get(url);

    if (response.data && response.data.articles) {
      const formatted = formatArticles(response.data.articles, 10);
      return res.json({
        country: countryCode.toUpperCase(),
        articles: formatted,
        count: formatted.length,
        source: "live"
      });
    } else {
      throw new Error("Invalid response structure from external News API");
    }
  } catch (error) {
    console.warn(`Failed to fetch news for '${countryCode}' from NewsAPI. Error: ${error.message}`);

    if (error.response && error.response.status === 400) {
      return res.status(400).json({
        error: `Country code '${countryCode.toUpperCase()}' is not supported by NewsAPI or is invalid.`
      });
    }

    const articles = fallbackNews[countryCode] || fallbackNews.us;
    const formatted = formatArticles(articles, 10);
    return res.json({
      country: countryCode.toUpperCase(),
      articles: formatted,
      count: formatted.length,
      source: "simulated (live API failed)",
      apiError: error.message
    });
  }
};

router.get("/:country", getNews);
router.get("/", getNews);

module.exports = {
  router,
  isValidCountryCode,
  formatArticles,
  fallbackNews
};
