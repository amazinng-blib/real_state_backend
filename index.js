const express = require('express');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const userRoutes = require('./routes/user-routes');
const residencyRoute = require('./routes/residency-route');

app.use('/api/user', userRoutes);
app.use('/api/residency', residencyRoute);

app.listen(PORT, () => {
  console.log(`App listening on port : ${PORT}`);
});

// // import { PrismaClient } from '@prisma/client/edge';
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// module.exports = prisma;
