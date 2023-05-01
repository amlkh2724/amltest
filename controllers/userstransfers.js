import asyncHandler from "../middleware/errorHandler.js";
import sendTokenResponse from "../utils/sendTokenResponse.js";
import User from "../models/addUsers.js";
// import Cash from "../models/userCash.js";

// export const addUser = asyncHandler(async (req, res) => {
//   const { username, password, cash, credit } = req.body;

//   // Create a new Cash document with the provided cash and credit values
//   // Create a new user
//   const newUser = await User.create({ username, password});
//   const newUser2 = await Cash.create({ credit, cash});
//   sendTokenResponse(newUser, 200, res);
// });

export const addUser = asyncHandler(async (req, res) => {
  const { username, password, cash, credit } = req.body;

  // Create a new user
  const newUser = await User.create({ username, password ,credit,cash});

  // Create a new Cash document with the provided cash and credit values

  sendTokenResponse(newUser, 200, res);
});
// export const addUser = asyncHandler(async (req, res) => {
//   const { username, password, cash, credit } = req.body;

//   // Create a new user
//   const newUser = await User.create({ username, password });

//   // Create a new Cash document with the provided cash and credit values
//   const newCash = await Cash.create({ credit, cash, user: newUser._id });

//   // Populate the user information with the newly created Cash document
//   await newUser.populate('userInformation').execPopulate();

//   sendTokenResponse(newUser, 200, res);
// });

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // Validate email and password
  if (!username || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    // Important to return the same error message so no one can know the reason for login failure
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Send token to client
  sendTokenResponse(user, 200, res);
});