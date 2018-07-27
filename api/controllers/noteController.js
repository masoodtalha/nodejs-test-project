const notes = require('../helpers/crud/');
const {Note} = require('../models/Note');

exports.createNote = async function(req, res, next) {
  const reqData = req.body;
  if (reqData.date && reqData.time && reqData.note) {
    const NoteObj = new Note({...reqData});
    const respData = await notes.createModel(NoteObj);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};

exports.getNotes = async function(req, res, next) {
    const respData = await notes.getModels(Note);
    return respData;
};

exports.updateNoteById = async function(req, res, next) {
  const reqData = req.body;
  if (reqData.obj) {
    const respData = await notes.updateModelById(Note, reqData.obj);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};

exports.deleteNoteById = async function(req, res, next) {
  const reqData = req.body;
  if (reqData.obj) {
    const respData = await notes.deleteModelById(Note, reqData.obj);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};
