export default function BottomNav({ activeTab, setActiveTab }) {
  const getNavStyle = (tabName) => ({
    // ... keep your existing CSS styles here
    color: activeTab === tabName ? "#38bdf8" : "#94a3b8",
    cursor: "pointer",
  });

  return (
    <div
      className="bottom-nav"
      style={{
        display: "flex",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60px",
        backgroundColor: "#1e293b", // Dark slate layout background
        borderTop: "2px dashed #f59e0b", // 🟨 The Yellow Sprint 1 placeholder border
        zIndex: 10,
      }}
    >
      {/* ADD onClick TO EVERY TAB LIKE THIS: */}
      <div style={getNavStyle("home")} onClick={() => setActiveTab("home")}>
        <span style={{ fontSize: "18px" }}>🏠</span>
        <span>Home</span>
      </div>
      <div
        style={getNavStyle("explore")}
        onClick={() => setActiveTab("explore")}
      >
        <span style={{ fontSize: "18px" }}>🔍</span>
        <span>Explore</span>
      </div>
      <div style={getNavStyle("report")} onClick={() => setActiveTab("report")}>
        <span style={{ fontSize: "18px" }}>➕</span>
        <span>Report</span>
      </div>
      <div
        style={getNavStyle("trackers")}
        onClick={() => setActiveTab("trackers")}
      >
        <span style={{ fontSize: "18px" }}>📌</span>
        <span>Trackers</span>
      </div>
      <div
        style={getNavStyle("profile")}
        onClick={() => setActiveTab("profile")}
      >
        <span style={{ fontSize: "18px" }}>👤</span>
        <span>Profile</span>
      </div>
    </div>
  );
}
