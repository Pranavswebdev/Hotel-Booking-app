import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import spaceRoutes from "./routes/space.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";

// Allow the configured client URL(s) plus local dev ports. CLIENT_URL may be a
// comma-separated list of allowed origins.
const allowedOrigins = new Set(
  [
    ...config.clientUrl.split(","),
    "http://localhost:3000",
    "http://localhost:3100",
  ].map((o) => o.trim()).filter(Boolean),
);

function corsOrigin(origin, callback) {
  // Allow non-browser clients (curl, server-to-server) with no Origin header.
  if (!origin || allowedOrigins.has(origin)) return callback(null, true);
  callback(new Error(`Origin not allowed by CORS: ${origin}`));
}

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: corsOrigin, credentials: true }));
  app.use(express.json());
  if (config.nodeEnv !== "test") app.use(morgan("dev"));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "jiva-space-api" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/spaces", spaceRoutes);
  app.use("/api/bookings", bookingRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
