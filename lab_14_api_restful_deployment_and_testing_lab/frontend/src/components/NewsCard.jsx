import React, { useState, useEffect } from "react";
import axios from "axios";

const countryPills = [
  { code: "us", name: "United States", flag: "🇺🇸" },
  { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
  { code: "pk", name: "Pakistan", flag: "🇵🇰" },
  { code: "jp", name: "Japan", flag: "🇯🇵" },
  { code: "fr", name: "France", flag: "🇫🇷" }
];

function NewsCard() {
  const [country, setCountry] = useState("us");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sourceType, setSourceType] = useState("");

  const fetchNews = async (code) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:5000/api/news/${code}`);
      setArticles(res.data.articles || []);
      setSourceType(res.data.source || "");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to fetch news headlines.");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(country);
  }, [country]);

  const formatDate = (dateStr) => {
    try {
      const pubDate = new Date(dateStr);
      return pubDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="glass-container" style={styles.card}>
      <div style={styles.header}>
        <div style={styles.titleGroup}>
          <span style={styles.icon}>📰</span>
          <div>
            <h3 style={styles.title}>Global Chronicles</h3>
            <span style={styles.endpoint}>GET /api/news/:country</span>
          </div>
        </div>
        {sourceType && (
          <span
            className={`badge ${
              sourceType.includes("live") ? "badge-live" : "badge-simulated"
            }`}
            style={{ margin: 0 }}
          >
            {sourceType.includes("live") ? "LIVE FEED" : "SIMULATED"}
          </span>
        )}
      </div>

      <div style={styles.filtersContainer}>
        {countryPills.map((p) => (
          <button
            key={p.code}
            onClick={() => setCountry(p.code)}
            className={`btn ${country === p.code ? "btn-primary" : "btn-secondary"} btn-sm`}
            style={styles.filterPill}
            disabled={loading}
          >
            <span style={styles.flag}>{p.flag}</span>
            <span>{p.code.toUpperCase()}</span>
          </button>
        ))}
      </div>

      <div style={styles.feedArea}>
        {loading && (
          <div style={styles.skeletonContainer}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={styles.skeletonItem}>
                <div className="skeleton skeleton-title" style={{ width: "30%" }}></div>
                <div className="skeleton skeleton-text" style={{ height: "18px", width: "95%" }}></div>
                <div className="skeleton skeleton-text" style={{ width: "40%" }}></div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div style={styles.errorContainer}>
            <span style={styles.errorIcon}>⚠️</span>
            <p style={styles.errorTitle}>Failed to Load Headlines</p>
            <p style={styles.errorMsg}>{error}</p>
          </div>
        )}

        {articles.length === 0 && !loading && !error && (
          <div style={styles.emptyState}>
            <p>No headlines found for this country.</p>
          </div>
        )}

        {!loading && !error && articles.map((article, idx) => (
          <article key={idx} style={styles.newsItem} className="news-item-hover">
            <div style={styles.metaRow}>
              <span style={styles.sourceTag}>{article.source}</span>
              <span style={styles.dateTag}>{formatDate(article.publishedAt)}</span>
            </div>
            <h4 style={styles.newsTitle}>{article.title}</h4>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.storyLink}
            >
              Read Full Story <span style={styles.arrow}>&rarr;</span>
            </a>
          </article>
        ))}
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
    flex: 1.5,
    minHeight: "450px"
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
  filtersContainer: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    paddingBottom: "12px"
  },
  filterPill: {
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    fontSize: "0.8rem"
  },
  flag: {
    fontSize: "0.95rem"
  },
  feedArea: {
    flex: 1,
    overflowY: "auto",
    maxHeight: "400px",
    paddingRight: "4px",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  skeletonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  skeletonItem: {
    background: "rgba(255, 255, 255, 0.01)",
    border: "1px solid rgba(255, 255, 255, 0.03)",
    padding: "16px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "250px",
    color: "var(--error)",
    textAlign: "center"
  },
  errorIcon: {
    fontSize: "2.5rem"
  },
  errorTitle: {
    fontWeight: "600",
    marginTop: "8px",
    fontSize: "1.1rem"
  },
  errorMsg: {
    fontSize: "0.85rem",
    color: "var(--text-muted)",
    marginTop: "4px"
  },
  emptyState: {
    textAlign: "center",
    color: "var(--text-muted)",
    padding: "30px 0"
  },
  newsItem: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    padding: "16px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    transition: "transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease"
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.75rem"
  },
  sourceTag: {
    color: "var(--secondary)",
    fontWeight: "600"
  },
  dateTag: {
    color: "var(--text-muted)"
  },
  newsTitle: {
    fontSize: "0.95rem",
    color: "#fff",
    lineHeight: "1.4",
    fontWeight: "500"
  },
  storyLink: {
    alignSelf: "flex-start",
    fontSize: "0.8rem",
    color: "var(--primary-hover)",
    textDecoration: "none",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    marginTop: "4px"
  },
  arrow: {
    transition: "transform 0.2s ease"
  }
};

export default NewsCard;
