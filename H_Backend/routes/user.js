import express from 'express';
import UserController from '../controllers/userController.js';
 import { emailAndPasswordValidation, validate } from '../utils/Validations.js';

const router = express.Router();

router.post('/register', emailAndPasswordValidation, validate, UserController.register);
export default router;
