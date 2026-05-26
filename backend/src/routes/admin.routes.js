import { Router } from "express";
import { seedSpaces } from "../controllers/admin.controller.js";

const router = Router();

router.post("/seed", seedSpaces);

export default router;
