// File: src/components/layout/BottomNav.jsx
import React from "react";

export default function BottomNav({ activeTab }) {
  // Helper function to handle active styling
  const getNavStyle = (tabName) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none",
    fontSize: "10px",
    fontWeight: "600",
    gap: "3px",
    width: "20%",
    color: activeTab === tabName ? "#38bdf8" : "#94a3b8",
    transform: activeTab === tabName ? "scale(1.1)" : "scale(1)",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
  });

  return (
    <div
      className="bottom-nav"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "65px",
        backgroundColor: "#1e293b",
        borderTop: "3px solid #eab308" /* 🟨 YELLOW BORDER */,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 20,
      }}
    >
      <div style={getNavStyle("home")}>
        <span style={{ fontSize: "18px" }}>🏠</span>
        <span>Home</span>
      </div>
      <div style={getNavStyle("explore")}>
        <span style={{ fontSize: "18px" }}>🔍</span>
        <span>Explore</span>
      </div>
      <div style={getNavStyle("report")}>
        <span style={{ fontSize: "18px" }}>➕</span>
        <span>Report</span>
      </div>
      <div style={getNavStyle("trackers")}>
        <span style={{ fontSize: "18px" }}>📌</span>
        <span>Trackers</span>
      </div>
      <div style={getNavStyle("profile")}>
        <span style={{ fontSize: "18px" }}>👤</span>
        <span>Profile</span>
      </div>
    </div>
  );
}
