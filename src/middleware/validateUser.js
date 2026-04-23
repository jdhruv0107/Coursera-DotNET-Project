function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUserPayload(req, res, next) {
  const { name, email, age } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      error: "ValidationError",
      message: "name must be a string with at least 2 characters"
    });
  }

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({
      error: "ValidationError",
      message: "email must be a valid email address"
    });
  }

  if (
    age === undefined ||
    typeof age !== "number" ||
    !Number.isInteger(age) ||
    age < 0 ||
    age > 130
  ) {
    return res.status(400).json({
      error: "ValidationError",
      message: "age must be an integer between 0 and 130"
    });
  }

  return next();
}

module.exports = validateUserPayload;
