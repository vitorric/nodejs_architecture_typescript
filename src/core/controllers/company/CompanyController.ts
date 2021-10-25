import { CompanyService } from '@core/services/company/CompanyService';
import { EmailService } from '@core/services/email/EmailService';
import { UserService } from '@core/services/user/UserService';
import CompanyRepository from '@infra/db/mongodb/implementations/companyRepository';
import UserRepository from '@infra/db/mongodb/implementations/userRepository';
import JWTProvider from '@infra/providers/implementations/JWTProvider';
import MailtrapMailProvider from '@infra/providers/implementations/MailtrapMailProvider';

import { ControllerResponse } from '../ControllerResponse';
import ICompanyController from './ICompanyController';

const companyRepository = new CompanyRepository();
const userRepository = new UserRepository();

const mailtrapMailProvider = new MailtrapMailProvider();
const jwtProvider = new JWTProvider();

const emailService = new EmailService(mailtrapMailProvider);
const userService = new UserService(userRepository);

const companyService = new CompanyService(companyRepository);

export default class CompanyController implements ICompanyController {
  async create(event: any): Promise<ControllerResponse> {
    return companyService.create(
      { ...event.body },
      jwtProvider,
      userService,
      emailService
    );
  }
}
