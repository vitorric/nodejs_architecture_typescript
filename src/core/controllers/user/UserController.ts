import { UserService } from '@core/services/user/UserService';
import MailtrapMailProvider from '@infra/providers/implementations/MailtrapMailProvider';
import PrismaUsersRepository from '@infra/repositories/prisma/user';

import { ControllerResponse } from '../ControllerResponse';
import IUserController from './IUserController';

const prismaUsersRepository = new PrismaUsersRepository();
const mailtrapMailProvider = new MailtrapMailProvider();

const userService = new UserService(
  prismaUsersRepository,
  mailtrapMailProvider
);

export default class UserController implements IUserController {
  async create(event: any): Promise<ControllerResponse> {
    return userService.create({ ...event.body });
  }

  async get(event: any): Promise<ControllerResponse> {
    const { id } = event.params;
    return userService.get(id);
  }
}
