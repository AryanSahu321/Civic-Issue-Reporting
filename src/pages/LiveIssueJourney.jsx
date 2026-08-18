import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import dataset from "../data/dataset.json";
import VerticalTimeline from "../components/tracking/components/VerticalTimeline";
import BottleneckAlert from "../components/tracking/components/BottleneckAlert";

export default function LiveIssueJourney() {
  const { issueId } = useParams();
  const navigate = useNavigate();

  // Find the specific issue matching the URL parameter
  const issuesList = dataset?.data?.issues || [];
  const targetIssue =
    issuesList.find((i) => i.issue_id === issueId) || issuesList[0]; // Fallback to first if not found

  if (!targetIssue) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Issue not found.
      </div>
    );
  }

  return (
    <div
      style={{ padding: "16px", backgroundColor: "#f8fafc", minHeight: "100%" }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/trackers")}
        style={{
          background: "none",
          border: "none",
          color: "#2563eb",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "12px",
          fontSize: "13px",
        }}
      >
        ← Back to Trackers
      </button>

      {/* Issue Summary Card */}
      <div
        style={{
          backgroundColor: "white",
          padding: "14px",
          borderRadius: "10px",
          border: "2px solid #8b5cf6",
          marginBottom: "16px",
        }}
      >
        <span
          style={{ fontSize: "11px", fontWeight: "bold", color: "#64748b" }}
        >
          #{targetIssue.issue_id}
        </span>
        <h3
          style={{ fontSize: "16px", color: "#0f172a", margin: "4px 0 6px 0" }}
        >
          {targetIssue.title}
        </h3>
        <p style={{ fontSize: "13px", color: "#475569", margin: 0 }}>
          {targetIssue.description}
        </p>
      </div>

      {/* Render the Timeline with JSON data */}
      <VerticalTimeline timelineSteps={targetIssue.timeline} />

      {/* Render Bottleneck Alert if high priority or blocked */}
      {(targetIssue.status === "BLOCKED" ||
        targetIssue.priority === "HIGH") && <BottleneckAlert />}
    </div>
  );
}
