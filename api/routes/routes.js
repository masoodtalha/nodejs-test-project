const users = require('./users');

exports.assignRoutes = function(app) {
  // app.post('/users', users.createUser);

  app.post('/users', users.createUser);
  app.get('/users', users.getUserByEmail);
  app.put('/updateUser', users.updateUserById);
  app.post('/authUser', users.authenticateUser);
};
