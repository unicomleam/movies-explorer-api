const Movie = require('../models/movie');
const { OK_STATUS, CREATED_STATUS } = require('../utils/server-err');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getSavesMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((createdMovie) => {
      Movie.findById(createdMovie._id)
        .populate('owner')
        .then((movie) => res.status(CREATED_STATUS).send(movie));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы невалидные данные'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) throw new NotFoundError('Переданы некорректные данные при удалении фильма');
      else if (movie.owner.toString() !== req.user._id) throw new ForbiddenError('Ошибка, вы не можете удалять фильмы других пользователей.');
      else {
        Movie.deleteOne(movie)
          .then(() => res.status(OK_STATUS).send(movie))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Фильм c указанным id не найден'));
      }
      return next(err);
    });
};
