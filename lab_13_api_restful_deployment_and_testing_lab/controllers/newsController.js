const axios = require('axios');

exports.getNews = async (req, res) => {
    try {
        const { countryCode } = req.params;

        // Explicit input sanitization (Validating 2-letter country code format)
        if (!countryCode || typeof countryCode !== 'string' || countryCode.trim().length !== 2) {
            return res.status(400).json({ 
                error: 'A valid 2-letter country code is required (e.g., us, gb, ca).' 
            });
        }

        const sanitizedCountryCode = countryCode.toLowerCase().trim();
        const apiKey = process.env.NEWS_API_KEY;

        // Mock Fallback Mode (if no valid key is provided)
        if (!apiKey || apiKey === 'your_newsapi_key_here') {
            // Return realistic mock news headlines for testing
            const mockNews = [
                {
                    title: `Breaking News: Economic Growth Rebounds in ${sanitizedCountryCode.toUpperCase()}`,
                    source: "Global News",
                    url: "https://example.com/news/economy",
                    publishedAt: new Date().toISOString()
                },
                {
                    title: "Tech Giants Announce New AI Regulations Agreement",
                    source: "Tech Daily",
                    url: "https://example.com/news/ai-agreement",
                    publishedAt: new Date().toISOString()
                },
                {
                    title: "Climate Summit Resolves to Speed Up Carbon Neutrals Goal",
                    source: "Eco Watch",
                    url: "https://example.com/news/climate",
                    publishedAt: new Date().toISOString()
                },
                {
                    title: "New Advancements in Quantum Computing Demonstrated",
                    source: "Science & Future",
                    url: "https://example.com/news/quantum",
                    publishedAt: new Date().toISOString()
                },
                {
                    title: "Championship Season Wraps Up with Historic Victory",
                    source: "Sports Network",
                    url: "https://example.com/news/sports",
                    publishedAt: new Date().toISOString()
                }
            ];
            return res.status(200).json(mockNews);
        }

        const url = `https://newsapi.org/v2/top-headlines?country=${sanitizedCountryCode}&apiKey=${apiKey}`;

        const response = await axios.get(url);
        const articles = response.data.articles;

        if (!articles || articles.length === 0) {
            return res.status(404).json({ error: `No news headlines found for country code '${sanitizedCountryCode}'.` });
        }

        // Limit strictly to a maximum of 10 articles
        const limitedArticles = articles.slice(0, 10);

        // Map response to the required structured format
        const formattedNews = limitedArticles.map(article => ({
            title: article.title || 'No Title Available',
            source: article.source.name || 'Unknown Source',
            url: article.url || '#',
            publishedAt: article.publishedAt || 'Unknown Date'
        }));

        res.status(200).json(formattedNews);

    } catch (error) {
        // Robust Error Handling for External API
        if (error.response) {
            return res.status(error.response.status).json({ 
                error: error.response.data.message || 'Error fetching news data from external API.' 
            });
        }
        
        console.error('News API Connection Error:', error.message);
        res.status(500).json({ error: 'Internal server error while connecting to NewsAPI.' });
    }
};
