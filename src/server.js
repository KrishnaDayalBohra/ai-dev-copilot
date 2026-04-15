import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import repoRoutes from "./routes/repo.routes.js";
import chatRoutes from "./routes/chat.routes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/repos", repoRoutes);
app.use("/chat", chatRoutes);

// health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// DB test
app.get("/db-test", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});