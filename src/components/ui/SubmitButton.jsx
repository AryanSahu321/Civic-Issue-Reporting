import React from "react";

export default function SubmitButton({ onClick, text }) {
  return (
    <div
      style={{
        border: "2px solid #ec4899",
        marginTop: "20px",
        padding: "4px",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
      }}
    >
      {" "}
      {/* 🟪 PINK BORDER */}
      <button
        onClick={onClick}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#3b82f6",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {text}
      </button>
    </div>
  );
}
