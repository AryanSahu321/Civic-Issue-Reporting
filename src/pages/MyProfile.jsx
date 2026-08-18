import React from "react";
import { calculateUserImpact } from "../components/profile/utils/ImpactCalculator";

// Import our new sub-components
import UserProfileHeader from "../components/profile/components/UserProfileHeader.jsx";
import StatSummaryGrid from "../components/profile/components/StatSummaryGrid.jsx";
import CivicImpactSummary from "../components/profile/components/CivicImpactSummary.jsx";

export default function MyProfile() {
  const currentUserId = "USR-001"; // Hardcoded to Aman Srivastava for testing

  // 1. Run the Logic Engine
  const impactData = calculateUserImpact(currentUserId);

  // Fallback if user isn't found
  if (!impactData) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Loading Profile...
      </div>
    );
  }

  // 2. Render the components and pass the data as Props
  return (
    <div style={{ paddingBottom: "20px" }}>
      <UserProfileHeader
        name={impactData.user.name}
        level={impactData.user.level}
        location={impactData.user.location}
        score={impactData.score}
      />

      <StatSummaryGrid stats={impactData.stats} score={impactData.score} />

      <CivicImpactSummary
        impactPopulation={impactData.impactPopulation}
        primaryWard={impactData.primaryWard}
        topPercentage={impactData.topPercentage}
      />
    </div>
  );
}
