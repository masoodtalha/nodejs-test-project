// const users = require('./users');
const groups = require('./groups');

exports.assignRoutes = function(app) {
  // app.post('/users', users.createUser);

  app.post('/groups', groups.createGroup);
};
