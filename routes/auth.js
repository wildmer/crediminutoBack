import { Router } from 'express';
import { authController } from '../controllers/auth.js';
import { authJwt, verifySignup } from '../middlewares/index.js';

const authRouter = Router();

authRouter.post(
    '/signup',
    [
        verifySignup.checkDuplicateEmail,
        authJwt.checkRolesExistence,
    ],
    authController.signUp
);

authRouter.post('/signin', authController.signIn);

export default authRouter;