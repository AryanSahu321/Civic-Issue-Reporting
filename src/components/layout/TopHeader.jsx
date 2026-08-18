// File: src/components/layout/TopHeader.jsx
import React from "react";

export default function TopHeader({ title, subtitle, leftIcon, rightAction }) {
  return (
    <div
      className="top-header"
      style={{
        border: "2px dashed #ef4444" /* 🟥 RED DASHED BORDER */,
        backgroundColor: "#1e293b",
        color: "white",
        padding: "16px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left Icon (e.g., Back button or Cross) */}
      {leftIcon && <div style={{ cursor: "pointer" }}>{leftIcon}</div>}

      {/* Center Titles */}
      <div
        style={{
          flex: 1,
          textAlign: leftIcon ? "center" : "left",
          marginLeft: leftIcon ? "-20px" : "0",
        }}
      >
        <h2
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            margin: 0,
            color: "#38bdf8",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0 0" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Action (e.g., Submit button) */}
      {rightAction && (
        <div
          style={{
            cursor: "pointer",
            fontSize: "14px",
            color: "#3b82f6",
            fontWeight: "bold",
          }}
        >
          {rightAction}
        </div>
      )}
    </div>
  );
}
