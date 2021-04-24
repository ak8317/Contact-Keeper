const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  //get token from header

  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    return next(new ErrorResponse('Not Authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorResponse('Not Authorized to access this route', 401));
  }
};
