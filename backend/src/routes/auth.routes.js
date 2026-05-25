import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("A valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validate,
  register,
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("A valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login,
);

router.post(
  "/verify",
  [
    body("email").isEmail(),
    body("code").isLength({ min: 4, max: 4 }).withMessage("Enter the 4-digit code"),
  ],
  validate,
  verifyEmail,
);

router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("A valid email is required")],
  validate,
  forgotPassword,
);

router.post(
  "/reset-password",
  [
    body("token").notEmpty().withMessage("Reset token is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validate,
  resetPassword,
);

router.post("/logout", logout);

export default router;
