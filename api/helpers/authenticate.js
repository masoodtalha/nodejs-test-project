const db = require('./db/connectionHelper');
const {getSignInResponse} = require('./auth');

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
        const signedData = getSignInResponse(data);
        return res({
          status: 200,
          data: signedData,
        });
      });
  });
};
