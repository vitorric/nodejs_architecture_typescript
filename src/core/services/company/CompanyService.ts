import {
  ControllerResponse,
  ok,
  conflict,
  badRequest,
} from '@core/controllers/ControllerResponse';
import Company from '@core/entities/Company';
import { EmailService } from '@core/services/email/EmailService';
import { CnpjValidation } from '@core/utils';
import { ICompanyRepository } from '@infra/db/ICompanyRepository';

import { ICreateCompanyRequestDTO } from './ICompanyServiceDTO';

export class CompanyService {
  constructor(
    private companyRepository: ICompanyRepository,
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
        return conflict(new Error('Company already exists.'));
      }

      const company: Company = await this.companyRepository.create(
        new Company(data)
      );

      return ok(company);
    } catch (err) {
      console.log(err);
      return badRequest(new Error('Invalid Params.'));
    }
  }
}
