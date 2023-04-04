import { Router } from 'express';
import * as UserController from '../controllers/UserController';

const router = Router();

router.get('/user/:name/:email/:password', UserController.create);

export default router;
