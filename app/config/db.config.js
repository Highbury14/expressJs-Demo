module.exports = {
  mongodburl: "mongodb://localhost:27017/",
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};