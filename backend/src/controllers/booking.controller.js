import { Booking } from "../models/Booking.js";
import { Space } from "../models/Space.js";
import { ApiError } from "../middleware/error.js";

export async function createBooking(req, res, next) {
  try {
    const { spaceId, checkIn, checkOut, members, guestName, phone, idCardNumber } =
      req.body;

    const space =
      (await Space.findOne({ slug: spaceId })) ||
      (await Space.findById(spaceId).catch(() => null));
    if (!space) throw new ApiError(404, "Space not found");

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.round((end - start) / 86400000);
    if (!(nights > 0)) {
      throw new ApiError(400, "Check-out must be after check-in");
    }

    const booking = await Booking.create({
      user: req.user._id,
      space: space._id,
      checkIn: start,
      checkOut: end,
      nights,
      members: members || 1,
      guestName,
      phone,
      idCardNumber,
      totalPrice: space.pricePerNight * nights,
    });

    res.status(201).json({ message: "Space booked", booking });
  } catch (err) {
    next(err);
  }
}

export async function listMyBookings(req, res, next) {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("space")
      .sort({ createdAt: -1 });
    res.json({ count: bookings.length, bookings });
  } catch (err) {
    next(err);
  }
}
