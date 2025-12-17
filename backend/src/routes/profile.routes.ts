import { Router } from "express";
import * as profile from "../controllers/profile.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/profile", authMiddleware, profile.getProfile);
router.put("/profile", authMiddleware, profile.updateProfile);

export default router;