var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouterMongoDb = require('./routes/apiMongoDb');
var apiRouterSqlDb = require('./routes/apiSqlDb');

var app = express();
var db = require("./app/models");

var corsOptions = {
  origin: "http://localhost:8081"
};
app.locals.mongoDbStatus = true;
app.locals.mysqlDbStatus = true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

db.mongodb.mongoose.connect(db.mongodb.cloudUrl, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => { console.log("Connected to the mongodb-database."); })
.catch((err, app) => {
  console.log("Cannot connect to the mongodb-database !", err);
  app.locals.mongoDbStatus = false;
  // process.exit();
});

db.sqldb.sequelize.sync().then(() => {
  console.log("Connected to the sql-database.");
}).catch((err, app) => {
  console.log("Cannot connect to the sql-database !", err);
  app.locals.mysqlDbStatus = false;
  // process.exit();
});

if (app.locals.mongoDbStatus) {
  app.use('/api/mongoDb', apiRouterMongoDb);
}
if (app.locals.mysqlDbStatus) {
  app.use('/api/sqlDb', apiRouterSqlDb);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
