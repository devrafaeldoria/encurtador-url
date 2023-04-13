import { Router } from 'express';
import * as UserController from '../controllers/UserController';

const router = Router();

router.post('/user', UserController.create);
router.post('/user/login', UserController.login);

export default router;
