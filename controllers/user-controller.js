const expressAsyncHandler = require('express-async-handler');
const prisma = require('../config/prisma-config');

const createUser = expressAsyncHandler(async (req, res) => {
  console.log('creating User');
  let { email } = req?.body;

  try {
    const userExist = await prisma.user.findUnique({ where: { email: email } });

    if (!userExist) {
      const user = await prisma.user.create({ data: req.body });
      return res.status(201).json({
        message: ' User registered successfully',
        user: user,
      });
    } else {
      return res.status(200).json({ message: 'User Already exist' });
    }
  } catch (error) {
    res.status(500).json(error.mesage);
  }
});
/**
 * BOOK VISIT
 */

const bookVisit = expressAsyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      return res
        .status(400)
        .json({ message: 'This residency is already booked by you' });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      return res
        .status(200)
        .json({ message: 'Your Visit is booked successfully' });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

/**
 * GET ALL BOOKINGS
 */

const getAllBookings = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (!bookVisit) {
      return res.status(404).json({
        message:
          'No Active Bookings Found, but relax, we get you covered. Kindly go to booking section and book your visit',
      });
    }
    return res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

/**
 * CANCEL BOOKINGS
 */

const cancelBooking = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Booking Not Found' });
    }

    user.bookedVisits.splice(index, 1);
    await prisma.user.update({
      where: { email },
      data: {
        bookedVisits: user.bookedVisits,
      },
    });

    return res.status(200).json({ mesage: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

/**
 * ADD AND REMOVE RESIDENCY TO USER FAVORITE LIST
 */

const addAndRemoveFavoriteResidency = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const { residencyId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(residencyId)) {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter(
              (id) => id.toString() !== residencyId
            ),
          },
        },
      });
      return res
        .status(200)
        .json({ message: 'Removed residency from favorite list', updatedUser });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        favResidenciesID: {
          push: residencyId,
        },
      },
    });

    return res
      .status(200)
      .json({ message: 'Added to favorite residency', updatedUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

/**
 * GET ALL FAVORITE RESIDENCIES
 */

const getAllfavorites = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const favoriteResidencies = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });

    return res.status(200).json(favoriteResidencies);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = {
  createUser,
  bookVisit,
  getAllBookings,
  cancelBooking,
  addAndRemoveFavoriteResidency,
  getAllfavorites,
};
