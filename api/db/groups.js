/**
 * Created by siroramirez on 23/05/17.
 */

const dbHelper = require('../helpers/db/connectionHelper');
const mongoose = require('mongoose');

// database connect
const db = dbHelper.getDBConnection();

// Create a Mongoose schema
const GroupSchema = new mongoose.Schema({
    name: String,
    description: String
});

// Register the schema
const Group = mongoose.model('group', GroupSchema);

exports.Group = Group;
exports.saveGroup = function(groupData) {
    const group = new Group(groupData);
    return new Promise(function(resolve, reject) {
        group.save()
            .then(group => {
                console.log("Group saved!");
                resolve(group);
            })
            .catch(err => {
                console.log("Error saving group: " + err);
                reject(err);
            })
    })
}
