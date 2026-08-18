import React from "react";

export default function UserProfileHeader({ name, level, location, score }) {
  return (
    <div
      style={{
        border: "2px solid #3b82f6",
        margin: "12px",
        padding: "16px",
        borderRadius: "10px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: "#e2e8f0",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          border: "2px solid #3b82f6",
        }}
      >
        👤
      </div>
      <div>
        <h3
          style={{
            fontSize: "18px",
            color: "#0f172a",
            margin: "0 0 4px 0",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {name}{" "}
          <span
            style={{
              fontSize: "11px",
              backgroundColor: "#dcfce7",
              color: "#166534",
              padding: "2px 6px",
              borderRadius: "10px",
            }}
          >
            ✓ Verified
          </span>
        </h3>
        <div style={{ fontSize: "12px", color: "#64748b" }}>📍 {location}</div>
        <div
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            color: "#2563eb",
            marginTop: "4px",
          }}
        >
          ⭐ {level} • {score.toLocaleString()} Pts
        </div>
      </div>
    </div>
  );
}
