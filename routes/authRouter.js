import express from 'express';
import { login, register } from '../controllers/AuthController.js';
import { validateUserRegistration, validateUserLogin } from '../middleware/validationMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', validateUserRegistration, register);
authRouter.post('/login', validateUserLogin, login)

export default authRouter
