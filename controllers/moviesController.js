const movieModel = require('../models/Movie');


const getAllTheMovies = async (req, res) => {
    try {
        const allTheMovies = await movieModel.find();
        console.log(allTheMovies)
        // return res.send(allTheMovies)
        return res.render('indexNoAuth.ejs', {movies : allTheMovies });
    } catch (err) {
        console.log(err)
        }
    };

async function getMovieByFilter (req,res) {
    try {
       const filter = req.params.filter
       if (isNaN(filter)) {
            const filterCapital = firstLetterUpperCase(filter)
            let result = await movieModel.find({category: filterCapital}) 
            console.log(result)
                if (result.length > 0) {
                    return res.render('indexNoAuth.ejs', {movies : result, filter : filter });
                    // return res.send(result);
                } const filteredMovie = await movieModel.find({title: {$regex: filterCapital }});
                return res.render('indexNoAuth.ejs', {movies : filteredMovie, filter : filter });
                //   return res.send(filteredMovie);
        } else if (filter < 11) {
            const filteredMovie = await movieModel.find({rating: {$gte: filter}});
            return res.render('indexNoAuth.ejs', {movies : filteredMovie, filter : filter });
            // return res.send(filteredMovie);
        } const filteredMovie = await movieModel.find({year: filter})
            return res.render('indexNoAuth.ejs', {movies : filteredMovie, filter : filter });

            // return res.send(filteredMovie);
    } catch (err) {
        console.log(err)
    }
};

const redirectToFilter = async (req,res) => {
    let filter = req.body.search;
    console.log(filter)
    return res.redirect(`/movies/${filter}`)
}

module.exports = {getAllTheMovies, getMovieByFilter, redirectToFilter}


function firstLetterUpperCase(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }