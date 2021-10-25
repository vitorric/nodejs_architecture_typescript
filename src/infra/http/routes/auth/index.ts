import { Router } from 'express';
import passport from 'passport';

import UserController from '@core/controllers/user/UserController';

import { resJson } from '../../utils';

const router = Router();
const userController = new UserController();

router.post(
  '/login',
  passport.authenticate('user'),
  async (request, response) =>
    resJson(response, await userController.login({ ...request }))
);

router.post('/confirm/:token', async (request, response) =>
  resJson(response, await userController.confirmFirstAccessDone({ ...request }))
);

export default router;
