import { createApp } from "../src/app.js";
import { connectDB } from "../src/config/db.js";

const app = createApp();
let ready = null;

// Vercel serverless handler: ensure a single DB connection is reused across
// warm invocations before delegating to the Express app.
export default async function handler(req, res) {
  if (!ready) ready = connectDB();
  await ready;
  return app(req, res);
}
