const jwt = require('jsonwebtoken');
const config = require('../../config/env');

exports.getSignInResponse = function(user) {
  const token = jwt.sign({
    email: user.email,
    name: user.firstName,
    _id: user._id,
  }, config.jwtSecret);
  return {
    token,
    email: user.username,
    _id: user._id,
    name: user.firstName,
  };
};
