const mongoose = require("mongoose");

// 404 for unknown routes
const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

// Central error handler
const errorHandler = (err, req, res, next) => {
  // Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: errors.join(", "), errors });
  }

  // Invalid ObjectId
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: "Invalid contact ID" });
  }

  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong on the server",
  });
};

module.exports = { notFound, errorHandler };
