import React, { useState, useEffect } from "react";
import {
  Home,
  PlusCircle,
  Activity,
  User,
  MapPin,
  Camera,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  ThumbsUp,
  X,
  ChevronRight,
  ShieldCheck,
  Award,
  LogOut,
  ChevronDown,
} from "lucide-react";
import "./App.css";

const API_BASE = "http://localhost:5000/api/v1";

export default function App() {
  // Navigation & View State
  const [currentTab, setCurrentTab] = useState("feed");
  const [feedSubTab, setFeedSubTab] = useState("active");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [profileSubTab, setProfileSubTab] = useState("activity");
  const [expandedStep, setExpandedStep] = useState(3);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  // Form State (Screen 3)
  const [formCategory, setFormCategory] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formUrgency, setFormUrgency] = useState("medium");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Real-time Countdown Timer for Blockage (Screen 4)
  const [timeLeft, setTimeLeft] = useState(47 * 3600 + 23 * 60 + 41);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSeconds) => {
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h} : ${m} : ${s}`;
  };

  // Mock Active Issues (Screen 1)
  const activeIssues = [
    {
      id: "#CIVIC-8924",
      title: "Severe Pothole Cluster on Civil Lines Crossing",
      location: "Civil Lines, Ward #14",
      status: "Under Process",
      votes: 38,
      comments: 12,
      img: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "#CIVIC-7612",
      title: "Overflowing Waste Container Near Market",
      location: "Katra Sabzi Mandi, Ward #12",
      status: "Under Process",
      votes: 24,
      comments: 7,
      img: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "#CIVIC-5038",
      title: "Non-functional Streetlights on MG Marg",
      location: "MG Marg, Ward #14",
      status: "Under Process",
      votes: 19,
      comments: 4,
      img: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80",
    },
  ];

  // Mock Resolved Feed (Screen 2)
  const resolvedIssues = [
    {
      id: "#CIVIC-4102",
      title: "Water Main Pipeline Breach Repaired",
      location: "Tagore Town, Ward #09",
      summary:
        "Pipeline re-welded and surface restored within 24h by Jal Sansthan.",
      user: "Ramesh K. (Verified Citizen)",
      img: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80",
    },
  ];

  // Screen 4 Stepper Lifecycle Data
  const steps = [
    {
      title: "Post Submitted",
      dept: "Automated AI Gateway",
      time: "14 Aug, 09:12 AM",
      state: "done",
    },
    {
      title: "AI & Location Verified",
      dept: "YOLOv8 + PostGIS Engine",
      time: "14 Aug, 09:15 AM",
      state: "done",
    },
    {
      title: "Assigned to Ward",
      dept: "Prayagraj Nagar Nigam (Ward #14)",
      time: "14 Aug, 11:30 AM",
      state: "done",
    },
    {
      title: "Field Inspection Blocked",
      dept: "Junior Engineer Desk",
      time: "15 Aug, 02:45 PM",
      state: "blocked",
    },
    {
      title: "Resolution Work",
      dept: "Road Maintenance Dept",
      time: "Pending",
      state: "pending",
    },
    {
      title: "Resolved & Closed",
      dept: "State Admin Verification",
      time: "Pending",
      state: "pending",
    },
  ];

  const handleFormSubmit = () => {
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsReportOpen(false);
      setFormTitle("");
      setFormDesc("");
      setFormCategory("");
      setHasPhoto(false);
    }, 2000);
  };

  return (
    <div className="app-viewport">
      <div className="mobile-frame">
        {/* Mobile Device Status Bar */}
        <div className="status-bar mono">
          <span>09:41</span>
          <span>5G • 100%</span>
        </div>

        {/* Top Header */}
        <header className="main-header">
          <div>
            <h1 className="header-title">CivicHub Prayagraj</h1>
            <span className="header-sub">Municipal Zone 4 • Live Feed</span>
          </div>
          <span className="header-badge">● Live Ward 14</span>
        </header>

        {/* ─── SCREEN 1 & 2: HOME FEED (Active / Thank You) ────────────────── */}
        {currentTab === "feed" && (
          <main className="screen-body">
            <div className="filter-tabs">
              <button
                onClick={() => setFeedSubTab("active")}
                className={`filter-btn ${feedSubTab === "active" ? "active" : ""}`}
              >
                Active Issues (3)
              </button>
              <button
                onClick={() => setFeedSubTab("resolved")}
                className={`filter-btn ${feedSubTab === "resolved" ? "active" : ""}`}
              >
                Thank You Feed
              </button>
            </div>

            {feedSubTab === "active"
              ? activeIssues.map((issue) => (
                  <article key={issue.id} className="issue-card">
                    <div className="card-img-wrap">
                      <img
                        src={issue.img}
                        alt={issue.title}
                        className="card-img"
                      />
                      <span className="badge-overlay badge-amber">
                        ● {issue.status}
                      </span>
                    </div>
                    <div className="card-info">
                      <div className="card-header-row">
                        <span className="issue-id mono">{issue.id}</span>
                        <span className="card-meta">
                          <MapPin size={12} /> {issue.location}
                        </span>
                      </div>
                      <h2 className="card-title">{issue.title}</h2>
                      <div className="card-actions">
                        <div className="action-btn-group">
                          <button className="action-chip">
                            <ThumbsUp size={14} /> {issue.votes}
                          </button>
                          <button className="action-chip">
                            <MessageSquare size={14} /> {issue.comments}
                          </button>
                        </div>
                        <button
                          onClick={() => setCurrentTab("tracker")}
                          className="btn-track"
                        >
                          Track Journey
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              : resolvedIssues.map((item) => (
                  <article key={item.id} className="issue-card">
                    <div className="card-img-wrap">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="card-img"
                      />
                      <span className="badge-overlay badge-green">
                        ✓ Resolved
                      </span>
                    </div>
                    <div className="card-info">
                      <div className="card-header-row">
                        <span className="issue-id mono">{item.id}</span>
                        <span className="card-meta">
                          <CheckCircle2 size={12} color="#10B981" /> {item.user}
                        </span>
                      </div>
                      <h2 className="card-title">{item.title}</h2>
                      <p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                        {item.summary}
                      </p>
                    </div>
                  </article>
                ))}
          </main>
        )}

        {/* ─── SCREEN 4: TRACKING TIMELINE (#CIVIC-2579) ──────────────────── */}
        {currentTab === "tracker" && (
          <main className="screen-body">
            <div className="issue-card" style={{ padding: "0.875rem" }}>
              <div className="card-header-row">
                <span className="issue-id mono">#CIVIC-2579</span>
                <span
                  className="badge-overlay badge-amber"
                  style={{ position: "static" }}
                >
                  Stage 4 of 6
                </span>
              </div>
              <h2 className="card-title" style={{ marginTop: "0.25rem" }}>
                Waterlogging — Civil Lines Main Road
              </h2>
              <span className="card-meta" style={{ marginTop: "0.25rem" }}>
                Filed by Amit Verma • 14 Aug 2026
              </span>
            </div>

            {/* Stats Row */}
            <div className="stats-grid">
              <div className="stat-tile">
                <div className="stat-val mono" style={{ color: "#3B82F6" }}>
                  4
                </div>
                <div className="stat-label">Days Active</div>
              </div>
              <div className="stat-tile">
                <div className="stat-val mono" style={{ color: "#8B5CF6" }}>
                  142
                </div>
                <div className="stat-label">Upvotes</div>
              </div>
              <div className="stat-tile">
                <div className="stat-val mono" style={{ color: "#F59E0B" }}>
                  L2
                </div>
                <div className="stat-label">Dept Level</div>
              </div>
            </div>

            {/* Blockage Alert Panel */}
            <div className="blockage-panel">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#EF4444",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                }}
              >
                <AlertTriangle size={16} /> Active Blockage Detected
              </div>
              <p style={{ fontSize: "0.7rem", color: "#CBD5E1" }}>
                Assigned JE failed mandatory 48-hour physical site verification.
                Automatic escalation triggered.
              </p>
              <div className="countdown-box mono">
                {formatCountdown(timeLeft)}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "#94a3b8",
                  textAlign: "center",
                }}
              >
                Auto-Escalation Path: JE Desk → District Magistrate → State
                Urban Portal
              </div>
            </div>

            {/* Vertical Stepper Journey */}
            <div className="stepper-container">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="step-node"
                  onClick={() => setExpandedStep(idx)}
                >
                  <div className={`node-icon-box ${step.state}`}>
                    {step.state === "done"
                      ? "✓"
                      : step.state === "blocked"
                        ? "!"
                        : idx + 1}
                  </div>
                  <div className="step-content">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <strong style={{ fontSize: "0.75rem" }}>
                        {step.title}
                      </strong>
                      <span
                        className="mono"
                        style={{ fontSize: "0.65rem", color: "#64748B" }}
                      >
                        {step.time}
                      </span>
                    </div>
                    {expandedStep === idx && (
                      <div
                        style={{
                          marginTop: "0.35rem",
                          fontSize: "0.65rem",
                          color: "#94A3B8",
                        }}
                      >
                        Handler: <strong>{step.dept}</strong>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* ─── SCREEN 5: PROFILE ─────────────────────────────────────────── */}
        {currentTab === "profile" && (
          <main className="screen-body">
            <div className="profile-banner">
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <div className="avatar-ring">🇮🇳</div>
                <div>
                  <h2 style={{ fontSize: "1rem", fontWeight: 700 }}>
                    Amit Verma
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontSize: "0.7rem",
                      color: "#38BDF8",
                    }}
                  >
                    <ShieldCheck size={14} /> Verified Citizen (Level 4)
                  </div>
                  <span style={{ fontSize: "0.65rem", color: "#94A3B8" }}>
                    Civil Lines, Prayagraj
                  </span>
                </div>
              </div>

              <div className="profile-stats-row mono">
                <div>
                  <div style={{ color: "#3B82F6", fontWeight: 700 }}>12</div>
                  <div style={{ fontSize: "0.6rem", color: "#94A3B8" }}>
                    Filed
                  </div>
                </div>
                <div>
                  <div style={{ color: "#10B981", fontWeight: 700 }}>8</div>
                  <div style={{ fontSize: "0.6rem", color: "#94A3B8" }}>
                    Resolved
                  </div>
                </div>
                <div>
                  <div style={{ color: "#8B5CF6", fontWeight: 700 }}>94%</div>
                  <div style={{ fontSize: "0.6rem", color: "#94A3B8" }}>
                    Score
                  </div>
                </div>
                <div>
                  <div style={{ color: "#F59E0B", fontWeight: 700 }}>4</div>
                  <div style={{ fontSize: "0.6rem", color: "#94A3B8" }}>
                    Tracking
                  </div>
                </div>
              </div>
            </div>

            <div className="filter-tabs">
              <button
                onClick={() => setProfileSubTab("activity")}
                className={`filter-btn ${profileSubTab === "activity" ? "active" : ""}`}
              >
                Activity & Impact
              </button>
              <button
                onClick={() => setProfileSubTab("settings")}
                className={`filter-btn ${profileSubTab === "settings" ? "active" : ""}`}
              >
                Account Settings
              </button>
            </div>

            {profileSubTab === "activity" ? (
              <>
                <div className="issue-card" style={{ padding: "0.75rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "#94A3B8" }}>
                    Resolution Impact
                  </span>
                  <div
                    style={{
                      height: "8px",
                      background: "#020617",
                      borderRadius: "9999px",
                      overflow: "hidden",
                      margin: "0.35rem 0",
                    }}
                  >
                    <div
                      style={{
                        width: "67%",
                        height: "100%",
                        background: "linear-gradient(90deg, #3B82F6, #10B981)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.65rem",
                      color: "#64748B",
                    }}
                  >
                    <span>67% Resolved</span>
                    <span>Top 5% Civic Leader</span>
                  </div>
                </div>

                <div className="settings-group">
                  <div className="settings-item">
                    <span>#CIVIC-8924 Road Hazard</span>
                    <span className="mono" style={{ color: "#F59E0B" }}>
                      Under Process
                    </span>
                  </div>
                  <div className="settings-item">
                    <span>#CIVIC-4102 Water Main</span>
                    <span className="mono" style={{ color: "#10B981" }}>
                      Resolved
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="settings-group">
                <div className="settings-item">
                  <span>Citizen ID</span>
                  <span className="mono">CZ-9421-PRY</span>
                </div>
                <div className="settings-item">
                  <span>Identity Verification</span>
                  <span style={{ color: "#10B981" }}>✓ Completed</span>
                </div>
                <div className="settings-item">
                  <span>Notification Settings</span>
                  <span>Push & SMS</span>
                </div>

                {!showSignOutConfirm ? (
                  <button
                    onClick={() => setShowSignOutConfirm(true)}
                    className="btn-submit"
                    style={{
                      background: "#1E293B",
                      color: "#EF4444",
                      marginTop: "0.5rem",
                    }}
                  >
                    <LogOut
                      size={14}
                      style={{ display: "inline", marginRight: "6px" }}
                    />{" "}
                    Sign Out
                  </button>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    <button
                      onClick={() => setShowSignOutConfirm(false)}
                      className="filter-btn"
                      style={{ background: "#1E293B" }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => alert("Signed Out")}
                      className="filter-btn"
                      style={{ background: "#EF4444", color: "#FFF" }}
                    >
                      Confirm Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        )}

        {/* ─── SCREEN 3: REPORT MODAL (FAB Opened) ────────────────────────── */}
        {isReportOpen && (
          <div className="modal-overlay">
            <div className="modal-header">
              <h2 style={{ fontSize: "1rem", fontWeight: 700 }}>
                Report Civic Problem
              </h2>
              <button
                onClick={() => setIsReportOpen(false)}
                className="close-btn"
              >
                <X size={20} />
              </button>
            </div>

            {submitSuccess ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.75rem",
                  textAlign: "center",
                }}
              >
                <CheckCircle2 size={48} color="#10B981" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                  Post Successfully Logged!
                </h3>
                <p
                  className="mono"
                  style={{ fontSize: "0.8rem", color: "#38BDF8" }}
                >
                  Tracking ID: #CIVIC-9932
                </p>
                <span style={{ fontSize: "0.7rem", color: "#94A3B8" }}>
                  Routed to Prayagraj Ward #14 Maintenance Engine
                </span>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  marginTop: "0.75rem",
                }}
              >
                {/* Photo Box */}
                <div
                  className={`upload-box ${hasPhoto ? "has-file" : ""}`}
                  onClick={() => setHasPhoto(!hasPhoto)}
                >
                  {hasPhoto ? (
                    <img
                      src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80"
                      alt="Uploaded Infrastructure"
                      className="uploaded-preview"
                    />
                  ) : (
                    <>
                      <Camera size={24} color="#64748B" />
                      <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                        Tap to capture or upload photo
                      </span>
                      <span style={{ fontSize: "0.65rem", color: "#64748B" }}>
                        EXIF & Anti-Fraud Scan Active
                      </span>
                    </>
                  )}
                </div>

                {/* Category Grid */}
                <div>
                  <span className="field-label-row">Select Issue Category</span>
                  <div className="chip-grid">
                    {[
                      { id: "road", label: "Road / Pothole", icon: "🛣️" },
                      { id: "water", label: "Water Leak", icon: "🚰" },
                      { id: "light", label: "Street Light", icon: "💡" },
                      { id: "drain", label: "Drainage", icon: "🌊" },
                      { id: "waste", label: "Garbage Dump", icon: "🗑️" },
                      { id: "other", label: "Other Hazard", icon: "⚠️" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setFormCategory(c.id)}
                        className={`category-chip ${formCategory === c.id ? "selected" : ""}`}
                      >
                        <span>{c.icon}</span>
                        <span>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <div className="field-label-row">
                    <span>Issue Title</span>
                    <span className="mono">{formTitle.length}/80</span>
                  </div>
                  <input
                    type="text"
                    maxLength={80}
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Short summary (e.g. Open manhole on Tagore Rd)"
                    className="text-input"
                  />
                </div>

                <div>
                  <div className="field-label-row">
                    <span>Detailed Description</span>
                    <span className="mono">{formDesc.length}/500</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Provide nearby landmarks or hazard severity..."
                    className="text-area"
                  />
                </div>

                {/* Urgency Selector */}
                <div>
                  <span className="field-label-row">Urgency Level</span>
                  <div className="urgency-toggle">
                    {["low", "medium", "high"].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setFormUrgency(lvl)}
                        className={`urgency-btn ${formUrgency === lvl ? `active ${lvl}` : ""}`}
                      >
                        {lvl.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live GPS Lock Banner */}
                <div className="gps-banner mono">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      color: "#10B981",
                    }}
                  >
                    <MapPin size={14} />
                    <span>25.4358° N, 81.8463° E</span>
                  </div>
                  <span>±4m Accuracy</span>
                </div>

                {/* Moderation Disclaimer */}
                <div className="moderation-card">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      color: "#F59E0B",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    <ShieldCheck size={14} /> AI Gatekeeper Active
                  </div>
                  <div className="moderation-tags">
                    <span className="mod-tag">Toxicity Filter (Gemma-2B)</span>
                    <span className="mod-tag">Deepfake / pHash Check</span>
                    <span className="mod-tag">Radius Deduplication</span>
                  </div>
                </div>

                <button
                  onClick={handleFormSubmit}
                  disabled={!formTitle || !formDesc || !formCategory}
                  className="btn-submit"
                >
                  <Send
                    size={14}
                    style={{ display: "inline", marginRight: "6px" }}
                  />
                  Submit Civic Post
                </button>
              </div>
            )}
          </div>
        )}

        {/* Floating Action Button (Opens Report Modal) */}
        {!isReportOpen && (
          <button onClick={() => setIsReportOpen(true)} className="fab-btn">
            <PlusCircle size={28} />
          </button>
        )}

        {/* Bottom Navigation Bar */}
        <nav className="bottom-bar">
          <button
            onClick={() => setCurrentTab("feed")}
            className={`bar-btn ${currentTab === "feed" ? "active" : ""}`}
          >
            <Home size={18} />
            <span>Feed</span>
          </button>
          <button
            onClick={() => setCurrentTab("tracker")}
            className={`bar-btn ${currentTab === "tracker" ? "active" : ""}`}
          >
            <Activity size={18} />
            <span>Tracker</span>
          </button>
          <button
            onClick={() => setCurrentTab("profile")}
            className={`bar-btn ${currentTab === "profile" ? "active" : ""}`}
          >
            <User size={18} />
            <span>Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
