const note = require('../controllers/noteController');

exports.createNote = async function(req, res, next) {
  const groupData = req;

  const response = await note.createNote(groupData);
  console.log('%%% Got Data', response);
  res.send(response);
};

exports.getNotes = async function(req, res, next) {
  const groupData = req;

  const response = await note.getNotes(groupData);
  console.log('%%% Got Data', response);
  res.send(response);
};

exports.updateNoteById = async function(req, res, next) {
  const groupData = req;

  const response = await note.updateNoteById(groupData);
  console.log('%%% Got Data', response);
  res.send(response);
};

exports.deleteNoteById = async function(req, res, next) {
  const groupData = req;

  const response = await note.deleteNoteById(groupData);
  console.log('%%% Got Data', response);
  res.send(response);
};

