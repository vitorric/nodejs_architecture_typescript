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
      return ResJson(
        response,
        201,
        true,
        await userService.create({ ...request.body })
      );
    } catch (err) {
      return ResJson(response, 400, false, err.message || 'Unexpected error.');
    }
  }

  async get(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      return ResJson(response, 200, true, await userService.get(id));
    } catch (err) {
      return ResJson(response, 400, false, err.message || 'Unexpected error.');
    }
  }
}
