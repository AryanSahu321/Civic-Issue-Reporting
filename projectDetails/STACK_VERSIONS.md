# ACTIVE STACK & SYNTAX SPECIFICATIONS (ZERO-DEPRECATION POLICY)

### 1. Node.js & Module System
- Runtime: Node.js v24+ with `"type": "module"` in package.json.
- Import Syntax: Strict ECMAScript Modules (ESM) using `import/export`.
- File Extensions in Imports: Relative imports MUST include explicit `.js` extensions (e.g., `import app from "./app.js";`).
- Execution Tooling: Use `tsx` (e.g., `tsx watch src/server.ts`) for execution and hot-reloading. DO NOT use `ts-node` (incompatible with Node 24 ESM).

### 2. TypeScript & Build Tooling
- Compiler: TypeScript 5.x / 7.x.
- Module Resolution: `nodenext` or `bundler`.
- Flags: `verbatimModuleSyntax: false` in `tsconfig.json` to prevent unnecessary type-import errors.
- Package Management: Always resolve dependency trees with `--legacy-peer-deps` to bypass strict `ts-jest` / `typescript` version locking.

### 3. Database & Prisma ORM (v7+)
- Database: PostgreSQL 18 with PostGIS spatial extension enabled.
- Prisma Version: `@prisma/client` and `prisma` CLI v7.9+.
- Schema Syntax Rules (Prisma 7 Breaking Change):
  - In `schema.prisma`, DO NOT declare `url = env("DATABASE_URL")` inside the `datasource db` block.
  - Connection strings are passed via runtime client configuration or Prisma 7 config files.
- Spatial Types: PostGIS geometries must be typed as `Unsupported("geometry(Point, 4326)")` or `Unsupported("geometry(MultiPolygon, 4326)")`.
- Spatial Queries: Use raw parameterized queries with `ST_Contains()` and GIST spatial indexing. Never use application-layer Haversine math for ward containment.

### 4. API & Microservices Standards
- Framework: Express.js with TypeScript/ESM wrappers.
- Auth: Stateless JWT with Mobile Number + OTP validation (Argon2id hashing for admin credentials). No Aadhaar integration.
- API Gateways & Proxies: Kong API Gateway with Lua plugins (`gov_controller`) interfacing with Redis sets (`restricted_posts`) for data redaction.
- AI Transport: Communication with NVIDIA Triton Inference Server strictly uses high-speed gRPC (`tritonclient.grpc`), dynamic batching, and Opossum circuit breakers routing to Kafka DLQs (`gpu_retry_dlq`).
