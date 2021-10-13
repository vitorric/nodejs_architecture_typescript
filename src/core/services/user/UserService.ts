import User from '@core/entities/User';
import { IMailProvider } from '@infra/providers/IMailProvider';
import { IUsersRepository } from '@infra/repositories/IUsersRepository';

import { ServiceResponse, serviceResponse } from '../ServiceResponse';
import { ICreateUserRequestDTO } from './IUserServiceDTO';

export class UserService {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async create(data: ICreateUserRequestDTO): Promise<ServiceResponse> {
    const userAlreadyExists = await this.usersRepository.exists(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new User(data);

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

    return user;
  }

  async get(id: string): Promise<ServiceResponse> {
    return serviceResponse({ id });
  }
}
