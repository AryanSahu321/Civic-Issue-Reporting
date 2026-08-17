import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 3000;
export const prisma = new PrismaClient();

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ PostgreSQL Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
