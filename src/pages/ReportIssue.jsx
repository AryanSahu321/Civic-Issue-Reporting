import React, { useState } from "react";
import PhotoUploader from "../components/reporting/components/PhotoUploader.jsx";
import CategorySelector from "../components/reporting/components/CategorySelector.jsx";
import UrgencyToggle from "../components/reporting/components/UrgencyToggle.jsx";
import SubmitButton from "../components/ui/SubmitButton.jsx";

export default function ReportIssue() {
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState("Road");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("Medium");

  const handleSubmit = () => {
    if (!title || !description || !photo) {
      alert("Please fill out the title, description, and upload a photo!");
      return;
    }

    const payload = {
      title,
      description,
      ai_category: category,
      priority: urgency.toUpperCase(),
      media: { image_url: photo, is_video: false },
      created_at: new Date().toISOString(),
    };

    console.log(
      "🚀 SUBMITTING ISSUE PAYLOAD:",
      JSON.stringify(payload, null, 2),
    );
    alert(
      "Success! Check browser console (F12) for the generated JSON payload.",
    );

    // Reset form
    setTitle("");
    setDescription("");
    setPhoto(null);
  };

  return (
    <div style={{ padding: "16px", paddingBottom: "20px" }}>
      <PhotoUploader photo={photo} setPhoto={setPhoto} />
      <CategorySelector
        selectedCategory={category}
        setSelectedCategory={setCategory}
      />

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
          Issue Details
        </div>
        <div
          style={{
            border: "2px solid #22c55e",
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {" "}
          {/* 🟩 GREEN BORDER */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Issue Title (e.g., Deep pothole on Main St)"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a brief description of the issue..."
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "14px",
              height: "100px",
              resize: "none",
              boxSizing: "border-box",
            }}
          ></textarea>
        </div>
      </div>

      <UrgencyToggle urgency={urgency} setUrgency={setUrgency} />
      <SubmitButton text="Submit Report" onClick={handleSubmit} />
    </div>
  );
}
