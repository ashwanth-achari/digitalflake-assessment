const errorMiddleware = (err, req, res, next) => {
  console.error("Error from backend:", err);

  // If response already started, let Express handle it
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = err.message || "Backend Error";
  const extraDetails = err.extraDetails || "Error from backend";

  return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;
