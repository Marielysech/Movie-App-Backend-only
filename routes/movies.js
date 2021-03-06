const router = require('express').Router();
const moviesController = require('../controllers/moviesController')
const authorization = require("../middleware/authorization")



router.get('/', authorization.checkNotAuthenticated, moviesController.getAllTheMovies);
router.get('/:filter', authorization.checkNotAuthenticated, moviesController.getMovieByFilter)


module.exports = router;