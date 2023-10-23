const moviesRouter = require('express').Router();
const { getSavesMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieValidation, deleteMovieValidation } = require('../middlewares/validation');

moviesRouter.get('/', getSavesMovies);
moviesRouter.post('/', movieValidation, createMovie);
moviesRouter.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = moviesRouter;
