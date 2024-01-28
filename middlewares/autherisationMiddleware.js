const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

const protect = async (req, res, next) => {
  let token;

  // Check for the authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Get token from header
    token = req.headers.authorization.split(" ")[1];
  }

  // Check if token exists
  if (!token) {
    return next(new errorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = JWT.verify(token, process.env.JWT_ACCESS_SECRET);

    // Find the user associated with the decoded token
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new errorResponse("Not authorized to access this route", 401));
  }
};

module.exports = protect;
