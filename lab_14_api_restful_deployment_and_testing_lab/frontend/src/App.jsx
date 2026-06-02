import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import WeatherCard from "./components/WeatherCard";
import NewsCard from "./components/NewsCard";

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("patients"); // patients | external

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (token && username && role) {
      setUser({ username, role });
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <div style={styles.appContainer}>
      {/* Background Orbs */}
      <div className="bg-gradient-glow">
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
      </div>

      {!user ? (
        // Centered Login Card
        <div style={styles.loginWrapper}>
          <Login onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        // Redesigned Sidebar Layout
        <div className="dashboard-layout">
          {/* LEFT SIDEBAR PANEL */}
          <aside className="sidebar">
            <div style={styles.sidebarTop}>
              <div style={styles.brandGroup}>
                <span style={styles.brandIcon}>✳️</span>
                <div>
                  <h2 style={styles.brandName}>AuraCare</h2>
                  <span style={styles.brandSubtitle}>Clinical Control Desk</span>
                </div>
              </div>

              <nav style={styles.nav}>
                <button
                  onClick={() => setActiveTab("patients")}
                  className={`btn ${activeTab === "patients" ? "btn-primary" : "btn-secondary"}`}
                  style={styles.navItem}
                >
                  📋 Patients Registry
                </button>
                <button
                  onClick={() => setActiveTab("external")}
                  className={`btn ${activeTab === "external" ? "btn-primary" : "btn-secondary"}`}
                  style={styles.navItem}
                >
                  📡 Live Info Feeds
                </button>
              </nav>
            </div>

            <div style={styles.sidebarBottom}>
              <div style={styles.userInfo}>
                <div style={styles.userInitials}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div style={styles.userDetails}>
                  <div style={styles.username}>{user.username}</div>
                  <span className={`badge badge-${user.role}`}>
                    {user.role}
                  </span>
                </div>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                style={styles.logoutBtn}
                onClick={handleLogout}
              >
                Logout Account
              </button>
            </div>
          </aside>

          {/* MAIN VIEWPORT CANVAS */}
          <main className="main-viewport">
            <header style={styles.mainHeader}>
              <div>
                <h1 style={styles.pageTitle}>
                  {activeTab === "patients" ? "Patients Directory" : "External Services Panel"}
                </h1>
                <p style={styles.pageSubtitle}>
                  {activeTab === "patients"
                    ? "Manage local clinical records, diagnoses, and contact logs."
                    : "Real-time query integrations with weather forecasts and top headlines."}
                </p>
              </div>
              <div style={styles.timeBadge}>
                <span>System Active</span>
              </div>
            </header>

            {activeTab === "patients" ? (
              <Patients user={user} />
            ) : (
              <div style={styles.widgetsGrid}>
                <WeatherCard />
                <NewsCard />
              </div>
            )}

            <footer style={styles.footer}>
              <p>BSSE-VI-B & A &bull; Full Stack Lab 14 &bull; Instructor: Mr. Sharif Hussain</p>
            </footer>
          </main>
        </div>
      )}
    </div>
  );
}

const styles = {
  appContainer: {
    minHeight: "100vh"
  },
  loginWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%"
  },
  sidebarTop: {
    display: "flex",
    flexDirection: "column",
    gap: "35px"
  },
  brandGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  brandIcon: {
    fontSize: "1.8rem",
    color: "var(--emerald-neon)",
    textShadow: "0 0 10px rgba(0, 245, 160, 0.4)"
  },
  brandName: {
    fontSize: "1.25rem",
    color: "#fff",
    fontWeight: "700"
  },
  brandSubtitle: {
    fontSize: "0.75rem",
    color: "var(--text-secondary)"
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  navItem: {
    width: "100%",
    justifyContent: "flex-start",
    padding: "12px 16px"
  },
  sidebarBottom: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    borderTop: "1px solid var(--border-slate)",
    paddingTop: "20px"
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  userInitials: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(0, 245, 160, 0.1)",
    border: "1px solid var(--emerald-neon)",
    color: "var(--emerald-neon)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "0.9rem"
  },
  userDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "2px"
  },
  username: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#fff"
  },
  logoutBtn: {
    width: "100%"
  },
  mainHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid var(--border-slate)",
    paddingBottom: "24px",
    marginBottom: "30px"
  },
  pageTitle: {
    fontSize: "1.65rem",
    color: "#fff",
    marginBottom: "4px"
  },
  pageSubtitle: {
    fontSize: "0.88rem",
    color: "var(--text-secondary)"
  },
  timeBadge: {
    padding: "6px 12px",
    background: "rgba(0, 245, 160, 0.08)",
    border: "1px solid rgba(0, 245, 160, 0.2)",
    color: "var(--emerald-neon)",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "600"
  },
  widgetsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.3fr",
    gap: "24px",
    alignItems: "start"
  },
  footer: {
    marginTop: "50px",
    borderTop: "1px solid var(--border-slate)",
    paddingTop: "20px",
    textAlign: "center",
    color: "var(--text-muted)",
    fontSize: "0.78rem"
  }
};

export default App;
