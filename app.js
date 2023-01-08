var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var MenuPageRouter = require('./routes/MenuPage');
var CreateNewMoviePageRouter = require('./routes/CreateNewMoviePage');
var SearchMoviePageRouter = require('./routes/SearchMoviePage');
var SearchResultPageRouter = require('./routes/SearchResultPage');
var MoviePageRouter = require('./routes/MoviePage');
var EditUsersRouter = require('./routes/EditUsers');
var UserManagementPageRouter = require('./routes/UserManagementPage');
require('./configs/database');



var app = express();
app.use(session({secret: 'mySecret',
resave: false,
saveUninitialized: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/MenuPage', MenuPageRouter);
app.use('/CreateNewMoviePage', CreateNewMoviePageRouter);
app.use('/SearchMoviePage', SearchMoviePageRouter);
app.use('/SearchResultPage', SearchResultPageRouter);
app.use('/MoviePage', MoviePageRouter);
app.use('/EditUsers', EditUsersRouter);
app.use('/UserManagementPage', UserManagementPageRouter);





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
