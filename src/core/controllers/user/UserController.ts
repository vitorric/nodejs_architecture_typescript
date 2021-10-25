import { EmailService } from '@core/services/email/EmailService';
import { UserService } from '@core/services/user/UserService';
import CompanyRepository from '@infra/db/mongodb/implementations/companyRepository';
import UserRepository from '@infra/db/mongodb/implementations/userRepository';
import JWTProvider from '@infra/providers/implementations/JWTProvider';
import MailtrapMailProvider from '@infra/providers/implementations/MailtrapMailProvider';

import { ControllerResponse } from '../ControllerResponse';
import IUserController from './IUserController';

const mailtrapMailProvider = new MailtrapMailProvider();

const companyRepository = new CompanyRepository();
const userRepository = new UserRepository();

const jwtProvider = new JWTProvider();

const userService = new UserService(userRepository);
const emailService = new EmailService(mailtrapMailProvider);

export default class UserController implements IUserController {
  async login(event: any): Promise<ControllerResponse> {
    const { user } = event;
    return userService.login(
      { ...user },
      jwtProvider,
      companyRepository,
      emailService
    );
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
