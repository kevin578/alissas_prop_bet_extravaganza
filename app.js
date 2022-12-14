const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { dataSource } = require("./db/data-source");
const users_controller = require('./controllers/users_controller')

require('dotenv').config()

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_KEY));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users_controller);

// check if user is logged in
app.use(async (req, res, next)=> {
  if (req.signedCookies && req.signedCookies.alissapropbet_session) {
    const email = req.signedCookies.alissapropbet_session;
    const userRepository = dataSource.getRepository("User")
    const currentUser = await userRepository.findOne({
      where: { email: email }
    })
    req.currentUser = currentUser
  };
  next();
})

app.get('/', (req, res)=> {
  const email = req.currentUser? req.currentUser.email : '';
  res.render('index', {email})
});

// establish database connection
dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

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
