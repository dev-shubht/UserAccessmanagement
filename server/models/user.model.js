const prisma = require('../lib/prisma');

const findUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

const createUser = (email, password) => {
  return prisma.user.create({
    data: { email, password },
  });
};

module.exports = { findUserByEmail, createUser };
