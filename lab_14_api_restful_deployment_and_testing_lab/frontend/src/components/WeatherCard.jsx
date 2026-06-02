import React, { useState, useEffect } from "react";
import axios from "axios";

const conditionEmojis = {
  clear: "☀️",
  sunny: "☀️",
  hot: "☀️",
  clouds: "☁️",
  cloudy: "☁️",
  overcast: "☁️",
  rain: "🌧️",
  rainy: "🌧️",
  drizzle: "🌧️",
  haze: "🌫️",
  mist: "🌫️",
  fog: "🌫️",
  windy: "💨",
  snow: "❄️",
  snowy: "❄️"
};

function WeatherCard() {
  const [city, setCity] = useState("Islamabad");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (targetCity) => {
    if (!targetCity.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:5000/api/weather/${encodeURIComponent(targetCity.trim())}`);
      setWeather(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to fetch weather data.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setCity(query);
    }
  };

  const getEmoji = (condition) => {
    if (!condition) return "🌤️";
    const condLower = condition.toLowerCase();
    for (const [key, value] of Object.entries(conditionEmojis)) {
      if (condLower.includes(key)) return value;
    }
    return "🌤️";
  };

  return (
    <div className="glass-container" style={styles.card}>
      <div style={styles.header}>
        <div style={styles.titleGroup}>
          <span style={styles.icon}>☀️</span>
          <div>
            <h3 style={styles.title}>Weather Oracle</h3>
            <span style={styles.endpoint}>GET /api/weather/:city</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSearch} style={styles.searchForm}>
        <input
          type="text"
          className="form-input"
          style={styles.searchInput}
          placeholder="Search city (e.g. London)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary" style={styles.searchBtn} disabled={loading}>
          {loading ? "..." : "Search"}
        </button>
      </form>

      <div style={styles.suggestions}>
        {["Islamabad", "Berlin", "Dubai", "Singapore"].map((c) => (
          <button
            key={c}
            onClick={() => {
              setQuery("");
              setCity(c);
            }}
            className="btn btn-secondary btn-sm"
            style={styles.pill}
            disabled={loading}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={styles.resultArea}>
        {loading && (
          <div style={styles.skeletonContainer}>
            <div className="skeleton skeleton-circle" style={styles.skeletonCircle}></div>
            <div className="skeleton skeleton-title" style={{ width: "40%", margin: "10px auto" }}></div>
            <div className="skeleton skeleton-text" style={{ width: "60%", margin: "5px auto" }}></div>
            <div className="skeleton skeleton-text" style={{ width: "50%", margin: "5px auto" }}></div>
          </div>
        )}

        {error && !loading && (
          <div style={styles.errorContainer}>
            <span style={styles.errorIcon}>⚠️</span>
            <p style={styles.errorTitle}>City Not Found</p>
            <p style={styles.errorMsg}>{error}</p>
          </div>
        )}

        {weather && !loading && (
          <div style={styles.info}>
            <div style={styles.emojiContainer}>
              {getEmoji(weather.condition)}
            </div>
            <h4 style={styles.cityName}>{weather.city}</h4>
            <div style={styles.tempContainer}>
              <span style={styles.temp}>{weather.temperature}</span>
              <span style={styles.unit}>°C</span>
            </div>
            <div style={styles.conditionTag}>{weather.condition}</div>

            <div style={styles.detailsGrid}>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Humidity</span>
                <span style={styles.detailValue}>{weather.humidity}%</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Source</span>
                <span
                  className={`badge ${
                    weather.source.includes("live") ? "badge-live" : "badge-simulated"
                  }`}
                >
                  {weather.source.includes("live") ? "LIVE DATA" : "SIMULATED"}
                </span>
              </div>
            </div>

            {weather.apiError && (
              <div style={styles.apiError}>
                API Fallback: {weather.apiError}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flex: 1
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  icon: {
    fontSize: "2rem"
  },
  title: {
    fontSize: "1.2rem",
    color: "#fff"
  },
  endpoint: {
    fontSize: "0.75rem",
    color: "var(--secondary)",
    fontFamily: "monospace"
  },
  searchForm: {
    display: "flex",
    gap: "8px"
  },
  searchInput: {
    flex: 1,
    padding: "8px 12px",
    fontSize: "0.9rem"
  },
  searchBtn: {
    padding: "8px 16px"
  },
  suggestions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },
  pill: {
    borderRadius: "15px",
    fontSize: "0.8rem",
    padding: "4px 10px"
  },
  resultArea: {
    minHeight: "220px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.15)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.03)",
    padding: "16px"
  },
  skeletonContainer: {
    width: "100%",
    textAlign: "center"
  },
  skeletonCircle: {
    margin: "0 auto 12px auto"
  },
  errorContainer: {
    textAlign: "center",
    padding: "16px",
    color: "var(--error)"
  },
  errorIcon: {
    fontSize: "2.5rem"
  },
  errorTitle: {
    fontFamily: "var(--font-heading)",
    fontWeight: "600",
    marginTop: "8px",
    fontSize: "1.1rem"
  },
  errorMsg: {
    fontSize: "0.85rem",
    color: "var(--text-muted)",
    marginTop: "4px"
  },
  info: {
    textAlign: "center",
    width: "100%"
  },
  emojiContainer: {
    fontSize: "3rem",
    lineHeight: "1",
    marginBottom: "8px"
  },
  cityName: {
    fontSize: "1.4rem",
    color: "#fff"
  },
  tempContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    margin: "4px 0"
  },
  temp: {
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#fff",
    fontFamily: "var(--font-heading)"
  },
  unit: {
    fontSize: "1rem",
    color: "var(--text-muted)",
    marginLeft: "2px"
  },
  conditionTag: {
    display: "inline-block",
    padding: "4px 12px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "500",
    color: "var(--text-secondary)",
    textTransform: "capitalize"
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    paddingTop: "16px"
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px"
  },
  detailLabel: {
    fontSize: "0.75rem",
    color: "var(--text-muted)"
  },
  detailValue: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#fff"
  },
  apiError: {
    fontSize: "0.7rem",
    color: "var(--text-muted)",
    marginTop: "12px",
    fontStyle: "italic"
  }
};

export default WeatherCard;
