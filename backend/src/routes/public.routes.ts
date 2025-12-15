// import { Router } from "express";
// import * as publicController from "../controllers/public.controller";

// const router = Router();

// router.get("/publikasi-berita", publicController.getPublikasiBerita);

// export default router;

import { Router } from "express";
import * as publicController from "../controllers/public.controller";
import { authMiddleware } from "../middlewares/auth.middleware"; // ✅ TAMBAHKAN

const router = Router();

// ✅ TAMBAHKAN authMiddleware
router.get("/publikasi-berita", authMiddleware, publicController.getPublikasiBerita);

export default router;