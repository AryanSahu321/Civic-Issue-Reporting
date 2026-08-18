import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Layout Components
import MobileContainer from "./components/layout/MobileContainer";
import TopHeader from "./components/layout/TopHeader";
import BottomNav from "./components/layout/BottomNav";

// Page Components
import IssueFeed from "./pages/IssueFeed";
import ReportIssue from "./pages/ReportIssue";
import MyTrackers from "./pages/MyTrackers";
import MyProfile from "./pages/MyProfile";
import LiveIssueJourney from "./pages/LiveIssueJourney";

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine header title dynamically based on the active URL
  const getHeaderTitle = () => {
    // We use .startsWith() for journey so it matches dynamic IDs like "/journey/CIVIC-4092"
    if (currentPath.startsWith("/journey")) return "Live Issue Journey";

    switch (currentPath) {
      case "/report":
        return "Report Civic Issue";
      case "/trackers":
        return "My Trackers";
      case "/profile":
        return "My Profile";
      default:
        return "Civic Platform";
    }
  };

  return (
    <MobileContainer>
      <TopHeader
        title={getHeaderTitle()}
        // We will rely on the big blue submit button inside the form itself,
        // so we can leave rightAction as null here to avoid confusion.
        rightAction={null}
      />

      {/* Scrollable middle section rendering our dynamic routes */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: "80px" }}>
        <Routes>
          <Route path="/" element={<IssueFeed />} />
          <Route path="/explore" element={<IssueFeed />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/trackers" element={<MyTrackers />} />

          {/* UPDATED: Added /:issueId so it can accept dynamic data */}
          <Route path="/journey/:issueId" element={<LiveIssueJourney />} />

          <Route path="/profile" element={<MyProfile />} />
        </Routes>
      </div>

      <BottomNav />
    </MobileContainer>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
