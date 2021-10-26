import faker from 'faker';

import Company from '../../src/core/entities/Company';
import { GeneratePublicKey } from '../../src/core/utils';
import { encrypt } from '../../src/core/utils/crypto';
import CompanyRepository from '../../src/infra/db/mongodb/implementations/companyRepository';

export const CompanyFactory = async (company?: Company): Promise<Company> => {
  const companyRepository: CompanyRepository = new CompanyRepository();

  return (await companyRepository.create(
    new Company({
      cnpj: company?.cnpj ?? '67.294.620/0001-51',
      name: company?.name ?? faker.company.companyName(),
      accessKey: {
        isValid: true,
        publicKey: encrypt(GeneratePublicKey()),
      },
      ...company,
    })
  )) as Company;
};
