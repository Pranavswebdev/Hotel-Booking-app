import crypto from "node:crypto";
import { User } from "../models/User.js";
import { signToken } from "../utils/token.js";
import { ApiError } from "../middleware/error.js";

// In a real deployment these codes/links are emailed (SendGrid/Nodemailer).
// Here we return them in the response so the flow is testable end-to-end.
function generateCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) throw new ApiError(409, "Email is already registered");

    const verificationCode = generateCode();
    const user = await User.create({ email, password, verificationCode });

    res.status(201).json({
      message: "Account created. Verify the 4-digit code sent to your email.",
      user: user.toSafeJSON(),
      devVerificationCode: verificationCode,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, "Invalid email or password");
    }
    const token = signToken(user._id);
    res.json({ token, user: user.toSafeJSON() });
  } catch (err) {
    next(err);
  }
}

export async function verifyEmail(req, res, next) {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email }).select("+verificationCode");
    if (!user) throw new ApiError(404, "Account not found");
    if (user.isVerified) {
      return res.json({ message: "Account already verified" });
    }
    if (user.verificationCode !== code) {
      throw new ApiError(400, "Incorrect verification code");
    }
    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    const token = signToken(user._id);
    res.json({ message: "Email verified", token, user: user.toSafeJSON() });
  } catch (err) {
    next(err);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    // Always respond 200 so we don't reveal which emails exist.
    if (!user) {
      return res.json({ message: "If the email exists, a reset link was sent" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    res.json({
      message: "If the email exists, a reset link was sent",
      devResetToken: resetToken,
    });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body;
    const hashed = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetToken: hashed,
      resetTokenExpires: { $gt: new Date() },
    }).select("+resetToken +resetTokenExpires");

    if (!user) throw new ApiError(400, "Reset token is invalid or expired");

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: "Password updated. You can now log in." });
  } catch (err) {
    next(err);
  }
}

export async function logout(_req, res) {
  // JWTs are stateless; the client discards the token. Endpoint provided so
  // the frontend has a consistent action and for future token-blacklisting.
  res.json({ message: "Logged out" });
}
