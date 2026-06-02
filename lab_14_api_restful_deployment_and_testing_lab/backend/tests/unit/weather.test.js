const { getSimulatedWeather, fallbackCities } = require("../../routes/weatherRoutes");

describe("Weather API Unit Tests", () => {
  test("getSimulatedWeather should return formatted weather data for known fallback cities", () => {
    const data = getSimulatedWeather("islamabad");
    expect(data).toBeDefined();
    expect(data.name).toBe("Islamabad");
    expect(data.temperature).toBe(fallbackCities.islamabad.temperature);
    expect(data.condition).toBe(fallbackCities.islamabad.condition);
    expect(data.humidity).toBe(fallbackCities.islamabad.humidity);
    expect(data.isSimulated).toBe(true);
  });

  test("getSimulatedWeather should dynamically generate deterministic data for arbitrary cities", () => {
    const city1 = "Melbourne";
    const city2 = "Melbourne";
    const data1 = getSimulatedWeather(city1);
    const data2 = getSimulatedWeather(city2);

    expect(data1.name).toBe("Melbourne");
    expect(data1.temperature).toBeGreaterThanOrEqual(5);
    expect(data1.temperature).toBeLessThanOrEqual(35);
    expect(data1.humidity).toBeGreaterThanOrEqual(30);
    expect(data1.humidity).toBeLessThanOrEqual(95);
    
    // Deterministic test
    expect(data1.temperature).toBe(data2.temperature);
    expect(data1.condition).toBe(data2.condition);
    expect(data1.humidity).toBe(data2.humidity);
  });

  test("getSimulatedWeather should throw an error for empty city string", () => {
    expect(() => getSimulatedWeather("")).toThrow("City name cannot be empty");
    expect(() => getSimulatedWeather("   ")).toThrow("City name cannot be empty");
  });

  test("getSimulatedWeather should format complex city names correctly", () => {
    const data = getSimulatedWeather("san francisco");
    expect(data.name).toBe("San Francisco");
  });
});
