import { Router } from "express";
import * as stats from "../controllers/stats.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/stats/dashboard", authMiddleware, stats.getDashboardStats);

export default router;