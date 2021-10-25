import { Router } from 'express';

import UserController from '@core/controllers/user/UserController';

import { resJson } from '../../utils';

const router = Router();
const userController = new UserController();

router.get('/get/:id', async (request, response) =>
  resJson(response, await userController.get({ ...request }))
);

export default router;
