import { Router } from 'express';
import { Auth } from '../middlewares/auth';
import * as UserController from '../controllers/UserController';
import * as UrlController from '../controllers/UrlController';

const router = Router();

router.post('/user', UserController.create);
router.post('/user/login', UserController.login);

router.get('/user', Auth, UserController.showProfile);

router.post('/url', Auth, UrlController.create);

router.get('/urls', Auth, UserController.showUrls);

router.delete('/url/:id', Auth, UrlController.deleteUrl);

router.get('/url/:id', UrlController.showUrl);

router.get('/res/:name', UrlController.useUrl);

export default router;
