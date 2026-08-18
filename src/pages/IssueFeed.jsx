// File: src/pages/IssueFeed.jsx
import React from "react";
import dataset from "../data/dataset.json"; // Importing the mock database we saved earlier
import FeedPostCard from "../features/feed/components/FeedPostCard.jsx";

export default function IssueFeed() {
  // Safely extract the array of issues from the nested JSON structure
  const issuesList = dataset?.data?.issues || [];

  // Defensive check if the list is empty
  if (issuesList.length === 0) {
    return (
      <div
        style={{ color: "#64748b", padding: "40px 20px", textAlign: "center" }}
      >
        <p>No issues found in dataset.</p>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: "#e2e8f0", minHeight: "100%", padding: "12px" }}
    >
      {/* Mapping through every issue item in the database array */}
      {issuesList.map((issue) => (
        <FeedPostCard key={issue.issue_id} issue={issue} />
      ))}

      <div
        style={{
          textAlign: "center",
          padding: "15px",
          color: "#64748b",
          fontSize: "11px",
        }}
      >
        ✓ You are all caught up!
      </div>
    </div>
  );
}
