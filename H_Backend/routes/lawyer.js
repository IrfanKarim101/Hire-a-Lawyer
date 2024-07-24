import express from 'express'
import lawyerController from '../controllers/lawyerControllers.js';

import { emailAndPasswordValidation , validate } from '../utils/Validations.js';

const router = express.Router();

router.get('/search', lawyerController.searchLawyersByAddress)
router.get('/dashboard', lawyerController.getAllLawyers)
router.post ('/register', emailAndPasswordValidation , validate , lawyerController.registerLawyer);
router.post('./update/:id', lawyerController.updateDoc)
export default router;