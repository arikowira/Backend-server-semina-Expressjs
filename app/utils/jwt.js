const jwt = require('jsonwebtoken');
const {
  jwtSecret,
  jwtExpiration,
  jwtExpirationRefreshToken,
  jwtSecretRefreshToken,
} = require('../config');

//token
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

//refresh token
const createRefreshJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecretRefreshToken, {
    expiresIn: jwtExpirationRefreshToken,
  });
  return token;
};

const isRefreshTokenValid = ({ token }) =>
  jwt.verify(token, jwtSecretRefreshToken);

module.exports = {
  createJWT,
  isTokenValid,
  createRefreshJWT,
  isRefreshTokenValid,
};
