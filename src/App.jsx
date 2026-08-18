import React from "react";

// Import our newly created layout components
import MobileContainer from "./components/layout/MobileContainer";
import TopHeader from "./components/layout/TopHeader";
import BottomNav from "./components/layout/BottomNav";

export default function App() {
  return (
    <MobileContainer>
      {/* 1. The Top Navigation Bar */}
      <TopHeader title="Civic Platform" subtitle="Sprint 1: Layout Test" />

      {/* 2. The Scrollable Page Content */}
      {/* (Later, we will swap this out with our actual pages like MyProfile or IssueFeed) */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          paddingBottom: "80px",
        }}
      >
        <h2>Welcome to Sprint 1! 🚀</h2>
        <p>
          If you are looking at this, it means your global layout is working
          perfectly.
        </p>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#e2e8f0",
            borderRadius: "8px",
          }}
        >
          <strong>Checklist:</strong>
          <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
            <li>Can you see the 🟪 Purple border constraining the app size?</li>
            <li>Can you see the 🟥 Red dashed header at the top?</li>
            <li>
              Can you see the 🟨 Yellow bordered navigation menu at the bottom?
            </li>
          </ul>
        </div>
      </div>

      {/* 3. The Bottom Navigation Bar */}
      <BottomNav activeTab="home" />
    </MobileContainer>
  );
}
