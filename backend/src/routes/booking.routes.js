import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import {
  createBooking,
  listMyBookings,
} from "../controllers/booking.controller.js";

const router = Router();

router.use(requireAuth);

router.post(
  "/",
  [
    body("spaceId").notEmpty().withMessage("spaceId is required"),
    body("checkIn").isISO8601().withMessage("Valid check-in date required"),
    body("checkOut").isISO8601().withMessage("Valid check-out date required"),
    body("guestName").notEmpty().withMessage("Full name is required"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    body("idCardNumber").notEmpty().withMessage("ID card number is required"),
  ],
  validate,
  createBooking,
);

router.get("/me", listMyBookings);

export default router;
