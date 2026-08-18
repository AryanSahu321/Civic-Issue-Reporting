import React from "react";

export default function UrgencyToggle({ urgency, setUrgency }) {
  const getBtnStyle = (level, activeColor, activeBg) => ({
    flex: 1,
    padding: "10px 0",
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "bold",
    borderRadius: "6px",
    border: `1px solid ${urgency === level ? activeColor : "#cbd5e1"}`,
    backgroundColor: urgency === level ? activeBg : "#f8fafc",
    color: urgency === level ? activeColor : "#475569",
    cursor: "pointer",
  });

  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          color: "#475569",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        Urgency
      </div>
      <div
        style={{
          border: "2px solid #f97316",
          padding: "12px",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      >
        {" "}
        {/* 🟧 ORANGE BORDER */}
        <div style={{ display: "flex", gap: "8px" }}>
          <div
            onClick={() => setUrgency("Low")}
            style={getBtnStyle("Low", "#16a34a", "#dcfce7")}
          >
            Low
          </div>
          <div
            onClick={() => setUrgency("Medium")}
            style={getBtnStyle("Medium", "#d97706", "#fef3c7")}
          >
            Medium
          </div>
          <div
            onClick={() => setUrgency("High")}
            style={getBtnStyle("High", "#dc2626", "#fee2e2")}
          >
            High
          </div>
        </div>
      </div>
    </div>
  );
}
