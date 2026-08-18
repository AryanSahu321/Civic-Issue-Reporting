// File: src/features/feed/components/FeedPostCard.jsx
import React from "react";

export default function FeedPostCard({ issue }) {
  // Format the ISO date cleanly
  const formattedDate = new Date(issue.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Dynamic status badge styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "RESOLVED":
        return { bg: "#dcfce7", text: "#166534" };
      case "UNDER_PROCESS":
        return { bg: "#fef08a", text: "#854d0e" };
      case "BLOCKED":
        return { bg: "#fee2e2", text: "#991b1b" };
      default:
        return { bg: "#e2e8f0", text: "#475569" };
    }
  };

  const statusStyle = getStatusStyle(issue.status);

  return (
    <div
      style={{
        backgroundColor: "white",
        marginBottom: "16px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* 1. Header (RED DASHED BORDER) - Reporter & Location */}
      <div
        style={{
          border: "2px dashed #ef4444",
          padding: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{ fontWeight: "bold", fontSize: "14px", color: "#0f172a" }}
          >
            {issue.reporter.user_name}
          </span>
          <span
            style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}
          >
            📍 {issue.location.address}
          </span>
        </div>
        <span style={{ fontSize: "11px", color: "#94a3b8" }}>
          {formattedDate}
        </span>
      </div>

      {/* 2. Image Evidence (BLUE BORDER) */}
      <div
        style={{
          border: "2px solid #3b82f6",
          width: "100%",
          height: "220px",
          backgroundColor: "#f1f5f9",
        }}
      >
        <img
          src={issue.media.image_url}
          alt={issue.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 3. Issue Content (GREEN BORDER) - Status, Title, Description */}
      <div style={{ border: "2px solid #22c55e", padding: "12px" }}>
        <div
          style={{
            display: "inline-block",
            backgroundColor: statusStyle.bg,
            color: statusStyle.text,
            padding: "3px 8px",
            borderRadius: "12px",
            fontSize: "10px",
            fontWeight: "bold",
            marginBottom: "6px",
          }}
        >
          {issue.status.replace("_", " ")}
        </div>
        <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", color: "#0f172a" }}>
          {issue.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#475569",
            lineHeight: "1.4",
          }}
        >
          {issue.description}
        </p>
      </div>

      {/* 4. Gamification / Metrics Footer (ORANGE BORDER) */}
      <div
        style={{
          border: "2px solid #f97316",
          padding: "10px 12px",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#f8fafc",
        }}
      >
        <div style={{ fontSize: "13px", fontWeight: "bold", color: "#334155" }}>
          ⚠️ {issue.metrics.report_count} Reports
        </div>
        <div style={{ fontSize: "13px", fontWeight: "bold", color: "#334155" }}>
          🔥 {issue.metrics.upvotes} Upvotes
        </div>
      </div>
    </div>
  );
}
