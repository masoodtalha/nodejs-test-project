const db = require('../db/connectionHelper');

exports.createModel = function(model) {
 return new Promise((res, rej) => {
       model.save((err, data) => {
         if (err) {
           return rej({
             status: 400,
             data: 'User Creation Failed',
           });
         } else {
           return res({
             status: 200,
             data: 'User Created successfully',
           });
         }
       });
     });
};

exports.getModelById = function(model, parameter, value) {
 return new Promise((res, rej) => {
       const search = {};
       search[parameter] = JSON.parse(value);
       model.findOne({...search}, (err, data) => {
        if (err) {
          return rej({
            status: 400,
            data: 'User Fetched Failed',
          });
        }
        return res({
          status: 200,
          data,
        });
      });
     });
};

exports.getModels = function(model) {
 return new Promise((res, rej) => {
       model.find({}, (err, data) => {
        if (err) {
          return rej({
            status: 400,
            data: 'Data Fetched Failed',
          });
        }
        return res({
          status: 200,
          data,
        });
      });
     });
};

exports.updateModelById = function(model, obj) {
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
