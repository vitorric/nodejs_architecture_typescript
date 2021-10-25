import {
  ControllerResponse,
  ok,
  conflict,
  badRequest,
} from '@core/controllers/ControllerResponse';
import Company from '@core/entities/Company';
import User from '@core/entities/User';
import { EmailService } from '@core/services/email/EmailService';
import { UserService } from '@core/services/user/UserService';
import { CnpjValidation } from '@core/utils';
import { ICompanyRepository } from '@infra/db/ICompanyRepository';
import { IJWTProvider } from '@infra/providers/IJWTProvider';

import { ICreateCompanyRequestDTO } from './ICompanyServiceDTO';

export class CompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  async create(
    data: ICreateCompanyRequestDTO,
    jwt: IJWTProvider,
    userService: UserService,
    emailService: EmailService
  ): Promise<ControllerResponse> {
    try {
      if (!CnpjValidation(data.cnpj)) {
        return badRequest(new Error('Invalid Params.'));
      }

      const companyAlreadyExists = await this.companyRepository.exists(
        data.cnpj
      );

      if (companyAlreadyExists) {
        return conflict(new Error('CNPJ company already exists.'));
      }

      if (await userService.userExists(data.userEmail)) {
        return conflict(new Error('Email user already exists.'));
      }

      const company: Company = await this.companyRepository.create(
        new Company(data)
      );

      const user: User = await userService.create({
        companyId: company._id,
        email: data.userEmail,
        role: User.Roles.Admin,
      });

      this.companyRepository.update(company._id, {
        ...company,
        userId: user._id,
      });

      userService.sendEmailConfirmFirstAccessDone(
        user,
        jwt,
        this.companyRepository,
        emailService
      );

      return ok(company);
    } catch (err) {
      console.log(err);
      return badRequest(new Error('Invalid Params.'));
    }
  }
}
