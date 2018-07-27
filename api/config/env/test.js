module.exports = {
  env: 'test',
  jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  db: process.env.DB || 'mongodb://localhost/dharti-api-test',
  port: process.env.PORT || 4000,
};
