const expressAsyncHandler = require('express-async-handler');
// import { Prisma } from '@prisma/client';
const prisma = require('../config/prisma-config');

const createResidency = expressAsyncHandler(async (req, res) => {
  console.log('creating residency');
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    return res
      .status(201)
      .json({ message: 'Residency created successfully', residency });
  } catch (error) {
    // if (error.code === 'P2002') {
    //   throw new Error('A residency with this address already exist');
    // }

    // throw new Error(error.message);
    if (error.code === 'P2002') {
      return res
        .status(404)
        .json({ message: 'Residency with this address already exist' });
    }

    return res.status(500).json(error.message);
  }
});

/**
 * GET ALL RESIDENCIES
 */

const getAllResidencies = expressAsyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return res.status(200).json(residencies);
});

/**
 * GET SINGLE OR SPECIFIC RESIDENCY
 */
const getResidency = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({ where: { id } });

    if (!residency) {
      return res.status(404).json({ message: 'No Residency Found' });
    }

    return res.status(200).json(residency);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = { createResidency, getAllResidencies, getResidency };
