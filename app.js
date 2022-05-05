const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const MongoStore = require("connect-mongo");



// routes
const moviesRoutes = require('./routes/movies')
const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

// server
const port = process.env.PORT || 4000
const portName = 'localhost';



dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//passport
app.use(passport.initialize())

const sessionStore = new MongoStore({
  mongoUrl: process.env.DB_SERVER,
  collection: "sessions",
});

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  unset: "destroy",
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: true,
    secure: true
  },
}))

app.use(passport.session())


mongoose.connect(process.env.DB_SERVER)
.then(() => console.log("Connected to DB server"))
.catch((err) => console.log(err));


// routes
app.use('/', express.static('./public'))
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



app.listen(port, portName, (err) => {
  if (err) console.log(err);
  console.log(`Server running on port ${port}...`);
})

module.exports = app;
