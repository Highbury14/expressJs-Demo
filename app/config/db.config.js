module.exports = {
  mongodburl: "mongodb://localhost:27017/expressJsDemo/",
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "expressJsDemo",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
