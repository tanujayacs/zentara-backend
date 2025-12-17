import { Router } from "express";
import * as users from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/users", authMiddleware, users.getAll);
router.put("/users/:id", authMiddleware, users.update);
router.delete("/users/:id", authMiddleware, users.remove);

export default router;