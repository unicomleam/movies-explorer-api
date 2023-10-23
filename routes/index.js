const router = require('express').Router();

const auth = require('../middlewares/auth');
const { signup, signin } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', signin, login);
router.post('/signup', signup, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

module.exports = router;
