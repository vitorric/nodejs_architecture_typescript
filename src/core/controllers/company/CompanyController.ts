import { CompanyService } from '@core/services/company/CompanyService';
import { EmailService } from '@core/services/email/EmailService';
import CompanyRepository from '@infra/db/mongodb/implementations/companyRepository';
import MailtrapMailProvider from '@infra/providers/implementations/MailtrapMailProvider';

import { ControllerResponse } from '../ControllerResponse';
import IUserController from './ICompanyController';

const companyRepository = new CompanyRepository();

const mailtrapMailProvider = new MailtrapMailProvider();

const emailService = new EmailService(mailtrapMailProvider);

const companyService = new CompanyService(companyRepository, emailService);

export default class UserController implements IUserController {
  async create(event: any): Promise<ControllerResponse> {
    return companyService.create({ ...event.body });
  }
}
