const notes = require('../helpers/crud/');
const {Note} = require('../models/Note');

exports.createNote = async function(req, res, next) {
  console.log('#### Data in controller', req.body);
  const reqData = req.body;
  if (reqData.date && reqData.time && reqData.note) {
    console.log('Data is Legit');
    const NoteObj = new Note({...reqData});

    const respData = await notes.createModel(NoteObj);
    console.log('+++ Got Data: ', respData);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};

exports.getNotes = async function(req, res, next) {
  console.log('#### Data in controller', req.query);
    console.log('Data is Legit');

    const respData = await notes.getModels(Note);
    console.log('+++ Got Data: ', respData);
    return respData;
};

exports.updateNoteById = async function(req, res, next) {
  console.log('#### Data in controller', req.body);
  const reqData = req.body;
  if (reqData.obj) {
    console.log('Data is Legit');

    const respData = await notes.updateModelById(Note, reqData.obj);
    console.log('+++ Got Data: ', respData);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};

exports.deleteNoteById = async function(req, res, next) {
  console.log('#### Data in controller', req.body);
  const reqData = req.body;
  if (reqData.obj) {
    console.log('Data is Legit');

    const respData = await notes.deleteModelById(Note, reqData.obj);
    console.log('+++ Got Data: ', respData);
    return respData;
  } else {
    return {
      status: 404,
      data: 'Problem with Parameters',
    };
  }
};

