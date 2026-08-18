import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const getNavStyle = (targetPath) => {
    // Check if the current URL matches the target path of the button
    // (Treat both "/" and "/explore" as active for the Explore tab if needed,
    // but here we map them strictly for clarity)
    const isActive = currentPath === targetPath;

    return {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textDecoration: "none",
      fontSize: "10px",
      fontWeight: "600",
      gap: "3px",
      width: "20%",
      color: isActive ? "#38bdf8" : "#94a3b8",
      transform: isActive ? "scale(1.1)" : "scale(1)",
      transition: "all 0.2s ease-in-out",
      cursor: "pointer",
    };
  };

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
      <div style={getNavStyle("/")} onClick={() => navigate("/")}>
        <span style={{ fontSize: "18px" }}>🏠</span>
        <span>Home</span>
      </div>
      <div style={getNavStyle("/explore")} onClick={() => navigate("/explore")}>
        <span style={{ fontSize: "18px" }}>🔍</span>
        <span>Explore</span>
      </div>
      <div style={getNavStyle("/report")} onClick={() => navigate("/report")}>
        <span style={{ fontSize: "18px" }}>➕</span>
        <span>Report</span>
      </div>
      <div
        style={getNavStyle("/trackers")}
        onClick={() => navigate("/trackers")}
      >
        <span style={{ fontSize: "18px" }}>📌</span>
        <span>Trackers</span>
      </div>
      <div style={getNavStyle("/profile")} onClick={() => navigate("/profile")}>
        <span style={{ fontSize: "18px" }}>👤</span>
        <span>Profile</span>
      </div>
    </div>
  );
}
