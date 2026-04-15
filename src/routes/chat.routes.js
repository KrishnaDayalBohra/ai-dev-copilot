import express from "express";
import { queryRepo } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ This is your route
router.post("/query", authMiddleware, queryRepo);

export default router;