import React, { useState } from "react";

// Layout Components
import MobileContainer from "./components/layout/MobileContainer";
import TopHeader from "./components/layout/TopHeader";
import BottomNav from "./components/layout/BottomNav";

// Page Components
import IssueFeed from "./pages/IssueFeed";
import ReportIssue from "./pages/ReportIssue";
import MyTrackers from "./pages/MyTrackers";
import MyProfile from "./pages/MyProfile";

export default function App() {
  // State to track which tab is currently active (defaults to 'home')
  const [activeTab, setActiveTab] = useState("home");

  // A simple router function to render the correct page component
  const renderContent = () => {
    switch (activeTab) {
      case "home":
      case "explore":
        return <IssueFeed />;
      case "report":
        return <ReportIssue />;
      case "trackers":
        return <MyTrackers />;
      case "profile":
        return <MyProfile />;
      default:
        return <IssueFeed />;
    }
  };

  // Determine header title based on active tab
  const getHeaderTitle = () => {
    switch (activeTab) {
      case "report":
        return "Report Civic Issue";
      case "trackers":
        return "My Trackers";
      case "profile":
        return "My Profile";
      default:
        return "Civic Platform";
    }
  };

  return (
    <MobileContainer>
      <TopHeader
        title={getHeaderTitle()}
        rightAction={activeTab === "report" ? "Submit" : null}
      />

      {/* Scrollable middle section rendering our dynamic pages */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: "80px" }}>
        {renderContent()}
      </div>

      {/* Pass state and the state-setter function to BottomNav */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </MobileContainer>
  );
}
