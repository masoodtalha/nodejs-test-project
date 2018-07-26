const mongoose = require('mongoose');

// Create a Mongoose schema
const GroupSchema = new mongoose.Schema({
  name: String,
  description: String,
});

// Register the schema
const Group = mongoose.model('group', GroupSchema);

exports.Group = Group;
exports.saveGroup = function(groupData) {
  const group = new Group(groupData);
  return new Promise(((resolve, reject) => {
    group.save()
      .then((_group) => {
        console.log('Group saved!');
        resolve(_group);
      })
      .catch((err) => {
        console.log(`Error saving group: ${err}`);
        reject(err);
      });
  }));
};
