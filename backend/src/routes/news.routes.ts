import { Router } from "express";
import * as news from "../controllers/news.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, news.create);
router.get("/", news.getAll);
router.get("/me", authMiddleware, news.getMine);
router.put("/:id", authMiddleware, news.update);
router.delete("/:id", authMiddleware, news.remove);

export default router;
