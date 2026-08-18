import React from "react";

export default function CivicImpactSummary({
  impactPopulation,
  primaryWard,
  topPercentage,
}) {
  return (
    <div
      style={{
        border: "2px solid #f97316",
        backgroundColor: "#fff7ed",
        margin: "0 12px 12px 12px",
        padding: "16px",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          color: "#9a3412",
          marginBottom: "8px",
          textTransform: "uppercase",
        }}
      >
        Civic Impact
      </div>
      <p
        style={{
          fontSize: "13px",
          color: "#9a3412",
          lineHeight: "1.5",
          margin: 0,
        }}
      >
        Your reports have collectively impacted approximately{" "}
        <strong>{impactPopulation.toLocaleString()} residents</strong> in{" "}
        <strong>{primaryWard}</strong>. You rank in the{" "}
        <strong>Top {topPercentage}%</strong> of Civic Zone contributors in
        Prayagraj. Keep up the great work!
      </p>
    </div>
  );
}
