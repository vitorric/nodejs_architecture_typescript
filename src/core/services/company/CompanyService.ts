import { v4 as uuid } from 'uuid';

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
import { decrypt, encrypt } from '@core/utils/crypto';
import { ICompanyRepository } from '@infra/db/ICompanyRepository';
import { IJWTProvider } from '@infra/providers/IJWTProvider';

import { ICreateCompanyRequestDTO } from './ICompanyServiceDTO';

export class CompanyService {
  constructor(
    private jwt: IJWTProvider,
    private companyRepository: ICompanyRepository,
    private userService: UserService,
    private emailService: EmailService
  ) {}

  async create(data: ICreateCompanyRequestDTO): Promise<ControllerResponse> {
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

      if (await this.userService.userExists(data.userEmail)) {
        return conflict(new Error('Email user already exists.'));
      }

      const company: Company = await this.companyRepository.create(
        new Company({
          ...data,
          salt: encrypt(uuid()),
        })
      );

      const user: User = await this.userService.create({
        companyId: company._id,
        email: data.userEmail,
        role: User.Roles.Admin,
      });

      this.companyRepository.update(company._id, {
        ...company,
        userId: user._id,
      });

      const jwtConfirm = this.jwt.create(
        {
          companyId: company._id,
          userId: user._id,
        },
        10
      );

      this.emailService.sendEmailConfirmCompanyUser({
        to: {
          email: data.userEmail,
          name: company.name,
        },
        confirmLink: `${process.env.URL_PORTAL}/auth/confirm/${jwtConfirm}`,
        tmpPassword: decrypt(user.password),
      });

      return ok(company);
    } catch (err) {
      console.log(err);
      return badRequest(new Error('Invalid Params.'));
    }
  }
}
