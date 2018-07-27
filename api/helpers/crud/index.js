const db = require('../db/connectionHelper');

exports.createModel = function(model) {
 console.log('In CRUD', model);
 return new Promise((res, rej) => {
       model.save((err, data) => {
         if (err) {
           console.log('---User save failed ' + err);
           return rej({
             status: 400,
             data: 'User Creation Failed',
           });
         } else {
           console.log('---User saved Successfully ');
           return res({
             status: 200,
             data: 'User Created successfully',
           });
         }
       });
     });
};

exports.getModelById = function(model, parameter, value) {
 console.log('In CRUD', parameter, value);
 return new Promise((res, rej) => {
       const search = {};
       search[parameter] = JSON.parse(value);
       console.log('Searching : ', search);
       model.findOne({...search}, (err, data) => {
        if (err) {
          console.log('---User fetch failed ' + err);
          return rej({
            status: 400,
            data: 'User Fetched Failed',
          });
        }
        console.log('+++User fetched successfully ' + data);
        return res({
          status: 200,
          data,
        });
      });
     });
};

exports.updateModelById = function(model, parameter, value, _id) {
 console.log('In CRUD', parameter, value, _id);
 return new Promise((res, rej) => {
       const search = {};
       search[parameter] = JSON.parse(value);
       console.log('Searching : ', search);
       model.findById(_id, function(err, updateModel) {
        if (err) {
          return rej({
            status: 400,
            data: 'User Fetched Failed',
          });
        }
        updateModel[parameter] = value;
        updateModel.save((err, data) => {
          if (err) {
            console.log('---User updation failed ' + err);
            return rej({
              status: 400,
              data: 'User Updation Failed',
            });
          } else {
            console.log('---User updated Successfully ');
            return res({
              status: 200,
              data: 'User updated successfully',
            });
          }
        });
       });
     });
};

