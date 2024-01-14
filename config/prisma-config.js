// import { PrismaClient } from '@prisma/client/edge';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;
