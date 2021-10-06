import { Router } from "express";
import { UserController  } from "../../controllers/user/UserController";

const router = Router()
const userController = new UserController();

router.post('/create', (request, response) => {
   return userController.create(request, response);
});

export default router;