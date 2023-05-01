const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const userInfo = {
    username: user.username,
    credit: user.credit,
    cash: user.cash,
    id: user._id
  };
  
  
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: userInfo
    });
};

export default sendTokenResponse;

  // Get token from model, create cookie and send response
// const sendTokenResponse = (user, statusCode, res) => {
//   // Create token
//   const token = user.signJwtToken();

//   const options = {
//     expires: new Date(
//       // Convert to 30 days in milliseconds
//       Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   // Send secure cookie in production
//   if (process.env.NODE_ENV === 'production') {
//     options.secure = true;
//   }

//   res
//     .status(statusCode)
//     .cookie('token', token, options)
//     .json({
//       success: true,
//       token,
//     });
// };

// export default sendTokenResponse;