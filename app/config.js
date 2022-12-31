const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpirationRefreshToken: process.env.JWT_EXPIRATION_REFRESH_TOKEN,
  jwtSecretRefreshToken: process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
  serverEmail: process.env.SERVER_EMAIL,
  password: process.env.PASSWORD,
};
