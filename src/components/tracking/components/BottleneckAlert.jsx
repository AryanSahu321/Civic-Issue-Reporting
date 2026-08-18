import React from "react";

export default function BottleneckAlert() {
  return (
    <div
      style={{
        border: "2px solid #f97316",
        backgroundColor: "#fff7ed",
        padding: "16px",
        borderRadius: "10px",
        marginBottom: "16px",
      }}
    >
      {" "}
      {/* 🟧 ORANGE BORDER */}
      <div
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          color: "#9a3412",
          marginBottom: "6px",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span>⚠️ Bottleneck Warning</span>
      </div>
      <p
        style={{
          fontSize: "13px",
          color: "#9a3412",
          lineHeight: "1.4",
          margin: "0 0 12px 0",
        }}
      >
        <strong>Current Bottleneck:</strong> Lower Level Municipal Office.
        <br />
        File pending with Ward Officer for more than 48 hours without status
        update.
      </p>
      {/* Countdown Box */}
      <div
        style={{
          backgroundColor: "#1e293b",
          color: "white",
          padding: "12px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            color: "#94a3b8",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Auto Escalation To Block Dev Office In
        </div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#38bdf8",
            marginTop: "4px",
            fontFamily: "monospace",
          }}
        >
          18h : 42m : 15s
        </div>
      </div>
    </div>
  );
}
