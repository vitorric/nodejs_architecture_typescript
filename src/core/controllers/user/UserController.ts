import { UserService } from '@core/services/user/UserService';
import CompanyRepository from '@infra/db/mongodb/implementations/companyRepository';
import UserRepository from '@infra/db/mongodb/implementations/userRepository';
import JWTProvider from '@infra/providers/implementations/JWTProvider';

import { ControllerResponse } from '../ControllerResponse';
import IUserController from './IUserController';

const companyRepository = new CompanyRepository();
const userRepository = new UserRepository();

const jwtProvider = new JWTProvider();

const userService = new UserService(userRepository);

export default class UserController implements IUserController {
  async get(event: any): Promise<ControllerResponse> {
    const { userId } = event.params;
    return userService.get(userId);
  }

  async confirmFirstAccessDone(event: any): Promise<ControllerResponse> {
    const { token } = event.params;
    return userService.confirmFirstAccessDone(
      {
        token,
        ...event.body,
      },
      jwtProvider,
      companyRepository
    );
  }
}
