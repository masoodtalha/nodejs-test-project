// The schema here can be made better. I mean introducing proper validations.
// Sadly not gonna do it in this test project
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  date: String,
  time: String,
  note: String,
}, {collection: 'Notes'});

exports.Note = mongoose.model('Note', noteSchema);
