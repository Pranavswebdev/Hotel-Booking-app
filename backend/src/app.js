import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import spaceRoutes from "./routes/space.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import userRoutes from "./routes/user.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: config.clientUrl, credentials: true }));
  app.use(express.json());
  if (config.nodeEnv !== "test") app.use(morgan("dev"));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "jiva-space-api" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/spaces", spaceRoutes);
  app.use("/api/bookings", bookingRoutes);
  app.use("/api/users", userRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
