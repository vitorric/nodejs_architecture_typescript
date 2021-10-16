import {
  ControllerResponse,
  ok,
  created,
  conflict,
} from '@core/controllers/ControllerResponse';
import User from '@core/entities/User';
import { IMailProvider } from '@infra/providers/IMailProvider';
import { IUsersRepository } from '@infra/repositories/IUsersRepository';

import { ICreateUserRequestDTO } from './IUserServiceDTO';

export class UserService {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async create(data: ICreateUserRequestDTO): Promise<ControllerResponse> {
    const userAlreadyExists = await this.usersRepository.exists(data.email);

    if (userAlreadyExists) {
      return conflict(new Error('User already exists.'));
    }

    await this.usersRepository.create(new User(data));

    // await this.mailProvider.sendMail({
    //   to: {
    //     name: data.name,
    //     email: data.email,
    //   },
    //   from: {
    //     name: 'Equipe do Meu App',
    //     email: 'equipe@meuapp.com',
    //   },
    //   subject: 'Seja bem-vindo à plataforma',
    //   body: '<p>Você já pode fazer login em nossa plataforma.</p>'
    // })

    return created();
  }

  async get(id: string): Promise<ControllerResponse> {
    return ok({ id });
  }
}
