const request = require("supertest");
const app = require("../../app");
const axios = require("axios");

// Mock axios
jest.mock("axios");

describe("Weather and News API Integration Tests", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("GET /api/weather", () => {
    test("should return simulated data when no API key is set", async () => {
      delete process.env.OPENWEATHER_API_KEY;

      const res = await request(app).get("/api/weather/Karachi");
      expect(res.status).toBe(200);
      expect(res.body.city).toBe("Karachi");
      expect(res.body.source).toContain("simulated");
      expect(res.body.temperature).toBeDefined();
      expect(res.body.condition).toBeDefined();
      expect(res.body.humidity).toBeDefined();
    });

    test("should return 400 when city parameter is missing", async () => {
      const res = await request(app).get("/api/weather/");
      // Note: app binds router.get("/") to the handler, which requires city query if params empty
      expect(res.status).toBe(400);
      expect(res.body.error).toContain("City parameter is required");
    });

    test("should return live weather data when API key is configured and Axios call succeeds", async () => {
      process.env.OPENWEATHER_API_KEY = "fake_weather_key";

      const mockWeatherResponse = {
        data: {
          name: "Paris",
          main: {
            temp: 18.6,
            humidity: 80
          },
          weather: [
            { main: "Rain" }
          ]
        }
      };

      axios.get.mockResolvedValueOnce(mockWeatherResponse);

      const res = await request(app).get("/api/weather/Paris");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        city: "Paris",
        temperature: 19, // rounded from 18.6
        condition: "Rain",
        humidity: 80,
        source: "live"
      });
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("https://api.openweathermap.org/data/2.5/weather")
      );
    });

    test("should return 404 error when city is not found by OpenWeather API", async () => {
      process.env.OPENWEATHER_API_KEY = "fake_weather_key";

      axios.get.mockRejectedValueOnce({
        response: {
          status: 404
        },
        message: "Request failed with status code 404"
      });

      const res = await request(app).get("/api/weather/unknowncity");
      expect(res.status).toBe(404);
      expect(res.body.error).toContain("not found");
    });

    test("should fallback to simulated weather data when OpenWeather API fails with general errors", async () => {
      process.env.OPENWEATHER_API_KEY = "fake_weather_key";

      axios.get.mockRejectedValueOnce(new Error("Timeout connection"));

      const res = await request(app).get("/api/weather/Paris");
      expect(res.status).toBe(200);
      expect(res.body.city).toBe("Paris");
      expect(res.body.source).toBe("simulated (live API failed)");
      expect(res.body.apiError).toBe("Timeout connection");
    });
  });

  describe("GET /api/news", () => {
    test("should return 400 when country code length is not exactly 2 letters", async () => {
      const res = await request(app).get("/api/news/usa");
      expect(res.status).toBe(400);
      expect(res.body.error).toContain("Invalid country code");

      const resShort = await request(app).get("/api/news/u");
      expect(resShort.status).toBe(400);
    });

    test("should return simulated headlines when no API key is configured", async () => {
      delete process.env.NEWS_API_KEY;

      const res = await request(app).get("/api/news/pk");
      expect(res.status).toBe(200);
      expect(res.body.country).toBe("PK");
      expect(res.body.source).toContain("simulated");
      expect(res.body.articles.length).toBeGreaterThanOrEqual(2);
      expect(res.body.articles[0]).toHaveProperty("title");
      expect(res.body.articles[0]).toHaveProperty("source");
    });

    test("should return live news articles when API key is configured and Axios call succeeds", async () => {
      process.env.NEWS_API_KEY = "fake_news_key";

      const mockNewsResponse = {
        data: {
          articles: [
            { title: "Live Headline 1", source: { name: "BBC News" }, url: "https://bbc.com/1", publishedAt: "2026-06-02" },
            { title: "Live Headline 2", source: { name: "CNN" }, url: "https://cnn.com/2", publishedAt: "2026-06-02" },
            { title: "Live Headline 3", source: { name: "Reuters" }, url: "https://reuters.com/3", publishedAt: "2026-06-02" },
            { title: "Live Headline 4", source: { name: "Dawn" }, url: "https://dawn.com/4", publishedAt: "2026-06-02" },
            { title: "Live Headline 5", source: { name: "TechCrunch" }, url: "https://techcrunch.com/5", publishedAt: "2026-06-02" },
            { title: "Live Headline 6", source: { name: "Wired" }, url: "https://wired.com/6", publishedAt: "2026-06-02" }
          ]
        }
      };

      axios.get.mockResolvedValueOnce(mockNewsResponse);

      const res = await request(app).get("/api/news/gb");
      expect(res.status).toBe(200);
      expect(res.body.country).toBe("GB");
      expect(res.body.source).toBe("live");
      expect(res.body.count).toBe(6);
      expect(res.body.articles).toHaveLength(6);
      expect(res.body.articles[0]).toEqual({
        title: "Live Headline 1",
        source: "BBC News",
        url: "https://bbc.com/1",
        publishedAt: "2026-06-02"
      });
    });

    test("should return 400 if NewsAPI reports the country parameter as unsupported", async () => {
      process.env.NEWS_API_KEY = "fake_news_key";

      axios.get.mockRejectedValueOnce({
        response: {
          status: 400
        },
        message: "Bad Request"
      });

      const res = await request(app).get("/api/news/zz");
      expect(res.status).toBe(400);
      expect(res.body.error).toContain("is not supported by NewsAPI or is invalid");
    });

    test("should fallback to simulated news if NewsAPI suffers network or credential failure", async () => {
      process.env.NEWS_API_KEY = "fake_news_key";

      axios.get.mockRejectedValueOnce(new Error("API rate limit exceeded"));

      const res = await request(app).get("/api/news/us");
      expect(res.status).toBe(200);
      expect(res.body.country).toBe("US");
      expect(res.body.source).toBe("simulated (live API failed)");
      expect(res.body.articles).toBeDefined();
      expect(res.body.apiError).toBe("API rate limit exceeded");
    });
  });
});
