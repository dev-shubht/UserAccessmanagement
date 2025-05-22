const { DataSource } = require("typeorm");
require('dotenv').config();
console.log('-----------------------------------------------------------------------', process.env.DATABASE_URL);

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: require("../entities"),
}); 

module.exports = { AppDataSource };
