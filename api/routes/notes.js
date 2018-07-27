const note = require('../controllers/noteController');

exports.createNote = async function(req, res, next) {
  const groupData = req;
  const response = await note.createNote(groupData);
  res.send(response);
};

exports.getNotes = async function(req, res, next) {
  const groupData = req;
  const response = await note.getNotes(groupData);
  res.send(response);
};

exports.updateNoteById = async function(req, res, next) {
  const groupData = req;
  const response = await note.updateNoteById(groupData);
  res.send(response);
};

exports.deleteNoteById = async function(req, res, next) {
  const groupData = req;
  const response = await note.deleteNoteById(groupData);
  res.send(response);
};
