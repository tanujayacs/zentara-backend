import { Router } from "express";
import * as categories from "../controllers/categories.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/categories", categories.getAll);
router.post("/categories", authMiddleware, categories.create);
router.put("/categories/:id", authMiddleware, categories.update);
router.delete("/categories/:id", authMiddleware, categories.remove);

export default router;