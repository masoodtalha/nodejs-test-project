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

exports.getModels = function(model) {
 console.log('In CRUD');
 return new Promise((res, rej) => {
       model.find({}, (err, data) => {
        if (err) {
          console.log('---Data fetch failed ' + err);
          return rej({
            status: 400,
            data: 'Data Fetched Failed',
          });
        }
        console.log('+++Data fetched successfully ' + data);
        return res({
          status: 200,
          data,
        });
      });
     });
};

exports.updateModelById = function(model, obj) {
 console.log('In CRUD', obj);
 return new Promise((res, rej) => {
       model.findByIdAndUpdate(obj._id, obj, function(err, updateModel) {
        if (err) {
          return rej({
            status: 400,
            data: 'User Fetched Failed',
          });
        }
        return res({
          status: 200,
          data: 'Data updated successfully',
        });
       });
     });
};

exports.deleteModelById = function(model, obj) {
  console.log('In CRUD', obj);
  return new Promise((res, rej) => {
    model.deleteOne({_id: obj._id}, function(err) {
      if (err) {
        return rej({
          status: 400,
          data: 'User Fetched Failed',
        });
      }
      return res({
        status: 200,
        data: 'Data Deleted successfully',
      });
    });
  });
};
