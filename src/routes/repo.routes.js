import express from "express";
import { connectRepo } from "../controllers/repo.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/connect", authMiddleware, connectRepo);

export default router;