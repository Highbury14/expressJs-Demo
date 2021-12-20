const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {mongodb: {}, sqldb: {}};
db.mongodb.mongoose = mongoose;
db.mongodb.url = dbConfig.mongodburl;
db.mongodb.cloudUrl = dbConfig.mongoDbCloudUrl;
db.mongodb.product = require("./product.mongodb.js")(mongoose);

db.sqldb.Sequelize = Sequelize;
db.sqldb.sequelize = sequelize;
db.sqldb.product = require("./product.mysql.js")(sequelize, Sequelize);

module.exports = db;
