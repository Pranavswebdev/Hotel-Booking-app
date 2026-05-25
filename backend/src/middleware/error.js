export function notFound(req, res, _next) {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
}

export function errorHandler(err, req, res, _next) {
  const status = err.statusCode || 500;
  const payload = { message: err.message || "Internal server error" };
  if (err.errors) payload.errors = err.errors;
  if (status === 500) console.error(err);
  res.status(status).json(payload);
}

export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
