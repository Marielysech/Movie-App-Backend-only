const express = require('express');
const app = express();

// const passport = require('passeport')

const userModel = require('../models/User')
const movieModel = require('../models/Movie');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




async function getAllMoviesUser (req, res) {
    try {
    let favUserGenres = req.user.favGenres // this is an array
    if (favUserGenres.length>0) {
        let allMoviesFromFavGenres = await favUserGenres.map(elem => movieModel.find({category : elem}))
        return res.json({allTheMoviesFromFavGenres });
    }   const allTheMovies = await movieModel.find();
        return res.json({allTheMovies });
    } catch (err) {
        console.log(err)
        }
    };
    
async function getMoreInfo (req, res) {
    try {
        const movie = await movieModel.findOne({title: req.params.movie });
            return res.json({ movie });
        } catch (err) {
            console.log(err)
            }
}

async function getMoviesByRating (req, res) {
    try {

    const moviesByRating = await movieModel.find().sort({'rating': -1});
  
    return res.json({moviesByRating });
    } catch (err) {
        console.log(err)
        }
    };


//TODO RATE MOVIE
// async function rateMovie (req, res) {
//     try {
//         // get a movie and change rating //
    
// } catch (err) {
//     console.log(err)
// }
// };


async function getFavorites (req, res) {
    try {
        let userID = req.user._id;
        const user = await userModel.findOne({_id: userID}).populate('favMovies');
        console.log(user)
        const favUserMovies = user.favMovies
        console.log(favUserMovies)
        if (favUserMovies.length >0 ) {
            return res.json({favUserMovies});
        } else res.send('You have not favorites yet !')
    
    } catch (err) {
        console.log(err)
        }
    };

// async function addToFavorites (req, res) {
//     try {
    
//     await userModel.updateOne({name: req.params.name},{$push: { favMovies: movieModel._id}});
//     const favUserMovies = await userModel.findOne({name: req.params.name},{favMovies: 1}).populate('favMovies');
//     res.send(favUserMovies);
//     } catch (err) {
//         console.log(err)
//         }
//     };

async function toggleFavorites (req, res) {
    try {
    let userId = req.user._id;
    let movie = await movieModel.findOne({title: req.params.movie})
    let favmovie = await userModel.findOne({favMovies : movie._id})
    console.log(favmovie)
    if(favmovie) {
        await userModel.updateOne({_id: userId}, { $pull: { favMovies: movie._id }})
        console.log(req.params.movie + 'removed from fav')
        return res.status(200)
    }
        await userModel.updateOne({_id: userId}, { $push: { favMovies: movie._id }})
        console.log(req.params.movie + 'added to fav' )
        console.log(req.user)
        return res.status(200).json({
              title: req.params.movie ,
              id: movie._id,
            });
    } catch (err) {
        console.log(err)
        }
    }
    



async function getMovieByFilter (req,res) {
    try {
        const filter = req.params.filter
        if (isNaN(filter)) {
            const filterCapital = firstLetterUpperCase(filter)
            let result = await movieModel.find({category: filterCapital}) 
            
                if (result.length > 0) {
                   // return res.render('indexAuth.ejs', {movies : result, filter : filter });
                   return res.json({result});
                } const filteredMovie = await movieModel.find({title: {$regex: filterCapital }});
                return res.json({filteredMovie });
                //   return res.send(filteredMovie);
        } else if (filter < 11) {
            const filteredMovie = await movieModel.find({rating: {$gte: filter}});
            //return res.render('indexAuth.ejs', {movies : filteredMovie, filter : filter });
            return res.json({filteredMovie });
        } const filteredMovie = await movieModel.find({year: filter})
            //return res.render('indexAuth.ejs', {movies : filteredMovie, filter : filter });
            return res.json({filteredMovie });
            // return res.send(filteredMovie);
    } catch (err) {
        console.log(err)
    }
};   



module.exports = {getAllMoviesUser, getMoviesByRating, getFavorites, toggleFavorites, getMovieByFilter, getMoreInfo }

function firstLetterUpperCase(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }

async function accessDB() {
    let user = await userModel.find({})
    console.log('THIS IS USERS' + user)    
}
