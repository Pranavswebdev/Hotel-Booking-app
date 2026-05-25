import { Router } from "express";
import { listSpaces, getSpace } from "../controllers/space.controller.js";

const router = Router();

router.get("/", listSpaces);
router.get("/:id", getSpace);

export default router;
