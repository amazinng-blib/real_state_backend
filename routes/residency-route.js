const {
  createResidency,
  getAllResidencies,
  getResidency,
} = require('../controllers/residency-controller');

const residencyRoute = require('express').Router();

residencyRoute.post('/create', createResidency);
residencyRoute.get('/allresidencies', getAllResidencies);
residencyRoute.get('/:id', getResidency);
module.exports = residencyRoute;
