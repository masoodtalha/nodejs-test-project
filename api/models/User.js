// The schema here can be made better. I mean introducing proper validations.
// Sadly not gonna do it in this test project
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
}, {collection: 'Users'});

exports.User = mongoose.model('User', userSchema);
