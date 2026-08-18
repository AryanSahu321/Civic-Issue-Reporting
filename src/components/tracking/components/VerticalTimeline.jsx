import React from "react";

export default function VerticalTimeline({ timelineSteps = [] }) {
  return (
    <div
      style={{
        border: "2px solid #22c55e",
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "10px",
        marginBottom: "16px",
      }}
    >
      {" "}
      {/* 🟩 GREEN BORDER */}
      <div
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          color: "#475569",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        🗺️ Issue Journey Timeline
      </div>
      <div style={{ position: "relative", paddingLeft: "20px" }}>
        {/* Vertical connecting line */}
        <div
          style={{
            position: "absolute",
            left: "7px",
            top: "8px",
            bottom: "8px",
            width: "2px",
            backgroundColor: "#e2e8f0",
          }}
        />

        {timelineSteps.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isActive = step.status === "active";
          const isBlocked = step.status === "blocked";

          let dotColor = "#cbd5e1"; // Default gray
          if (isCompleted) dotColor = "#22c55e"; // Green
          if (isActive) dotColor = "#f59e0b"; // Amber
          if (isBlocked) dotColor = "#dc2626"; // Red

          return (
            <div
              key={index}
              style={{ position: "relative", marginBottom: "16px" }}
            >
              {/* Timeline Node Dot */}
              <div
                style={{
                  position: "absolute",
                  left: "-20px",
                  top: "2px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: dotColor,
                  border: "2px solid white",
                  boxShadow: "0 0 0 2px " + dotColor,
                }}
              />

              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#1e293b",
                }}
              >
                {step.title}
              </div>
              <div
                style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}
              >
                {step.desc}
              </div>
              <div
                style={{ fontSize: "10px", color: "#94a3b8", marginTop: "2px" }}
              >
                {new Date(step.date).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
