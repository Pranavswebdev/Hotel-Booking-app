import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    gender: { type: String, enum: ["Male", "Female", "Other", ""], default: "" },
    birthDate: { type: String, default: "" },
    role: { type: String, enum: ["Customer", "Host"], default: "Customer" },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String, select: false },
    resetToken: { type: String, select: false },
    resetTokenExpires: { type: Date, select: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  const { _id, email, name, phone, address, gender, birthDate, role, isVerified } =
    this;
  return {
    id: _id,
    email,
    name,
    phone,
    address,
    gender,
    birthDate,
    role,
    isVerified,
  };
};

export const User = mongoose.model("User", userSchema);
