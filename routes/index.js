var express = require('express');
const app = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ExpressJs Demo Pug' });
});

router.get("/mongoDb-integrations/", function(req, res, next) {
    res.json({ message: "Welcome to the ExpressJs application !" });
});

router.get("/api/dbStatus/", function(req, res, next) {
  res.send({
    mongoDbStatus: req.app.locals.mongoDbStatus,
    mysqlDbStatus: req.app.locals.mysqlDbStatus
   });
});
module.exports = router;
