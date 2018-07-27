const users = require('../helpers/crud/');
const {User} = require('../models/User');
const auth = require('../helpers/authenticate');

exports.createUser = async function(req, res, next) {
  console.log('#### Data in controller', req.body);
  const reqData = req.body;
  if (reqData.firstName && reqData.lastName && reqData.email && reqData.password) {
    console.log('Data is Legit');
    const UserObj = new User({...reqData});

    const respData = await users.createModel(UserObj);
    console.log('+++ Got Data: ', respData);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};

exports.getUserByEmail = async function(req, res, next) {
  console.log('#### Data in controller', req.query);
  const reqData = req.query;
  if (reqData.email) {
    console.log('Data is Legit');

    const respData = await users.getModelById(User, 'email', reqData.email);
    console.log('+++ Got Data: ', respData);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};

exports.updateUserById = async function(req, res, next) {
  console.log('#### Data in controller', req.query);
  const reqData = req.body;
  if (reqData._id && reqData.field && reqData.value) {
    console.log('Data is Legit');

    const respData = await users.updateModelById(User, reqData.field, reqData.value, reqData._id);
    console.log('+++ Got Data: ', respData);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};

exports.authenticateUser = async function(req, res, next) {
  console.log('#### Data in controller', req.body);
  const reqData = req.body;
  if (reqData.email && reqData.password) {
    console.log('Data is Legit');

    const respData = await auth.authenticateUser(User, reqData.email, reqData.password);
    console.log('+++ Got Data: ', respData);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};

