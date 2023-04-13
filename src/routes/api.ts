import { Router } from 'express';
import { Auth } from '../middlewares/auth';
import * as UserController from '../controllers/UserController';

const router = Router();

router.post('/user', UserController.create);
router.post('/user/login', UserController.login);

router.get('/user', Auth, UserController.showProfile);

export default router;
