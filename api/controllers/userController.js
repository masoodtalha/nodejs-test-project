const users = require('../helpers/crud/');
const {User} = require('../models/User');
const auth = require('../helpers/authenticate');

exports.createUser = async function(req, res, next) {
  const reqData = req.body;
  if (reqData.firstName && reqData.lastName && reqData.email && reqData.password) {
    const UserObj = new User({...reqData});
    const respData = await users.createModel(UserObj);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};

exports.getUserByEmail = async function(req, res, next) {
  const reqData = req.query;
  if (reqData.email) {
    const respData = await users.getModelById(User, 'email', reqData.email);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};

exports.updateUserById = async function(req, res, next) {
  const reqData = req.body;
  if (reqData._id && reqData.field && reqData.value) {
    const respData = await users.updateModelById(User, reqData.field, reqData.value, reqData._id);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};

exports.authenticateUser = async function(req, res, next) {
  const reqData = req.body;
  if (reqData.email && reqData.password) {
    const respData = await auth.authenticateUser(User, reqData.email, reqData.password);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};
