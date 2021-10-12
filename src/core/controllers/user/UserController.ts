import { Request, Response } from 'express';

import { UserService } from '@core/services/user/UserService';
import { ResJson } from '@core/utils/index';
import MailtrapMailProvider from '@infra/providers/implementations/MailtrapMailProvider';
import PrismaUsersRepository from '@infra/repositories/prisma/user';

const prismaUsersRepository = new PrismaUsersRepository();
const mailtrapMailProvider = new MailtrapMailProvider();

const userService = new UserService(
  prismaUsersRepository,
  mailtrapMailProvider
);

export default class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const user = await userService.create({ ...request.body });

      return ResJson(response, 201, true, user);
    } catch (err) {
      return ResJson(response, 400, false, err.message || 'Unexpected error.');
    }
  }
}
