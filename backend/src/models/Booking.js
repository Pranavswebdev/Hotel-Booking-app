import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    space: { type: mongoose.Schema.Types.ObjectId, ref: "Space", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    nights: { type: Number, required: true },
    members: { type: Number, default: 1 },
    guestName: { type: String, required: true },
    phone: { type: String, required: true },
    idCardNumber: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true },
);

export const Booking = mongoose.model("Booking", bookingSchema);
