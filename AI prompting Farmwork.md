### AI Copilot, Gemini Execution & Troubleshooting Framework

To ensure all 6 team members maximize their AI assistants without diverging from our event-driven microservices architecture, you must standardize how prompts and context files are injected.

Here is the official framework for deploying the AI prompts, injecting file context, and troubleshooting hallucinations or architectural drift.

---

### 1. The Context Injection Protocol (Pre-Requisite)

Before any team member asks the AI to write a single line of code, they must establish the absolute architectural baseline. AI models lose context over long conversations, so establishing a "ground truth" using our project files is mandatory.

**Step-by-Step Initialization:**

1. **Attach Documentation Files:** Instruct every team member to upload or paste the contents of the following core documentation files into their AI assistant's context window:
* `README.md` (Core workflow and API routing).
* `README2.md` (Model workflow, Fake Media, CV, and Sentiment logic).
* `plan.md` (Implementation specs, ERD, Circuit Breakers, and MLOps strategies).


2. **Inject the Universal Prompt: ** Paste the **Universal Context Prompt** at first prompt of thread and before starting with new thread ask ai to create summery to begiven to new thread to resume same flow 
4. **Inject the Role Prompt:** Paste the specific **Role Prompt** Ex. Act as a Principal Backend and Database Architect specializing in Node.js/Express, PostgreSQL, PostGIS, and distributed caching with Redis. (these are given to all.)

> **Instruction to Team Members:**
> *"Do not start coding until the AI explicitly acknowledges the `README`, `README2`, and `plan` files, understands the Universal Prompt, and confirms your specific role."*

---


### 2. Troubleshooting & Error Handling Matrix

AI models naturally gravitate toward the easiest, most common solutions (like monolithic REST APIs or standard SQL). If the AI forgets our advanced constraints, team members must use these exact "Correction Prompts" to steer it back.

| Error Symptom / AI Hallucination | Root Cause | Correction Prompt to Issue to the AI |
| --- | --- | --- |
| **AI suggests a monolithic architecture or merges services.** | The AI forgot the microservices boundary. | *"Correction: Re-read `README2.md`. We are using decoupled microservices. Do not merge the auth-service with the cv-engine. Rewrite this specifically for isolated pods."* |
| **AI suggests standard REST API for Triton Inference.** | The AI defaulted to standard HTTP instead of high-speed buffers. | *"Correction: Refer to the MLOps section in the `plan.md` file. We strictly use high-speed gRPC for Triton communication. Rewrite the client using `tritonclient.grpc`."* |
| **AI forgets PostGIS and writes standard SQL coordinate math.** | The AI forgot the spatial extension constraints. | *"Correction: Stop using Haversine math in the SQL query. Refer to the ERD in `plan.md`. You must use PostGIS `ST_Contains()` and GIST indexes."* |
| **AI writes executable JS (like `eval()`) for the dynamic UI.** | The AI misunderstood Server-Driven UI (SDUI). | *"CRITICAL SECURITY CORRECTION: Do not send executable code. Our SDUI strictly uses JSON schemas parsed by Flutter/React Native. Rewrite the payload to only output JSON data."* |
| **AI removes the Circuit Breaker or DLQ logic.** | The AI prioritized brief code over fault tolerance. | *"Correction: You forgot the fallback strategy from `plan.md`. Wrap this inference call in an Opossum circuit breaker and route failures to the Kafka `gpu_retry_dlq`."* |

---

### 4. Context Refresh Strategy (Anti-Drift)

If a team member's conversation thread becomes too long (typically after 10-15 deep coding interactions), the AI will begin to "forget" the early architecture files (`README`, `plan`).

**The Solution:**
If the AI starts hallucinating standard CRUD apps instead of our B2G Spatial Engine, do not fight it.

1. Open a completely new chat thread.
2. Re-upload the `README`, `README2`, and `plan` files.
3. Re-paste the Universal Prompt and Role Prompt.
4. Paste the last working snippet of code and resume.

------

### Technologies will use in this project 

Here is the expanded and highly detailed technology stack table. As requested, Flutter has been completely removed, locking the frontend strictly into the JavaScript/TypeScript ecosystem with React Native, which perfectly complements your Node.js backend and Server-Driven UI architecture.

### Comprehensive Technology Stack & Architectural Blueprint

| Architectural Domain | Technology / Framework | Deep-Dive Implementation Details & Purpose |
| --- | --- | --- |
| **Mobile Client** | **React Native (TypeScript)** | Pure JS/TS cross-platform frontend. Handles secure local storage (Keychain/EncryptedSharedPreferences), background GPS geofencing, client-side EXIF extraction, and enables Over-The-Air (OTA) updates via CodePush. |
| **Mobile Client** | **Server-Driven UI (SDUI)** | Strict client-side JSON schema parser. Receives backend JSON to dynamically render native components (surveys, modules) instantly. Includes hard drop/quarantine protocols for unrecognized schemas to prevent RCE. |
| **API Gateway & Perimeter** | **Kong API Gateway** | Central perimeter operating at C-level network speeds. Proxies gRPC and REST traffic, enforces TLS 1.3, and runs custom Lua plugins (like the National Security Redis-backed interceptor) without touching backend code. |
| **API Gateway & Perimeter** | **AWS WAF** | Advanced Web Application Firewall for IP throttling, rate-limiting, DDoS mitigation, and active inspection against SQLi and XSS payloads before they hit Kong. |
| **Event Streaming** | **Apache Kafka** | Distributed message broker ensuring zero data loss. Partitioned into `sync_processing` (for high-priority fraud checks) and `async_analytics` (for sentiment tracking). Configured with strict idempotency and offset management. |
| **Backend Microservices** | **Node.js & Express (TypeScript)** | The core business orchestrator (`auth-service`). Handles JWT RBAC, Argon2id password hashing, SDUI JSON generation, and interacts with PostgreSQL via Prisma/TypeORM with robust connection pooling. |
| **Backend Microservices** | **Python & FastAPI** | High-concurrency AsyncIO wrappers for spatial GIS calculations (`cv-engine`, `vision-security`). Uses `tritonclient.grpc` for ultra-low latency communication with the AI cluster, plus OpenCV/NumPy for image preprocessing. |
| **AI/ML - Text & NLP** | **Gemma-2B (INT8) & BERT-Base** | NLP Gatekeeper. Gemma-2B (quantized to INT8 for lower VRAM usage) handles complex policy/toxicity evaluation, while BERT-Base rapidly routes intent (Issue vs. Thank You). |
| **AI/ML - Computer Vision** | **YOLOv8 / MobileNetV3** | Infrastructure CV engine running single-shot detection. Generates precise `(x, y, w, h)` bounding boxes for potholes/garbage and utilizes Non-Maximum Suppression (NMS) to filter overlapping duplicate boxes. |
| **AI/ML - Vision Security** | **ViT & pHash + Geo-Engine** | Multi-modal fraud engine. ViT detects AI-generated synthetic noise, pHash blocks recycled internet images, and the Geo-Engine runs Haversine formula comparisons between EXIF and live device headers to catch location spoofing. |
| **AI/ML - Analytics** | **VADER & RoBERTa** | Asynchronous Kafka consumer calculating compound polarity scores (-1.0 to +1.0) and grouping users into Hater/Supporter/Neutral buckets to generate real-time ward sentiment heatmaps. |
| **MLOps & Inference** | **NVIDIA Triton Inference Server** | Unified Kubernetes GPU pod containerizing YOLO, ViT, and Gemma. Configured with strict `config.pbtxt` files for dynamic batching (e.g., holding requests for 50ms to process concurrently) to prevent OOM crashes. |
| **MLOps & Inference** | **TensorRT & ONNX Runtime** | Hardware-accelerated inference backends. YOLOv8 compiles down to TensorRT execution plans for maximum CUDA core utilization, drastically dropping prediction latency. |
| **Databases & Spatial GIS** | **PostgreSQL + PostGIS** | The central relational truth. Stores boundaries as `GEOMETRY(MultiPolygon, 4326)` and uses high-speed GIST indexing. Executes the automated `ST_Contains()` Point-in-Polygon database trigger for zero-latency ward assignment. |
| **Caching & Feature Flags** | **Redis** | High-speed, millisecond-latency, in-memory store. Manages JWT token blacklisting, fast-read sets for the Kong National Security plugin, and caches duplicate text submissions to drop API load. |
| **Blob Storage** | **AWS S3** | Secure, encrypted-at-rest (KMS) bucket for raw image and media archiving. Tightly locked down; the app only uploads/downloads media via short-lived, backend-generated pre-signed URLs. |
| **Cloud Infrastructure** | **Kubernetes (K8s) + mTLS** | Container orchestration using Deployments, Horizontal Pod Autoscalers (HPA), and specialized GPU Node Pools. Employs a Service Mesh (Istio/Linkerd) for encrypted, zero-trust pod-to-pod communication. |
| **Cloud Infrastructure** | **Terraform** | Declarative Infrastructure-as-Code (IaC) ensuring the private VPC, subnets, IAM roles, and K8s clusters can be spun up or recovered predictably and securely across multiple cloud environments. |
| **Resilience & Fault Tolerance** | **Opossum / Resilience4j** | Circuit breaker logic embedded in Node/FastAPI. Monitors upstream failures; opens the circuit after a threshold, pushes incoming requests to the Kafka Dead Letter Queue (`gpu_retry_dlq`), and auto-heals (Half-Open state) when services recover. |

--------
