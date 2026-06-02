import React, { useState } from "react";
import axios from "axios";

function Login({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please fill out all fields");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isRegister) {
        // Register API Call
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          username: username.trim(),
          password: password.trim(),
          role
        });
        setSuccess("Registration successful! You can now log in.");
        setIsRegister(false);
        setPassword("");
      } else {
        // Login API Call
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          username: username.trim(),
          password: password.trim()
        });

        // Store access token & user info
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("role", res.data.user.role);

        if (onLoginSuccess) {
          onLoginSuccess(res.data.user);
        }
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Something went wrong. Please check if backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div className="glass-container" style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logoBadge}>⚡</div>
          <h2 style={styles.title}>{isRegister ? "Join the Hub" : "Welcome Back"}</h2>
          <p style={styles.subtitle}>
            {isRegister 
              ? "Create your credential for Lab 14 Dashboard" 
              : "Sign in to manage patient registers & view APIs"}
          </p>
        </div>

        {error && (
          <div style={{ ...styles.alert, backgroundColor: "rgba(239, 68, 68, 0.15)", borderColor: "var(--error)", color: "var(--error)" }}>
            <span>⚠️</span> {error}
          </div>
        )}

        {success && (
          <div style={{ ...styles.alert, backgroundColor: "rgba(16, 185, 129, 0.15)", borderColor: "var(--success)", color: "var(--success)" }}>
            <span>✅</span> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {isRegister && (
            <div className="form-group">
              <label className="form-label" htmlFor="role">Assign Role</label>
              <select
                id="role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
              >
                <option value="user">User (View Only)</option>
                <option value="admin">Admin (Full CRUD Controls)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "10px" }}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              isRegister ? "Register Account" : "Sign In"
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <span style={styles.footerText}>
            {isRegister ? "Already have an account?" : "Need a new account?"}
          </span>
          <button
            style={styles.toggleBtn}
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
              setSuccess("");
            }}
            disabled={loading}
          >
            {isRegister ? "Sign In" : "Register Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "85vh",
    padding: "20px"
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "40px 30px",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    textAlign: "center",
    marginBottom: "25px"
  },
  logoBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "rgba(99, 102, 241, 0.15)",
    border: "1px solid var(--glass-border-glow)",
    fontSize: "1.5rem",
    marginBottom: "12px",
    color: "#6366f1"
  },
  title: {
    fontSize: "1.75rem",
    color: "#fff",
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "0.88rem",
    color: "var(--text-muted)",
    lineHeight: "1.4"
  },
  alert: {
    padding: "10px 14px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "8px",
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    marginTop: "25px",
    fontSize: "0.88rem"
  },
  footerText: {
    color: "var(--text-muted)"
  },
  toggleBtn: {
    background: "none",
    border: "none",
    color: "var(--secondary)",
    fontWeight: "600",
    cursor: "pointer",
    padding: "0",
    fontFamily: "var(--font-heading)"
  }
};

export default Login;
