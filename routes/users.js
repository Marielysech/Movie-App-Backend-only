
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authorization = require("../middleware/authorization")


router.get('/', authorization.checkAuthenticated, userController.getAllMoviesUser);

router.get('/onemovie/:movie', authorization.checkAuthenticated, userController.getMoreInfo);
router.get('/rating', authorization.checkAuthenticated, userController.getMoviesByRating);

router.get('/favorites', authorization.checkAuthenticated, userController.getFavorites)

router.post('/favorites/:movie', authorization.checkAuthenticated, userController.addToFavorites)

router.post('/removefavorites/:movie', authorization.checkAuthenticated, userController.removeFromFavorites)

router.post('/search', authorization.checkAuthenticated,  userController.redirectToFilter);
router.get('/:filter', authorization.checkAuthenticated, userController.getMovieByFilter)


module.exports = router;
