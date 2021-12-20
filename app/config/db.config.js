module.exports = {
  mongodburl: "mongodb://localhost:27017/express_js_demo",
  mongoDbCloudUrl: "mongodb+srv://m001-student:m001-mongodb-basics@cluster0-mysandbox.bm6p3.mongodb.net/express_js_demo",
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
