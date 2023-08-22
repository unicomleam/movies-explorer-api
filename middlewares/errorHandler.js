const { SERVER_ERROR } = require('../utils/server-err');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR } = err;
  res.status(statusCode).send({ message: statusCode === SERVER_ERROR ? 'Ошибка сервера' : err.message });
  next();
};
