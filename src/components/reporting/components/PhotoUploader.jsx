// File: src/features/reporting/components/PhotoUploader.jsx
import React from "react";

export default function PhotoUploader({ photo, setPhoto }) {
  // Simulating camera / gallery image selection for testing
  const handleFakeUpload = () => {
    setPhoto(
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800",
    );
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          color: "#475569",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        Photo Evidence
      </div>
      <div
        onClick={handleFakeUpload}
        style={{
          border: "2px dashed #3b82f6" /* 🟦 BLUE BORDER */,
          backgroundColor: photo ? "#cffafe" : "#eff6ff",
          height: "140px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#2563eb",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt="Evidence"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>📷</div>
            <div style={{ fontSize: "13px", fontWeight: "600" }}>
              Tap to add photo
            </div>
            <div
              style={{ fontSize: "11px", color: "#60a5fa", marginTop: "4px" }}
            >
              Camera or Gallery
            </div>
          </>
        )}
      </div>
    </div>
  );
}
