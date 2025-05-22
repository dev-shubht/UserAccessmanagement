const express = require('express');
const userRouter = express.Router();
const { signup, login } = require('../controllers/user.controller');

userRouter.post('/signup', signup);
userRouter.post('/login', login);


module.exports = userRouter;
