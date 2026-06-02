const { isValidCountryCode, formatArticles } = require("../../routes/newsRoutes");

describe("News API Unit Tests", () => {
  describe("isValidCountryCode", () => {
    test("should return true for valid 2-letter alphabetic country codes", () => {
      expect(isValidCountryCode("us")).toBe(true);
      expect(isValidCountryCode("GB")).toBe(true);
      expect(isValidCountryCode("pk")).toBe(true);
    });

    test("should return false for invalid country codes", () => {
      expect(isValidCountryCode("")).toBe(false);
      expect(isValidCountryCode("usa")).toBe(false);
      expect(isValidCountryCode("u")).toBe(false);
      expect(isValidCountryCode("12")).toBe(false);
      expect(isValidCountryCode(null)).toBe(false);
    });
  });

  describe("formatArticles", () => {
    test("should return empty array if input is not an array", () => {
      expect(formatArticles(null)).toEqual([]);
      expect(formatArticles(undefined)).toEqual([]);
      expect(formatArticles({})).toEqual([]);
    });

    test("should format articles correctly mapping title, source, url, and date", () => {
      const rawArticles = [
        {
          title: "Test News Title",
          source: { name: "Test Source" },
          url: "https://testnews.com",
          publishedAt: "2026-06-02T12:00:00Z"
        }
      ];

      const formatted = formatArticles(rawArticles);
      expect(formatted).toHaveLength(1);
      expect(formatted[0]).toEqual({
        title: "Test News Title",
        source: "Test Source",
        url: "https://testnews.com",
        publishedAt: "2026-06-02T12:00:00Z"
      });
    });

    test("should limit responses to a range of 5-10 articles", () => {
      const rawArticlesList = Array(15).fill({
        title: "Test Title",
        source: "Test Source",
        url: "https://testnews.com",
        publishedAt: "2026-06-02T12:00:00Z"
      });

      // Max limit is 10
      const formattedDefault = formatArticles(rawArticlesList);
      expect(formattedDefault.length).toBe(10);

      // Custom limit
      const formattedCustom = formatArticles(rawArticlesList, 6);
      expect(formattedCustom.length).toBe(6);

      // Floor of limit is 5
      const formattedFloor = formatArticles(rawArticlesList, 2);
      expect(formattedFloor.length).toBe(5);
    });
  });
});
