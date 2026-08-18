import React from "react";
import { calculateUserImpact } from "../components/ImpactCalculator";

// --- SUB-COMPONENT: The Orange Border Impact Box ---
const CivicImpactSummary = ({ impactData }) => {
  if (!impactData) return null;

  return (
    <div
      style={{
        border: "2px solid #f97316" /* ORANGE BORDER */,
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
        <strong>
          {impactData.impactPopulation.toLocaleString()} residents
        </strong>{" "}
        in <strong>{impactData.primaryWard}</strong>. You rank in the{" "}
        <strong>Top {impactData.topPercentage}%</strong> of Civic Zone
        contributors in Prayagraj. Keep up the great work!
      </p>
    </div>
  );
};

// --- MAIN COMPONENT: My Profile Page ---
export default function MyProfile() {
  const currentUserId = "USR-001"; // Assuming Aman Srivastava is logged in

  // Execute our logic engine!
  const impactData = calculateUserImpact(currentUserId);

  return (
    <div
      className="phone-container"
      style={{
        border: "4px solid #8b5cf6",
        maxWidth: "400px",
        height: "100vh",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="top-header"
        style={{
          border: "2px dashed #ef4444",
          backgroundColor: "#1e293b",
          color: "white",
          padding: "16px",
          textAlign: "center",
        }}
      >
        MY PROFILE
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* User Identity Section */}
        <div
          style={{
            border: "2px solid #3b82f6",
            margin: "12px",
            padding: "16px",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          <h3>Aman Srivastava ✅</h3>
          <p style={{ color: "gray", fontSize: "12px" }}>
            Civic Score: <strong>{impactData.score} Pts</strong>
          </p>
        </div>

        {/* Here we drop in our highly modular Impact Component! 
          We pass the calculated data directly into it.
        */}
        <CivicImpactSummary impactData={impactData} />
      </div>
    </div>
  );
}
