import { UserService } from '@core/services/user/UserService';
import UserRepository from '@infra/db/mongodb/implementations/userRepository';

import { ControllerResponse } from '../ControllerResponse';
import IUserController from './IUserController';

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

export default class UserController implements IUserController {
  async get(event: any): Promise<ControllerResponse> {
    const { userId } = event.params;
    return userService.get(userId);
  }
}
