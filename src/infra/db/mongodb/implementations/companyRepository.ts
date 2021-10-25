import Company from '@core/entities/Company';

import { ICompanyRepository } from '../../ICompanyRepository';
import schema from '../schemas/companySchema';
import { ObjectIdCast } from '../utils';

export default class CompanyRepository implements ICompanyRepository {
  async exists(cnpj: string): Promise<boolean> {
    const company = await schema.findOne({ cnpj }).exec();
    return !!company;
  }

  async create(company: Company): Promise<Company> {
    return (await schema.create(company)) as Company;
  }

  async update(companyId: any, company: Company): Promise<boolean> {
    await schema.updateOne(
      {
        _id: ObjectIdCast(companyId),
      },
      {
        $set: {
          ...company,
        },
      }
    );
    return true;
  }

  async findOne(params: any): Promise<Company> {
    const company = (await schema.findOne({ ...params }).exec()) as Company;
    return company;
  }

  async findById(companyId: string): Promise<Company> {
    const company = (await schema
      .findOne({ _id: companyId })
      .exec()) as Company;
    return company;
  }
}
