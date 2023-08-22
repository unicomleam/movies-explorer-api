const router = require('express').Router();
const { getSavesMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieValidation, deleteMovieValidation } = require('../middlewares/validation');

router.get('/', getSavesMovies);
router.post('/', movieValidation, createMovie);
router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
