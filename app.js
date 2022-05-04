const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')


// routes
const moviesRoutes = require('./routes/movies')
const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

// server
const portName = 'localhost';
const port = process.env.PORT || 4000;



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
app.get('/', function(req,res) {return res.redirect('/movies')})
app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes)

/**
 * ========== CORS SETUP ==========
 */

 app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    credentials: true,
    allowedHeaders: ["Origin, X-Requested-With, Content-Type, Accept"],
  })
);
app.set("trust proxy", 1);

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
