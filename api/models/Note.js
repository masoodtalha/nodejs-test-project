const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  date: String,
  time: String,
  note: String,
}, {collection: 'Notes'});

exports.Note = mongoose.model('Note', noteSchema);
