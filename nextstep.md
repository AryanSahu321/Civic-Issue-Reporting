The immediate plan is to complete **Phase 2: Core Backend Implementation (`auth-service`)** by implementing the authentication controllers, routes, and role-based middleware.

---

### Step 1: Implement the Mobile OTP & JWT Controller

Create `src/controllers/auth.controller.ts` to handle:

* **Request OTP (`POST /api/v1/auth/request-otp`):** Ingests the citizen's phone number and issues a mock/cached OTP.
* **Verify OTP & Issue JWT (`POST /api/v1/auth/verify-otp`):** Validates the OTP, upserts the `User` record via Prisma, and signs a JWT containing `{ userId, role }`.



---

### Step 2: Implement Role-Based Access Control (RBAC) Middleware

Create `src/middlewares/auth.middleware.ts` to protect downstream routes:

* Validates incoming `Authorization: Bearer <token>` headers.


* Attaches decoded user identity (`req.user`) to the Express request.


* Enforces role boundaries (`CITIZEN`, `WARD_ADMIN`, `STATE_ADMIN`).



---

### Step 3: Map Routes & Mount to Express App

* Define endpoints in `src/routes/auth.routes.ts`.
* Mount the auth router in `src/app.ts` under `/api/v1/auth`.



---

### Step 4: Verification & Smoke Testing

Start the server using `npm run dev` and execute test requests via cURL or Postman:

1. Trigger OTP request to verify terminal output.
2. Verify OTP to confirm database insertion in PostgreSQL and receive the signed JWT token.
