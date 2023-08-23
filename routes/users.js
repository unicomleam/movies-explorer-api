const usersRouter = require('express').Router();
const { getMe, updateUser } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

usersRouter.get('/me', getMe);
usersRouter.patch('/me', updateUserValidation, updateUser);

module.exports = usersRouter;
