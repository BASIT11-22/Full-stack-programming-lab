import React, { useState, useEffect } from "react";
import axios from "axios";

function Patients({ user }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");
  const [contact, setContact] = useState("");
  const [editingId, setEditingId] = useState(null);

  const isAdmin = user?.role === "admin";
  const token = localStorage.getItem("accessToken");

  // Auth header configuration helper
  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const fetchPatients = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/patients", getAuthHeader());
      setPatients(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Failed to load patients list. Please check authorization."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const resetForm = () => {
    setName("");
    setAge("");
    setDisease("");
    setContact("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !age || !disease.trim() || !contact.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const payload = { name, age: parseInt(age), disease, contact };

      if (editingId) {
        // Edit Patient (PUT)
        const res = await axios.put(
          `http://localhost:5000/api/patients/${editingId}`,
          payload,
          getAuthHeader()
        );
        setPatients(
          patients.map((p) => (p._id === editingId ? res.data : p))
        );
        setSuccess("Patient record updated successfully!");
      } else {
        // Create Patient (POST)
        const res = await axios.post(
          "http://localhost:5000/api/patients",
          payload,
          getAuthHeader()
        );
        setPatients([...patients, res.data]);
        setSuccess("New patient record added!");
      }
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save patient record.");
    }
  };

  const handleEditClick = (patient) => {
    setName(patient.name);
    setAge(patient.age);
    setDisease(patient.disease);
    setContact(patient.contact);
    setEditingId(patient._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient record?")) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`, getAuthHeader());
      setPatients(patients.filter((p) => p._id !== id));
      setSuccess("Patient record deleted.");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete patient record.");
    }
  };

  const getInitials = (fullName) => {
    if (!fullName) return "P";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div style={styles.grid}>
      {/* LEFT PANEL: CRUD FORM (Only editable by Admin) */}
      <div className="glass-container" style={styles.formCard}>
        <h3 style={styles.sectionTitle}>
          {isAdmin ? (editingId ? "✏️ Edit Patient Record" : "➕ Add New Patient") : "ℹ️ Access Status"}
        </h3>
        <p style={styles.sectionSubtitle}>
          {isAdmin 
            ? "Modify clinical logs below. All fields are audited." 
            : "You are logged in with User permissions. Edit rights are disabled."}
        </p>

        {isAdmin ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Patient Name</label>
              <input
                type="text"
                id="name"
                className="form-input"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div style={styles.row}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label" htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  className="form-input"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{ flex: 2 }}>
                <label className="form-label" htmlFor="contact">Contact Number</label>
                <input
                  type="text"
                  id="contact"
                  className="form-input"
                  placeholder="e.g. +92 300 1234567"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="disease">Diagnosed Disease</label>
              <input
                type="text"
                id="disease"
                className="form-input"
                placeholder="e.g. Hypertension, Flu"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                required
              />
            </div>

            <div style={styles.formBtnGroup}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                {editingId ? "Update Record" : "Add Patient"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        ) : (
          <div style={styles.readOnlyPrompt}>
            <div style={styles.shieldIcon}>🛡️</div>
            <h4>View-Only Mode</h4>
            <p>Admin rights are required to Create, Edit, or Delete patient registry profiles. Please contact your administrator if you need write privileges.</p>
          </div>
        )}

        {error && (
          <div style={{ ...styles.alert, ...styles.alertError }}>
            <span>⚠️</span> {error}
          </div>
        )}

        {success && (
          <div style={{ ...styles.alert, ...styles.alertSuccess }}>
            <span>✅</span> {success}
          </div>
        )}
      </div>

      {/* RIGHT PANEL: PATIENTS REGISTRY CARD GRID */}
      <div className="glass-container" style={styles.listCard}>
        <div style={styles.listHeader}>
          <div>
            <h3 style={styles.sectionTitle}>📋 Patients Registry</h3>
            <span style={styles.sectionSubtitle}>
              Total Logs: {patients.length} records
            </span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={fetchPatients} disabled={loading}>
            {loading ? "Refreshing..." : "🔄 Refresh"}
          </button>
        </div>

        <div style={styles.listArea}>
          {loading && (
            <div style={styles.loader}>
              <div className="skeleton skeleton-title" style={{ width: "40%" }}></div>
              <div className="skeleton skeleton-text" style={{ height: "100px", margin: "10px 0" }}></div>
            </div>
          )}

          {!loading && patients.length === 0 && (
            <div style={styles.emptyState}>
              <span>📂</span>
              <p>No patient records found.</p>
              {isAdmin && <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Use the form on the left to add your first record!</p>}
            </div>
          )}

          {!loading && patients.length > 0 && (
            <div style={styles.cardGrid}>
              {patients.map((p) => (
                <div key={p._id} className="glass-container patient-card">
                  <div className="patient-card-header">
                    <div className="avatar-circle">
                      {getInitials(p.name)}
                    </div>
                    <div>
                      <h4 style={{ color: "#fff", fontSize: "1.05rem", fontWeight: "600" }}>{p.name}</h4>
                      <span className="badge badge-user" style={{ marginTop: "4px" }}>
                        {p.age} Years Old
                      </span>
                    </div>
                  </div>

                  <div className="patient-info-body">
                    <div className="patient-meta-pill">
                      <span>🩺</span>
                      <span>Diagnosed: <strong>{p.disease}</strong></span>
                    </div>
                    <div className="patient-meta-pill">
                      <span>📞</span>
                      <span>Contact: {p.contact}</span>
                    </div>
                  </div>

                  {isAdmin && (
                    <div style={styles.cardActions}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => handleEditClick(p)}
                      >
                        Edit Details
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => handleDelete(p._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.8fr",
    gap: "24px",
    width: "100%",
    alignItems: "start"
  },
  formCard: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  listCard: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minHeight: "450px"
  },
  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid var(--border-slate)",
    paddingBottom: "16px"
  },
  sectionTitle: {
    fontSize: "1.2rem",
    color: "#fff"
  },
  sectionSubtitle: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)"
  },
  row: {
    display: "flex",
    gap: "12px"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  formBtnGroup: {
    display: "flex",
    gap: "8px",
    marginTop: "8px"
  },
  readOnlyPrompt: {
    textAlign: "center",
    padding: "40px 20px",
    background: "rgba(0,0,0,0.15)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.03)",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  shieldIcon: {
    fontSize: "3rem",
    lineHeight: "1"
  },
  listArea: {
    flex: 1,
    marginTop: "16px"
  },
  loader: {
    padding: "20px 0"
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "280px",
    color: "var(--text-secondary)",
    gap: "10px"
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "16px",
    width: "100%"
  },
  cardActions: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
    borderTop: "1px solid var(--border-slate)",
    paddingTop: "12px"
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
    marginTop: "16px"
  },
  alertError: {
    backgroundColor: "rgba(255, 74, 90, 0.12)",
    borderColor: "var(--danger-red)",
    color: "var(--danger-red)"
  },
  alertSuccess: {
    backgroundColor: "rgba(0, 245, 160, 0.12)",
    borderColor: "var(--emerald-neon)",
    color: "var(--emerald-neon)"
  }
};

export default Patients;
