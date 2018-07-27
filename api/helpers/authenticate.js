const db = require('./db/connectionHelper');

exports.authenticateUser = function(model, username, password) {
  return new Promise((res, rej) => {
    const user = {
      email: username,
      password: password,
    };
    console.log('Authenticating: ', user);
    model.findOne({...user}, (err, data) => {
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
