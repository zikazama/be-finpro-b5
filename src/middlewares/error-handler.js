const errorHandler = (err, req, res, next) => {
  try {
    next();
  } catch (error) {
    console.error("Error occurred while handling error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = errorHandler;
