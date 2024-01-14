const { auth } = require('express-oauth2-jwt-bearer');

// const jwtCheck = auth({
//   audience: 'http://localhost:8000',
//   issuerBaseURL: 'https://dev-tyma42jam5zi8k52.us.auth0.com',
//   issuer: 'https://dev-tyma42jam5zi8k52.us.auth0.com', // Uncomment if needed
//   tokenSigningAlg: 'RS256',
//   // secret: '2K4mgieH3QYf8Iv3FJEQf95N2GVM6aH6',
// });

const jwtCheck = auth({
  audience: 'http://localhost:8000',
  issuerBaseURL: 'https://dev-tyma42jam5zi8k52.us.auth0.com/',
  tokenSigningAlg: 'RS256',
  issuer: 'https://dev-tyma42jam5zi8k52.us.auth0.com/',
});

module.exports = jwtCheck;
