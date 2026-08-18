import React from "react";
import { useNavigate } from "react-router-dom";

export default function CompactIssueCard({ issue }) {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case "RESOLVED":
        return { bg: "#dcfce7", text: "#166534", label: "✅ Resolved" };
      case "UNDER_PROCESS":
        return { bg: "#fef08a", text: "#854d0e", label: "⏳ Under Process" };
      case "BLOCKED":
        return { bg: "#fee2e2", text: "#991b1b", label: "⚠️ Blocked" };
      default:
        return { bg: "#e2e8f0", text: "#475569", label: status };
    }
  };

  const badge = getStatusBadge(issue.status);

  return (
    <div
      onClick={() => navigate(`/journey/${issue.issue_id}`)}
      style={{
        backgroundColor: "white",
        marginBottom: "12px",
        padding: "14px",
        borderRadius: "10px",
        border: "2px solid #3b82f6" /* 🟦 BLUE BORDER */,
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
        <span
          style={{ fontSize: "11px", fontWeight: "bold", color: "#64748b" }}
        >
          ID: #{issue.issue_id}
        </span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: "bold",
            backgroundColor: badge.bg,
            color: badge.text,
            padding: "2px 8px",
            borderRadius: "10px",
          }}
        >
          {badge.label}
        </span>
      </div>

      <h4 style={{ fontSize: "15px", color: "#0f172a", margin: "0 0 6px 0" }}>
        {issue.title}
      </h4>

      <div
        style={{
          fontSize: "12px",
          color: "#475569",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <span>
          📍 <strong>Location:</strong> {issue.location.address}
        </span>
        <span>
          🏛️ <strong>Category:</strong> {issue.ai_category}
        </span>
      </div>
    </div>
  );
}
