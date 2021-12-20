const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongodburl: "mongodb://localhost:27017/express_js_demo",
  mongoDbCloudUrl: process.env.MongoDbCloud_Url,
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "express_js_demo",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
