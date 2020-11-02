import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const authRoutes = Router();

authRoutes.post('/account/signup', AuthController.signup);

export default authRoutes;