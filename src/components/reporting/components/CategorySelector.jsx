// File: src/features/reporting/components/CategorySelector.jsx
import React from "react";

const categories = [
  { id: "Road", icon: "🛣️" },
  { id: "Water", icon: "💧" },
  { id: "Lighting", icon: "💡" },
  { id: "Waste", icon: "🗑️" },
  { id: "Drainage", icon: "🌊" },
  { id: "Other", icon: "📌" },
];

export default function CategorySelector({
  selectedCategory,
  setSelectedCategory,
}) {
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
        Issue Category
      </div>
      <div
        style={{
          border: "2px solid #06b6d4",
          padding: "10px",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      >
        {" "}
        {/* 🩵 CYAN BORDER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                backgroundColor:
                  selectedCategory === cat.id ? "#cffafe" : "#f1f5f9",
                border: `1px solid ${selectedCategory === cat.id ? "#06b6d4" : "#e2e8f0"}`,
                borderRadius: "6px",
                padding: "12px 4px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "24px", marginBottom: "6px" }}>
                {cat.icon}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "#334155",
                }}
              >
                {cat.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
