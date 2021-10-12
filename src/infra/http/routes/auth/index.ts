import { Router } from 'express';

import UserController from '@core/controllers/user/UserController';

const router = Router();
const userController = new UserController();

router.post('/create', (request, response) =>
  userController.create(request, response)
);

export default router;