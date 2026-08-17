### Auth & API Testing Cheat Sheet

Save these commands in your project reference notes for testing endpoints locally across Git Bash or PowerShell.

---

**1. Server Health Check**

- **Git Bash / Linux:**

```bash
curl -X GET http://localhost:3000/health

```

- **PowerShell (Windows):**

```powershell
curl.exe -X GET http://localhost:3000/health

```

- **Expected Response:**

```json
{ "status": "success", "message": "Backend is up and running!" }
```

---

**2. Request OTP (`POST /api/v1/auth/request-otp`)**

- **Git Bash:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "9876543210"}'

```

- **PowerShell:**

```powershell
curl.exe -X POST http://localhost:3000/api/v1/auth/request-otp -H "Content-Type: application/json" -d "{\"phone\": \"9876543210\"}"

```

- **Expected Response:**

```json
{
  "status": "success",
  "message": "OTP sent successfully. Check console for test OTP."
}
```

---

**3. Verify OTP & Receive JWT (`POST /api/v1/auth/verify-otp`)**

- **Git Bash:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "9876543210", "otp": "123456"}'

```

- **PowerShell:**

```powershell
curl.exe -X POST http://localhost:3000/api/v1/auth/verify-otp -H "Content-Type: application/json" -d "{\"phone\": \"9876543210\", \"otp\": \"123456\"}"

```

- **Expected Response:**

```json
{
  "status": "success",
  "message": "Authentication successful.",
  "token": "<JWT_TOKEN_STRING>",
  "user": {
    "id": 1,
    "phone": "9876543210",
    "role": "CITIZEN",
    "createdAt": "2026-08-17T..."
  }
}
```

---

**4. Protected Route Test (`GET /api/v1/me`)**

- **Git Bash:**

```bash
curl -X GET http://localhost:3000/api/v1/me \
  -H "Authorization: Bearer <PASTE_YOUR_TOKEN_HERE>"

```

- **PowerShell:**

```powershell
curl.exe -X GET http://localhost:3000/api/v1/me -H "Authorization: Bearer <PASTE_YOUR_TOKEN_HERE>"

```

- **Expected Response:**

```json
{
  "status": "success",
  "user": {
    "userId": 1,
    "role": "CITIZEN",
    "iat": 1786973066,
    "exp": 1787577866
  }
}
```

---

### Project Documentation Log Entry

**1) Task / Bug Name:**
Phase 2 Authentication Service (`auth-service`) Mobile OTP & JWT Verification Engine Setup

**2) Root Cause / Context:**
Transitioned backend architecture from TypeScript to pure JavaScript (ESM) to resolve strict compile-time type incompatibilities and runtime ESM loader crashes. Implemented the core authentication controller and verified direct PostgreSQL user persistence via Prisma v5.22.0.

**3) Final Solution / Decision:**
Constructed the request-OTP and verify-OTP endpoints using an in-memory verification cache and JWT signing. Successfully verified database user upsert and JWT token generation using cURL.

**4) Key Code Snippets / Commands:**

- **Run Server:**

```bash
node --watch src/server.js

```

- **Verify Endpoint:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/verify-otp -H "Content-Type: application/json" -d '{"phone": "9876543210", "otp": "123456"}'

```

**What is the `/api/v1/me` Protected Route?**

The `/api/v1/me` route is a security checkpoint test. In your backend (`src/app.js`), you placed the `authenticateJWT` middleware in front of it.

- **Public routes** (like `/health` or `/api/v1/auth/request-otp`) can be accessed by anyone on the internet.
- **Protected routes** (like creating an issue, viewing personal tickets, or `/api/v1/me`) require a valid digital passport—the **JWT Bearer Token** you received after verifying your OTP.

If a user tries to access `/api/v1/me` without a token or with a fake token, the server rejects them with `401 Unauthorized` or `403 Forbidden`. If they send a valid token, the server decodes it and returns who they are (`userId` and `role`).

---

**How to Run This Test Right Now**

Take the exact token you just received in your terminal:

```bash
curl -X GET http://localhost:3000/api/v1/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJDSVRJWkVOIiwiaWF0IjoxNzg2OTczMDY2LCJleHAiOjE3ODc1Nzc4NjZ9.1LwQUSws_ADD-FCLizDX9DHkqAXJxCecc_fMcIFiUGM"

```

**Expected Result:**

```json
{
  "status": "success",
  "user": {
    "userId": 1,
    "role": "CITIZEN",
    "iat": 1786973066,
    "exp": 1787577866
  }
}
```

---

**Negative Test (Verifying Security)**

Run the command without the token or with a broken token:

```bash
curl -X GET http://localhost:3000/api/v1/me

```

**Expected Rejection:**

```json
{
  "status": "error",
  "message": "Authorization token missing or malformed."
}
```

This confirms your JWT Authentication & Middleware layer is working.
