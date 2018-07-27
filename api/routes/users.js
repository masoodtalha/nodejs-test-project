const user = require('../controllers/userController');

exports.createUser = async function(req, res, next) {
  const groupData = req;
  const response = await user.createUser(groupData);
  res.send(response);
};

exports.getUserByEmail = async function(req, res, next) {
  const groupData = req;
  const response = await user.getUserByEmail(groupData);
  res.send(response);
};

exports.updateUserById = async function(req, res, next) {
  const groupData = req;
  const response = await user.updateUserById(groupData);
  res.send(response);
};

exports.authenticateUser = async function(req, res, next) {
  const groupData = req;
  const response = await user.authenticateUser(groupData);
  res.send(response);
};
