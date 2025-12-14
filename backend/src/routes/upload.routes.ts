import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";
import { uploadImage } from "../controllers/upload.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  uploadImage
);

export default router;
