import { Router } from 'express';
import { register} from '../controllers/register.controller';
import { validateSchema } from '../middlewares/validate';
import { login } from "../controllers/login.controller";
import { verifyToken } from "../controllers/verify.controller";
import { logout } from "../controllers/logout.controller";

import { registerSchema, loginSchema } from "../schemas/auth.schema";

const router = Router();


/**
 * @swagger
 * /register:
 *  post:
 *          summary: Register user credentials
 * */


router.post('/register', validateSchema(registerSchema),register);

/**
 * @swagger
 * /login:
 *  post:
 *          summary: Login user credentials
 * */

router.post('/login', validateSchema(loginSchema),login);

/**
 * @swagger
 * /verify:
 *  get:
 *          summary: Verify user credentials
 *
 * */

router.get('/verify', verifyToken);

/**
 * @swagger
 * /logout:
 *  post:
 *          summary: Logout user credentials
 */

router.post('/logout', verifyToken, logout);

export default router;