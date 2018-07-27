module.exports = {
  env: 'production',
  jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  db: process.env.DB || 'mongodb://localhost/dharti-api',
  port: process.env.PORT || 4000,
  host: 'https://dharti.pk/',
  mailgunSecret: 'key-fe5fa3946a0f4b6eb19ed6dd02d860a3',
  mailgunDomain: 'sandboxea218cebe16b4e868f62b5265598c535.mailgun.org',
  AZURE_STORAGE_ACCOUNT: 'dhartistorage',
  AZURE_STORAGE_ACCESS_KEY: 'hoPE4dxmI2mxz3RlMf0h7CQPixHwCyXUfLbo1n/W2xJxzu81dgU34mAGuws+P0lzzu1J/NVTFYcsa0nO/RNxfw=='
};
