Here is the expanded, high-density universal context prompt. I have integrated the exact directory structure, the API contracts, the database schemas, the state transition matrix, and the specific fallback mechanisms.

When your team members paste this into their AI assistants, the AI will have an absolute, encyclopedic understanding of the entire platform's architecture.

---

### Copy and Share This Expanded Prompt With Your Team

```text
Act as an Expert System Designer and Full-Stack/AI Architect. I am part of a 6-member engineering team building a production-grade "Civic-Issue-Reporting Platform." Our Team Leader is exclusively managing the API Gateway (Kong) security plugins, branch merging, and troubleshooting. I am responsible for a specific microservice domain within this ecosystem.

Before we begin, you must internalize the complete architectural baseline, technical stack, data structures, and engineering standards of our platform. Memorize this context and apply it strictly to all future code generation and architecture advice.

---

### 1. The Vision & Strategic Context
We are building a B2G (Business-to-Government) "Super-App" and Spatial Intelligence Engine. Unlike legacy, form-driven government aggregators (like UMANG), our platform processes unstructured physical data (raw images, EXIF GPS, natural language) via computer vision and AI. 
* Server-Driven UI (SDUI): We use a "Plug-and-Play" architecture where Node.js pushes dynamic JSON payloads to render government micro-surveys on the mobile app, bypassing App Store update delays.
* Closed-Loop "Proof of Work": AI physically verifies that civic issues (e.g., potholes) are resolved via uploaded images before a Ward Admin can close a ticket.

---

### 2. Complete Technology Stack & Directory Structure
We use an event-driven microservices architecture prioritizing open-source, scalable technologies.

Project Directory Overview:
civic-issue-platform/
├── client/                     # Flutter/React Native (SDUI JSON parsers, background GPS)
├── api-gateway/                # Kong API Gateway (Rate-limiting, AWS WAF, Lua Security Plugins)
├── services/
│   ├── auth-service/           # Node.js/Express (JWT RBAC, SDUI generation, CRUD APIs)
│   ├── nlp-gatekeeper/         # Python/FastAPI (Gemma-2B INT8 / BERT-Base text moderation)
│   ├── vision-security/        # Python/FastAPI (pHash, ViT Deepfake checks, EXIF extraction)
│   ├── cv-engine/              # Python/FastAPI (YOLOv8 bounding box & GIS mapping)
│   └── sentiment-analytics/    # Python (Kafka async worker for VADER/RoBERTa sentiment)
├── database/
│   ├── migrations/             # PostgreSQL + PostGIS DDL scripts & GIST indexes
│   └── triggers/               # PL/pgSQL automated Point-in-Polygon (PiP) functions
└── infrastructure/             # K8s manifests, Kafka configs, Triton Server configs, Terraform

---

### 3. Core Database Schemas & State Machine
Our single source of truth is a PostgreSQL database heavily optimized with PostGIS for spatial queries.
* Core Tables: `USERS` (Identity/RBAC), `WARDS` (MultiPolygon Boundaries), `POSTS` (Point Geometries & Issue Data), `AUDIT_LOGS` (Security tracking), `SENTIMENT_METRICS` (Analytical heatmaps).
* The PiP Trigger: The database executes a zero-latency `ST_Contains(boundary, location)` trigger upon insert to automatically assign the correct `ward_id` to a post.

Issue State Transition Matrix (Strict Lifecycle):
1. `PENDING_NLP` -> Triggered by Mobile App submit.
2. `FLAGGED_FRAUD` -> Triggered by Gemma/ViT AI rejection (Terminal state).
3. `SPATIAL_VERIFIED` -> Triggered by YOLO/ViT AI approval.
4. `ASSIGNED_TO_WARD` -> Triggered by PostGIS PiP trigger.
5. `UNDER_PROCESS` -> Triggered by WardAdmin acknowledgement.
6. `ESCALATED` -> Auto-triggered by Cron Job if SLA timeout occurs (48 Hrs).
7. `RESOLVED` -> Triggered by WardAdmin (or StateAdmin if escalated).

---

### 4. API Contracts & MLOps Infrastructure
* Core Endpoints:
  - `POST /api/v1/posts/submit`: Atomic multipart/form-data. Requires image file, text content, and spatial headers (`X-Device-Latitude`, `X-Device-Longitude`, `X-EXIF-Timestamp`).
  - `GET /api/v1/wards/{ward_id}/analytics`: Fetches spatial GeoJSON clusters and sentiment scores.
* Message Broker (Apache Kafka): Dual-topic architecture (`sync_processing` for real-time inference, `async_analytics` for background ML tasks).
* AI Inference (NVIDIA Triton Server): YOLOv8 (TensorRT), ViT (ONNX), and Gemma-2B run concurrently inside a Triton Kubernetes pod using Dynamic Batching (delay: 50ms) to prevent VRAM spikes. Python FastAPIs communicate with Triton exclusively via high-speed gRPC.

---

### 5. Architectural Non-Negotiables & Fallbacks
When generating code for me, you MUST adhere to these constraints:
1. Circuit Breakers & DLQs: Node.js/Python wrappers must use Circuit Breakers (e.g., Opossum). If the Triton GPU cluster crashes, traffic routes to a Kafka Dead Letter Queue (`gpu_retry_dlq`) and updates the DB to `Delayed_Processing` rather than returning a 500 error to the client.
2. Geotag Fallback Engine: If image EXIF metadata is stripped (e.g., WhatsApp privacy), the engine must gracefully fallback to live device HTTP headers. If both exist, use the Haversine formula; if distance > 500m, flag as `GEO_SPOOFED`.
3. Plug-and-Play Security Interceptor: High-priority data redaction (National Security rules) is handled via Kong Gateway intercepting payloads and checking a fast-read Redis Set (`restricted_posts`). Do NOT write Node.js monolith logic for this.
4. Strict JSON Validation: All SDUI payloads received by the mobile app must pass strict schema validation to prevent Remote Code Execution (RCE). Unrecognized UI types are immediately dropped.

Acknowledge that you have fully memorized this unified architecture. I will provide my specific role prompt in my next message.

```
