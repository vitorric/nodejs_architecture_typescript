import faker from 'faker';
import { v4 as uuid } from 'uuid';

import Company from '../../src/core/entities/Company';
import { encrypt } from '../../src/core/utils/crypto';
import CompanyRepository from '../../src/infra/db/mongodb/implementations/companyRepository';

export const CompanyFactory = async (company?: Company): Promise<Company> => {
  const companyRepository: CompanyRepository = new CompanyRepository();

  return (await companyRepository.create(
    new Company({
      cnpj: company?.cnpj ?? '67.294.620/0001-51',
      name: company?.name ?? faker.company.companyName(),
      salt: encrypt(company?.salt ?? uuid()),
      ...company,
    })
  )) as Company;
};
