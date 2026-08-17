import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { authenticateJWT } from "./middlewares/auth.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Backend is up and running!" });
});

app.use("/api/v1/auth", authRoutes);

app.get("/api/v1/me", authenticateJWT, (req, res) => {
  res.status(200).json({ status: "success", user: req.user });
});

export default app;
