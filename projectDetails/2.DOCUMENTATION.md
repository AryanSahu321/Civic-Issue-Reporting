# Civic-Issue-Reporting: Unified Tech Stack, Migration & Syntax Reference

> **Purpose:** Single source of truth for versions, breaking changes, exact syntax rules, and official documentation links to prevent AI code hallucinations and runtime version conflicts.

---

## 1. Environment & Runtime Layer

### Node.js & Module System
* **Pinned Version:** Node.js v24.x LTS / Latest
* **Module Standard:** Strict ECMAScript Modules (`"type": "module"` in `package.json`)
* **Runner / Dev Tool:** `tsx watch` (do not use legacy `ts-node`)
* **Breaking Changes & Rules:**
  - Mandatory `.js` file extensions in local relative imports (e.g., `import app from './app.js';`)[cite: 1, 3].
  - CommonJS `require()` and `module.exports` are prohibited[cite: 1, 3].
* **Official Docs / Migration Links:**
  - Node.js ESM Guide: `https://nodejs.org/api/esm.html`

---

## 2. Database & Spatial ORM Layer

### PostgreSQL & PostGIS Extension
* **Pinned Version:** PostgreSQL 16+ / PostGIS 3.4+[cite: 1, 3]
* **Spatial Column Types:** `GEOMETRY(Point, 4326)` for Issue Locations, `GEOMETRY(MultiPolygon, 4326)` for Wards[cite: 1, 3]
* **Spatial Indexing:** GIST Indexes (`CREATE INDEX idx_posts_loc ON posts USING GIST(location);`)[cite: 1, 3]
* **Automated Trigger Rule:** Spatial mapping MUST use PostGIS `ST_Contains(boundary, location)` inside PL/pgSQL triggers (`assign_ward_to_post()`)[cite: 1, 3]. Never use Haversine formulas in SQL[cite: 1, 3].
* **Official Docs Links:**
  - PostGIS Manual: `https://postgis.net/documentation/`
  - PostGIS `ST_Contains`: `https://postgis.net/docs/ST_Contains.html`

### Prisma ORM (v7.x / v8.x RC)
* **Pinned Version:** `@prisma/client` & `prisma` (Latest / v7+ / v8-rc)[cite: 1, 3]
* **Breaking Changes & Syntax Rules:**
  - **Datasource Declaration:** Do NOT declare `url = env("DATABASE_URL")` inside the `datasource db` block in `schema.prisma` (Prisma v7+ standard)[cite: 1, 3]. Manage via runtime Prisma Client config or `.env` loader[cite: 1, 3].
  - **BigInt Aggregate Results:** `count()` queries return `bigint` (e.g., `0n`, `2n`)[cite: 1, 3]. Wrap with `Number()` prior to sending JSON responses (`res.json({ count: Number(val) })`)[cite: 1, 3].
  - **CLI Generation:** Run `npx prisma generate` after any schema modification[cite: 1, 3].
* **Official Docs / Release Links:**
  - Prisma Upgrade Guides: `https://www.prisma.io/docs/orm/more/upgrade-guides`
  - Prisma Releases CHANGELOG: `https://github.com/prisma/prisma/releases`

---

## 3. Perimeter, Gateway & Caching Layer

### Kong API Gateway (`gov_controller` Plugin)
* **Technology:** OpenResty / Lua PDK on Kong Gateway[cite: 1, 3]
* **Architecture Pattern:** Response payload interception backed by Redis Sets (`restricted_posts`)[cite: 1, 3]
* **Execution Rules:**
  - Runs at perimeter C-level network speed to strip sensitive JSON objects before reaching clients[cite: 1, 3].
  - Never implement this as standard Node.js Express middleware[cite: 1, 3].
* **Official Docs Links:**
  - Kong Plugin Development: `https://docs.konghq.com/gateway/latest/plugin-development/`
  - Kong PDK Reference: `https://docs.konghq.com/gateway/latest/plugin-development/pdk/`

### Redis Cache
* **Pinned Version:** Redis 7.x (or Upstash Serverless Redis)[cite: 1, 3]
* **Use Cases:** Token blacklisting, session validation, Kong feature flag sets (`restricted_posts`), and fast duplicate text check[cite: 1, 3].
* **Official Docs Links:**
  - Redis Commands Reference: `https://redis.io/commands/`

---

## 4. Event Streaming & Distributed Resiliency Layer

### Apache Kafka
* **Partitions / Topics:** `sync_processing` (fraud & vision inference) and `async_analytics` (sentiment processing)[cite: 1, 3]
* **Dead Letter Queue (DLQ):** `gpu_retry_dlq` for handling Triton GPU crashes and memory spikes[cite: 1, 3]
* **Client Library:** `confluent-kafka` (Python) / `kafkajs` (Node.js)[cite: 1, 3]
* **Resilience Pattern:** Opossum / Resilience4j Circuit Breakers around external AI microservices; updates post status to `Delayed_Processing` on trip[cite: 1, 3].
* **Official Docs Links:**
  - Apache Kafka Documentation: `https://kafka.apache.org/documentation/`
  - Confluent Kafka Python: `https://docs.confluent.io/kafka-clients/python/current/overview.html`

---

## 5. MLOps & High-Speed AI Inference Layer

### NVIDIA Triton Inference Server
* **Protocols:** Strictly gRPC (`tritonclient.grpc`) communication from FastAPI client; no standard HTTP REST for model inference[cite: 1, 3].
* **Containerized Backends:**
  - YOLOv8 (TensorRT engine plan)[cite: 1, 3]
  - Vision Transformer / ViT (ONNX Runtime backend)[cite: 1, 3]
  - Gemma-2B INT8 / BERT-Base (vLLM / PyTorch backend)[cite: 1, 3]
* **Dynamic Batching Rule:** Configured via `config.pbtxt` with maximum 50ms latency delay to prevent GPU VRAM Out-of-Memory crashes[cite: 1, 3].
* **Official Docs Links:**
  - Triton Server User Guide: `https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/`
  - Triton Model Configuration (`config.pbtxt`): `https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/model_configuration.html`

---

## 6. Frontend Client & Location Logic

### React Native (Mobile Client)
* **Language:** TypeScript 5.x+[cite: 1, 3]
* **Payload Structure:** Multipart form data to `POST /api/v1/posts/submit`[cite: 1, 3]
* **Spatial Headers:** Live GPS headers (`X-Device-Latitude`, `X-Device-Longitude`, `X-EXIF-Timestamp`)[cite: 1, 3]
* **Geotag Fallback & Anti-Spoofing:** If EXIF is stripped, fallback to live headers; if both exist and distance > 500m (Haversine), flag as `GEO_SPOOFED`[cite: 1, 3].
* **Official Docs Links:**
  - React Native Docs: `https://reactnative.dev/docs/getting-started`
