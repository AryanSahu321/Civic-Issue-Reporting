// File: src/components/layout/MobileContainer.jsx
import React from "react";

export default function MobileContainer({ children }) {
  return (
    <div
      className="phone-container"
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "100vh", // Full screen height
        margin: "0 auto", // Centers the phone on desktop screens
        backgroundColor: "#f8fafc",
        border: "4px solid #8b5cf6" /* 🟪 PURPLE BORDER */,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      }}
    >
      {children}
    </div>
  );
}
