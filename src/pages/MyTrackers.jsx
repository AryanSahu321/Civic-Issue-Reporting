import React from "react";
import dataset from "../data/dataset.json";
import CompactIssueCard from "../components/tracking/components/CompactIssueCard";

export default function MyTrackers() {
  const issuesList = dataset?.data?.issues || [];

  return (
    <div
      style={{ padding: "16px", backgroundColor: "#e2e8f0", minHeight: "100%" }}
    >
      <div
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          color: "#475569",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        Active & Tracked Reports ({issuesList.length})
      </div>

      {issuesList.map((issue) => (
        <CompactIssueCard key={issue.issue_id} issue={issue} />
      ))}
    </div>
  );
}
