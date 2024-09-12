import { Router } from 'express';
import { registerUser } from '../controllers/register.controller';
import { authenticateToken } from "../middlewares/authMiddleware";
import { getUserProfile } from '../controllers/profile.controller';
import { loginUser } from '../controllers/login.controller';

const router = Router();


/**
 * @swagger
 * /register:
 *  post:
 *          summary: post user credentials
 * */

router.post('/register', registerUser)

/**
 * @swagger
 * /login:
 *  post:
 *          summary: registra el usuario
 * */

router.post('/login', loginUser)

/**
 * @swagger
 * /profile:
 *  get:
 *          summary: Autentica al usuario
 *
 * */

router.get('/profile', authenticateToken, getUserProfile)

export default router;