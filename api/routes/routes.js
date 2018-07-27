const users = require('./users');
const notes = require('./notes');
const jwt = require('express-jwt');
const config = require('../config/env');

exports.assignRoutes = function(app) {
  app.post('/users', users.createUser);

  app.get('/users', users.getUserByEmail);

  app.put('/updateUser', jwt({
      secret: config.jwtSecret
    }), function (req, res) {
      if (!req.user) return res.sendStatus(401);
      users.updateUserById(req, res)
    });

  app.post('/authUser', users.authenticateUser);

  app.post('/note', jwt({
      secret: config.jwtSecret
    }), function (req, res) {
      if (!req.user) return res.sendStatus(401);
      notes.createNote(req,res)
    });

  app.get('/notes', jwt({
      secret: config.jwtSecret
    }), function (req, res) {
      if (!req.user) {return res.sendStatus(401)};
      notes.getNotes(req, res)
    });

  app.put('/editNote', jwt({
      secret: config.jwtSecret
    }), function (req, res) {
      if (!req.user) return res.sendStatus(401);
      notes.updateNoteById(req, res)
    });

  app.delete('/deleteNote', jwt({
      secret: config.jwtSecret
    }), function (req, res) {
      if (!req.user) return res.sendStatus(401);
      notes.deleteNoteById(req, res)
    });
};
