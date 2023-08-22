const { celebrate, Joi } = require('celebrate');

module.exports.signup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

module.exports.movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/https?:\/\/(www\.)?[\w\d-]+\.[\w\d-.~:/?#[\]@!$&'()*+,;=]+#?/),
    trailerLink: Joi.string().required().pattern(/https?:\/\/(www\.)?[\w\d-]+\.[\w\d-.~:/?#[\]@!$&'()*+,;=]+#?/),
    thumbnail: Joi.string().required().pattern(/https?:\/\/(www\.)?[\w\d-]+\.[\w\d-.~:/?#[\]@!$&'()*+,;=]+#?/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});
