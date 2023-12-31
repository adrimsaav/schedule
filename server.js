var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const cors = require('cors');
const flash = require('connect-flash');

require('dotenv').config();
require('./config/db');
require('./config/passport');

var indexRouter = require('./routes/index');
var apptsRouter = require('./routes/appts');
var scheduleRouter = require('./routes/schedule');

var app = express();

app.listen(3000, function() {
  console.log("Server is running on port " + 3000);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.GOOGLE_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});


app.get('/contact', (req, res) => {
	res.send(req.flash('message'));
});

app.use('/', indexRouter);
app.use('/appts', apptsRouter);
app.use('/schedule', scheduleRouter);

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
