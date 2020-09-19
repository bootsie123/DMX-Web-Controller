module.exports = (res, status, message, errors) => {
  if (!message) {
    message = status;
    status = 500;
  }

  return res.status(status).json({
    error: {
      status,
      message,
      errors
    }
  });
}
