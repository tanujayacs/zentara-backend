import { Router } from "express";
import * as publicController from "../controllers/public.controller";

const router = Router();

router.get("/publikasi-berita", publicController.getPublikasiBerita);

export default router;
