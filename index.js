var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('express-flash');
const partials = require('express-partials');
const sessions = require('express-session');
const bodyParser = require('body-parser');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret:
      'asfagagsgsgdrasrtategaetga96478978844987895649798489afa498sf478974f89af89f98',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);
// view engine setup

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ limit: '110mb', extended: false }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.locals.user = req?.session?.user;
  next();
});
require('./app/routes/auth-route')(app);

app.use(partials());

require('./app/routes/global-route')(app);

//

app.get('*', function (req, res) {
  res.status(404).send('404 Not found');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
