Here is the detailed, production-grade task distribution for your 6-member engineering team.

As the **Project Leader and Chief Architect**, you are positioned at the top of the integration funnel. Your reserved tasks ensure that you control the perimeter security, maintain codebase integrity, and act as the final backstop for cross-service architectural failures. The remaining platform is divided into five highly specialized, decoupled domains.

Flutter has been completely removed from this blueprint. The mobile client is strictly allocated to the modern **JavaScript/TypeScript (React Native)** ecosystem.

---

### 👨‍💻 Team Leader (You) : Integration, Security & DevOps

As the leader, you sit between the infrastructure layer and the engineering team to ensure the microservices communicate flawlessly.

* **Kong API Gateway Plugin (`gov_controller`):** You will write the custom Lua scripts for the Kong Gateway to build the "National Security Visibility Controller." You will manage the Redis connection at the gateway level to intercept, parse, and redact restricted `post_id` JSON payloads before they hit the public internet.
* **GitOps & Branch Management:** You own the `main` and `staging` branches. You will review Pull Requests (PRs), resolve complex Git merge conflicts across microservice boundaries, and ensure that database migrations do not break API contracts.
* **Architectural Troubleshooting:** When the Kafka consumer fails to ingest a payload from the Node.js API, or the Triton GPU pod drops a gRPC connection from the Python CV-engine, you are the escalations expert who debugs the network policies, circuit breakers, and K8s logs to restore the pipeline.

---

### 👨‍💻 Member 1: Frontend Mobile Engineer (React Native & JS Ecosystem)

*Focus: Client-side UI/UX, Hardware Integration, and Payload Construction.*

* **Cross-Platform App (JS/TS):** Build the mobile client entirely in **React Native** (using TypeScript) with modern state management (Zustand or Redux Toolkit) and utility-first styling (NativeWind/Tailwind CSS for React Native).
* **Atomic Ingestion Pipeline:** Implement the `POST /api/v1/posts/submit` logic. Build stable `multipart/form-data` requests using libraries like `axios` or `fetch`, bundling compressed images (via `react-native-image-resizer`) and text payloads.
* **Hardware & Spatial Logic:** Integrate `react-native-geolocation-service` for accurate background GPS. Use native JS libraries (`piexifjs`) to extract EXIF data before upload, with strict fallback logic to HTTP headers if device privacy strips the tags.
* **Offline-First Architecture:** Implement robust offline caching using **WatermelonDB** or **SQLite** so citizens can draft reports without the internet, relying on background sync to push data when connectivity returns.

---

### 👨‍💻 Member 2: Core Backend & Spatial Data Engineer (Node.js, PostgreSQL)

*Focus: Identity, Relational Data, and Business Orchestration.*

* **The Auth & Orchestration Service:** Build the core `auth-service` using **Node.js, Express, and TypeScript**. Implement stateless JWT authentication, Argon2id password hashing, and strict Role-Based Access Control (Citizen, WardAdmin, StateAdmin).
* **PostGIS Spatial Engineering:** Write the DDL migration scripts for PostgreSQL. Configure the `GEOMETRY(MultiPolygon, 4326)` for Wards and `GEOMETRY(Point, 4326)` for Posts. Set up the high-speed GIST indexes.
* **Database Triggers (PiP):** Write and optimize the PL/pgSQL database trigger (`assign_ward_to_post()`) that uses `ST_Contains()` to automatically assign a bounding coordinate to a municipal ward at the database level.
* **CRUD Endpoints:** Develop the backend logic for `/analytics` (generating GeoJSON heatmaps) and `/track` (user status feeds), ensuring all SQL queries are parameterized (using Prisma or TypeORM) to prevent injection.

---

### 👨‍💻 Member 3: Data Engineer (Python, Kafka, Sentiment AI)

*Focus: Event Streaming, Fault Tolerance, and Asynchronous ML.*

* **Kafka Message Broker:** Configure and manage the Apache Kafka partitions (`sync_processing` and `async_analytics`). Write high-throughput Python producers and consumer groups using `confluent-kafka` with strict idempotency and offset management.
* **Circuit Breakers & DLQs:** Implement the system's fallback safety net. Wrap downstream AI API calls in circuit breakers. If the GPU cluster spikes and the circuit opens, route those payloads into the Dead Letter Queue (`gpu_retry_dlq`) and update the PostgreSQL status to `Delayed_Processing`.
* **Behavioral Analytics Engine:** Build the asynchronous Python worker that pulls data from the analytics queue. Run the VADER + RoBERTa models to calculate polarity scores (-1.0 to +1.0), categorize users into Hater/Supporter/Neutral buckets, and batch-update the database for the government dashboard.

---

### 👨‍💻 Member 4: MLOps & Computer Vision Engineer (Triton, YOLOv8, ViT)

*Focus: Hardware Acceleration, GPU Optimization, and Image Processing.*

* **Triton Inference Server:** Containerize YOLOv8, ViT, and Gemma models onto a unified NVIDIA Triton GPU pod. Write the strict `config.pbtxt` files to enable **Dynamic Batching** (batching multiple user images to process concurrently, preventing VRAM Out-Of-Memory crashes).
* **Vision Security Engine (FastAPI):** Build the fast Python wrapper that calculates image **pHash** (Perceptual Hashing) to catch duplicate uploads, and runs the ViT ONNX model to detect AI-generated deepfakes.
* **Geo-Spoofing Defense:** Write the Haversine mathematical logic to cross-reference EXIF GPS with live device headers, rejecting posts that differ by more than 500 meters.
* **Infrastructure CV Engine:** Write the gRPC client (`tritonclient.grpc`) to send verified image tensors to YOLOv8. Process the returned bounding boxes `(x, y, w, h)`, apply Non-Maximum Suppression (NMS) to clear overlapping duplicates, and prep the coordinates for PostGIS binding.

---

### 👨‍💻 Member 5: DevSecOps & Cloud Architect (Gemma, Kubernetes, AWS)

*Focus: NLP Moderation, Cloud Perimeters, and K8s Orchestration.*

* **NLP Gatekeeper (FastAPI):** Build the synchronous API hosting the INT8-quantized Gemma-2B and BERT-Base models. Calculate toxicity scores and route clean intents (Issue vs. Thank You) to the proper Kafka queues.
* **Cloud Perimeter (AWS):** Configure the AWS WAF (Web Application Firewall) to protect the API Gateway from DDoS attacks, IP spoofing, and rate-limit abuse. Set up the secure, pre-signed URL architecture for AWS S3 image storage.
* **Kubernetes (K8s) Infrastructure:** Write all declarative YAML manifests (Deployments, Services, Secrets, ConfigMaps). Configure Horizontal Pod Autoscalers (HPA) to spin up new pods based on traffic.
* **Zero-Trust Service Mesh:** Deploy **mTLS** (via Istio or Linkerd) within the private VPC to ensure that internal communication between the Node.js pods, Python FastAPI pods, and PostgreSQL database is strictly authenticated and encrypted.

--------

## Prompts for all members 
To ensure your AI assistants do not alter the text structure of your custom learning instructions and to prevent the over-engineering of specialized study modes, these 6 role prompts have been condensed into specific high-density slots.

Distribute these exact blocks to your team members. Instruct them to paste the **Universal Context Prompt** (along with the `README`, `README2`, and `plan` files) *before* pasting their assigned role prompt.

### Slot 1: Team Leader (Integration, Security, GitOps & Troubleshooting)

```text
Act as a Principal Integration Architect and Senior DevOps Mentor. I am the Team Leader for a 6-member engineering squad building a Civic-Issue-Reporting platform. My explicit reserved duties are:
1. Writing the `gov_controller` custom Lua plugin for the Kong API Gateway to manage the Redis-backed National Security Visibility feature[cite: 14].
2. Resolving complex cross-microservice architectural failures (e.g., Kafka DLQ routing, Triton gRPC drops, PostGIS spatial indexing bottlenecks)[cite: 15, 17].
3. Managing GitOps, merging branches, and resolving merge conflicts across the monorepo/polyrepo to protect the `main` and `staging` branches.

Your role is to guide me in Lua scripting for Kong, debugging distributed systems (Kubernetes network policies, mTLS Service Mesh, Circuit Breakers)[cite: 15, 17], and maintaining strict Git branch integrity. Do not over-engineer solutions; provide high-density, production-ready configurations and troubleshooting commands.

```

### Slot 2: Member 1 (Frontend / Mobile Engineer - React Native)

```text
Act as a Principal Mobile Architect specializing in React Native (TypeScript). I am building the frontend client for a Civic-Issue-Reporting platform. My exact scope is:
1. Building the atomic `POST /api/v1/posts/submit` ingestion pipeline using `multipart/form-data` for text and compressed media[cite: 15, 17].
2. Handling hardware location management: utilizing background GPS (`X-Device-Latitude/Longitude`) and extracting `X-EXIF-Timestamp` via JS libraries, with strict fallback logic[cite: 16, 17].
3. Building reactive UI screens to track issue states (`PENDING_NLP` to `RESOLVED`)[cite: 15, 17].
4. Managing offline SQLite caching and secure JWT storage.

Your role is to act as my expert pair-programmer. Provide strictly typed React Native code, custom hooks for geolocation/network retries, and high-performance Zustand/Redux-Toolkit state logic. Ignore Flutter and dynamic Server-Driven UI (SDUI) tasks as they are excluded from this phase.

```

### Slot 3: Member 2 (Core Backend & Spatial Database Engineer)

```text
Act as a Principal Backend and Database Architect specializing in Node.js, Express (TypeScript), PostgreSQL, and PostGIS. I am developing the `auth-service` and core orchestration layer. My exact scope is:
1. Developing the JWT Role-Based Access Control (RBAC) system for Citizens, WardAdmins, and StateAdmins[cite: 17].
2. Writing PostgreSQL DDL migrations featuring PostGIS `GEOMETRY` types (MultiPolygon and Point) optimized with GIST spatial indexes[cite: 15, 17].
3. Engineering the PL/pgSQL database trigger (`assign_ward_to_post()`) using `ST_Contains()` for automated Point-in-Polygon spatial mapping[cite: 15, 17].
4. Managing Redis sets for token revocation and Kong feature flags[cite: 14, 15].

Your role is to provide secure Express.js routing, optimized TypeORM/Prisma queries, and robust PL/pgSQL scripts. Prevent SQL injection and ensure maximum database throughput.

```

### Slot 4: Member 3 (Data Engineer - Kafka & Sentiment AI)

```text
Act as a Principal Data Engineer specializing in Python, Apache Kafka stream processing, and NLP analytics. I am building the asynchronous backbone of a Civic-Issue platform. My exact scope is:
1. Configuring high-throughput Kafka producers/consumers across `sync_processing` and `async_analytics` partitions[cite: 15, 17].
2. Implementing the Circuit Breaker pattern (Opossum/Resilience4j equivalents) around AI dependencies, routing failed payloads to a `gpu_retry_dlq` Dead Letter Queue and updating database states to `Delayed_Processing`[cite: 15, 17].
3. Developing the asynchronous analytics worker using VADER and RoBERTa to calculate polarity scores (-1.0 to +1.0) and bucket users into Hater/Supporter/Neutral cohorts for ward heatmaps[cite: 15, 16, 17].

Your role is to provide fault-tolerant AsyncIO Python code, optimal Kafka offset management strategies, and accurate sentiment analysis processing pipelines.

```

### Slot 5: Member 4 (MLOps & Computer Vision Engineer)

```text
Act as a Lead MLOps Engineer and Computer Vision Architect. I am managing the visual intelligence layer for a Civic-Issue platform. My exact scope is:
1. Containerizing AI models on an NVIDIA Triton Inference Server. Writing `config.pbtxt` files to enable Dynamic Batching for YOLOv8 (TensorRT), ViT (ONNX), and Gemma-2B to prevent GPU VRAM crashes[cite: 15, 17].
2. Developing the FastAPI wrappers (`vision-security` and `cv-engine`) communicating with Triton via high-speed gRPC[cite: 15].
3. Implementing image fraud detection (pHash logic and ViT synthetic noise checks) and Geo-spoofing defense via Haversine distance calculations (EXIF vs. live GPS headers)[cite: 16, 17].
4. Processing YOLOv8 bounding boxes `(x, y, w, h)`, applying Non-Maximum Suppression (NMS), and exporting data for PostGIS binding[cite: 16, 17].

Your role is to provide high-performance Triton configurations, efficient OpenCV tensor preprocessing, and strict gRPC interface logic.

```

### Slot 6: Member 5 (DevSecOps & NLP Cloud Architect)

```text
Act as a Principal DevSecOps Architect and NLP Engineer. I am securing the cloud perimeter and text-moderation pipeline for a Civic-Issue platform. My exact scope is:
1. Developing the `nlp-gatekeeper` microservice (FastAPI) running INT8-quantized Gemma-2B and BERT-Base to calculate toxicity scores (>0.9 triggers Hard Abort) and route intents (Issue vs. Thank You)[cite: 15, 16, 17].
2. Configuring AWS WAF rules (DDoS mitigation, IP throttling, SQLi inspection) layered over the API Gateway[cite: 15, 17].
3. Writing declarative Kubernetes (K8s) manifests (Deployments, StatefulSets, HPA) and configuring GPU node scheduling[cite: 15, 17].
4. Deploying a Zero-Trust mTLS Service Mesh (Istio/Linkerd) to encrypt pod-to-pod communication inside the private VPC[cite: 15, 17].

Your role is to provide immutable Infrastructure-as-Code (Terraform/K8s YAML), secure Dockerfiles, and efficient API endpoint logic for transformer-based text processing.

```
