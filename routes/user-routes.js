const userRoutes = require('express').Router();
const jwtCheck = require('../config/auth0-config');
const {
  createUser,
  bookVisit,
  getAllBookings,
  cancelBooking,
  addAndRemoveFavoriteResidency,
  getAllfavorites,
} = require('../controllers/user-controller');

userRoutes.post('/register', createUser);
userRoutes.post('/bookVisit/:id', bookVisit);
userRoutes.post('/allBookings', getAllBookings);
userRoutes.post('/removeBooking/:id', cancelBooking);
userRoutes.post(
  '/addRemoveFavoriteResidency/:residencyId',
  addAndRemoveFavoriteResidency
);
userRoutes.post('/allFavorites', getAllfavorites);

module.exports = userRoutes;
