import { Router } from "express";
import * as publicAuth from "../controllers/public-auth.controller";

const router = Router();

router.post("/login", publicAuth.loginPublic);

export default router;