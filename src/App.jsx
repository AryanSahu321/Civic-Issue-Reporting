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
import LiveIssueJourney from "./pages/LiveIssueJourney"; // We add this for routing

// We create a wrapper component to use the 'useLocation' hook
// (It must be inside the <Router> to work)
function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine header title dynamically based on the active URL
  const getHeaderTitle = () => {
    switch (currentPath) {
      case "/report":
        return "Report Civic Issue";
      case "/trackers":
        return "My Trackers";
      case "/profile":
        return "My Profile";
      case "/journey":
        return "Live Issue Journey";
      default:
        return "Civic Platform";
    }
  };

  return (
    <MobileContainer>
      <TopHeader
        title={getHeaderTitle()}
        rightAction={currentPath === "/report" ? "Submit" : null}
      />

      {/* Scrollable middle section rendering our dynamic routes */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: "80px" }}>
        <Routes>
          <Route path="/" element={<IssueFeed />} />
          <Route path="/explore" element={<IssueFeed />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/trackers" element={<MyTrackers />} />
          <Route path="/journey" element={<LiveIssueJourney />} />
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
