import User from '../src/core/entities/User';
import CompanyRepository from '../src/infra/db/mongodb/implementations/companyRepository';
import { CompanyFactory } from '../test/factory/company';
import { UserFactory } from '../test/factory/user';

export const CompanySeed = async (): Promise<void> => {
  const companyRepository: CompanyRepository = new CompanyRepository();

  let promises = [];

  for (let i = 0; i < 50; i += 1) {
    promises.push(Promise.resolve(CompanyFactory()));
  }

  const companies = await Promise.all(promises);

  promises = [];

  console.log('...companies done');

  for (let i = 0; i < companies.length; i += 1) {
    promises.push(
      Promise.resolve(
        UserFactory(
          new User({
            companyId: companies[i]._id,
          })
        )
      )
    );
  }

  const users = await Promise.all(promises);

  promises = [];

  console.log('...users done');

  for (let i = 0; i < users.length; i += 1) {
    const currentCompany = companies.find(
      (x) => x._id.toString() === users[i].companyId.toString()
    );

    currentCompany.userId = users[i]._id;

    promises.push(
      Promise.resolve(
        companyRepository.update(currentCompany._id, currentCompany)
      )
    );
  }

  await Promise.all(promises);

  console.log('...seed company done');
};
