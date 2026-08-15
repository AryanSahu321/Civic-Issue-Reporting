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
