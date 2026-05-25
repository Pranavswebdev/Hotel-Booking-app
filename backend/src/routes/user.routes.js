import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import { getMe, updateMe } from "../controllers/user.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/me", getMe);

router.put(
  "/me",
  [
    body("gender")
      .optional()
      .isIn(["Male", "Female", "Other", ""])
      .withMessage("Invalid gender"),
  ],
  validate,
  updateMe,
);

export default router;
