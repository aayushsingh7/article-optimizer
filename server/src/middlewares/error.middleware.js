const globalErrorHandler = (err, req, res, next) => {
  console.error(err); // optional
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default globalErrorHandler;