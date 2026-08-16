Team Leader ke taur par `auth-service` (Node.js & Express) ka base setup karna sabse crucial step hai, kyunki isi structure par aage chalkar baaki team members (AI/ML, GIS) apna code integrate karenge.

Ek production-grade, highly scalable backend setup karne ka step-by-step tareeqa yeh raha. Aapko apni terminal mein apne `backend` branch ke andar yeh commands run karni hain:

### Step 1: Project Initialization & Core Dependencies

Sabse pehle Node.js project initialize karein aur Express, Security, aur Database (Prisma) ki dependencies install karein.

```bash
# 1. Initialize project
npm init -y

# 2. Install Production Dependencies (Express, JWT, Security, Prisma Client)
npm install express cors dotenv jsonwebtoken argon2 @prisma/client

# 3. Install Development & Testing Dependencies (TypeScript, Nodemon, Jest, Supertest)
npm install -D typescript @types/node @types/express ts-node nodemon jest supertest ts-jest @types/jest @types/supertest prisma

```

### Step 2: TypeScript & Prisma Configuration

Kyunki hum enterprise-level architecture bana rahe hain, TypeScript mandatory hai.

```bash
# 1. Initialize TypeScript config
npx tsc --init

# 2. Initialize Prisma (isne aapka prisma/schema.prisma banaya tha)
npx prisma init

```

*(Aapne `schema.prisma` pehle hi pichle step mein setup kar liya hai, isliye aap yahan seedha `npx prisma db push` aur `npx prisma generate` run kar sakte hain agar abhi tak nahi kiya hai).*

### Step 3: Industry-Standard Folder Structure

Apne project folder ke andar yeh directories create karein. Ek clean architecture team conflicts (merge conflicts) ko rokti hai:

```text
Civic-Issue-Reporting/
│
├── prisma/
│   └── schema.prisma        # Database schema
│
├── src/
│   ├── controllers/         # Request/Response logic (e.g., auth.controller.ts)
│   ├── middlewares/         # JWT verification, RBAC, Error handling
│   ├── routes/              # Express routing (e.g., auth.routes.ts)
│   ├── services/            # Business logic (Spatial check, pHash matching)
│   ├── tests/               # Jest & Supertest test cases
│   │
│   ├── app.ts               # Express configuration (Middlewares & Routes)
│   └── server.ts            # Server startup & DB connection
│
├── .env                     # Environment variables (DB URLs, JWT Secrets)
├── package.json             
└── tsconfig.json            

```

### Step 4: `package.json` Scripts Setup

Apne `package.json` file ko open karein aur `"scripts"` section ko isse replace karein taaki aap easily code run aur test kar sakein:

```json
"scripts": {
  "start": "node dist/server.js",
  "dev": "nodemon src/server.ts",
  "build": "tsc",
  "test": "jest --detectOpenHandles"
}

```

### Step 5: Base Server Code (`src/app.ts` & `src/server.ts`)

Sabse pehle hum Express app ko initialize karenge taaki server up and running ho jaye.

**1. Create `src/app.ts` (Express Config):**

```typescript
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check Endpoint (Team members checking if backend is alive)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Auth Service & Core API is running!' });
});

// Future Routes will be mounted here
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/posts', postRoutes);

export default app;

```

**2. Create `src/server.ts` (Startup):**

```typescript
import app from './app';
import { PrismaClient } from '@prisma/client';

const PORT = process.env.PORT || 3000;
export const prisma = new PrismaClient();

async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ PostgreSQL Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

startServer();

```

---

**Next Step Setup Complete!**
Ab aap terminal mein `npm run dev` type karke server start kar sakte hain. Aapko *"Database connected successfully"* aur *"Server is running"* ka message dikhega.

Base setup ready ho chuka hai. Kya ab hum seedha **Mobile OTP + JWT Login API (`auth.controller.ts`)** ka logic likhna shuru karein ya pehle **JWT Middleware** configure karein jo `CITIZEN` aur `WARD_ADMIN` roles ko handle karega?
