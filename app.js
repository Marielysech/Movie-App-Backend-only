const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const passport = require('passport')
const session = require('express-session')

// routes
const moviesRoutes = require('./routes/movies')
const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

// server
const portName = 'localhost';
const port = process.env.PORT || 3000;



dotenv.config();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


//passport
app.use(passport.initialize())


app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 } //1hour
}))

app.use(passport.session())

//app.use(logger('dev'));
//app.use(cookieParser());


mongoose.connect(process.env.DB_SERVER)
.then(() => console.log("Conected to DB server"))
.catch((err) => console.log(err));

// routes
app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes)

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

// //   // render the error page
// //   res.status(err.status || 500);
// //   res.render('error');
// });



//////////////////



app.listen(port, portName, (err) => {
  if (err) console.log(err);
  console.log(`Server running on port ${port}...`);
})

module.exports = app;
