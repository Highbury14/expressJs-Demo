var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ExpressJs Demo Pug' });
});

router.get("/mongo-integrations/", function(req, res, next) {
    res.json({ message: "Welcome to Bezkoder applications !" });
});

module.exports = router;
