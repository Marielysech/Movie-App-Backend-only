const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const initialize = require('../config/passport-config')
const passport = require('passport')


initialize(passport);

async function registerNewUser (req, res) { 

    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({
        message: `Email <${req.body.email}> already taken`,
      });

    } else {
    
    try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    
    const user = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword        
    })
    console.log(user)
    // in the case where we have checkbox to select fav genre when registering
    // const favGenre = [req.body.genre1, req.body.genre2, req.body.genre3, req.body.genre4]
    // for (let i=0; i<genre.length; i++) {
    //     if(genre[i]) user.favGenres.push(genre[i])
    // }
        return res.status(200).json({
            email: user.email,
            name: user.name,
         });
        }catch(error) {
            console.log(error)
    }
 }
}


async function loginUser (req, res, next) {

    passport.authenticate("local", function (err, user) {
        if (err || !user) {
          res.status(401).send("cannot come here");
        } else {
          req.login(user, function (err) {
            if (err) {
              return next(err);
            }
            console.log('user is connected' + user)
            res.status(200).json({
              email: user.email,
              name: user.name
            });
          });
        }
      })(req, res, next);
    };


// TODO
async function logoutUser (req, res) {
    req.logOut()        //also passport function
    res.clearCookie("connect.sid", { path: "/" });

    req.session.destroy(function (err) {
        if (err) {
        return next(err);
        }
        console.log('user is disconnected')
        res.status(200).send("user disconnected");
    });
    
    
}

module.exports = {registerNewUser, loginUser, logoutUser}