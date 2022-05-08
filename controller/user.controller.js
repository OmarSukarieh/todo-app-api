const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");

const Todo = require("../model/Todo");
const User = require("../model/User");

const configApp = require('../config')

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      new ErrorResponse("Please Provide a username and password", 422)
    );
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (configApp.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
  });
})