import { RandomString } from '@core/utils';
import { encrypt } from '@core/utils/crypto';
import { IUserRepository } from '@infra/db/IUserRepository';

import {
  ControllerResponse,
  ok,
  badRequest,
} from '../../controllers/ControllerResponse';
import User from '../../entities/User';
import { ICreateUserRequestDTO } from './IUserServiceDTO';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async create(data: ICreateUserRequestDTO): Promise<User> {
    return (await this.userRepository.create(
      new User({
        ...data,
        password: encrypt(RandomString(8)),
      })
    )) as User;
  }

  async userExists(email: string): Promise<boolean> {
    return !!(await this.userRepository.exists(email));
  }

  async get(userId: string): Promise<ControllerResponse> {
    try {
      const user = await this.userRepository.findById(userId);
      return ok(user);
    } catch (err) {
      console.log(err);
      return badRequest(new Error('Invalid Params.'));
    }
  }
}
