
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  console.log(`Running query: ${params.model}.${params.action}`);
  const result = await next(params);
  return result;
});

module.exports = prisma;
