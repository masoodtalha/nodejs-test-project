const users = require('./users');
const notes = require('./notes')

exports.assignRoutes = function(app) {
  // app.post('/users', users.createUser);

  app.post('/users', users.createUser);
  app.get('/users', users.getUserByEmail);
  app.put('/updateUser', users.updateUserById);
  app.post('/authUser', users.authenticateUser);
  app.post('/note', notes.createNote);
  app.get('/notes', notes.getNotes);
  app.put('/editNote', notes.updateNoteById);
  app.delete('/deleteNote', notes.deleteNoteById);
};
