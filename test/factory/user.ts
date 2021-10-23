import faker from 'faker';

import User from '../../src/core/entities/User';
import UserRepository from '../../src/infra/db/mongodb/implementations/userRepository';

export const UserFactory = async (user?: User): Promise<User> => {
  const userRepository: UserRepository = new UserRepository();

  return (await userRepository.create(
    new User({
      name: user?.name ?? faker.internet.userName(),
      email: user?.email ?? faker.internet.email(),
      password: user?.password ?? faker.internet.password(),
      role: user?.role ?? 'Admin',
      ...user,
    })
  )) as User;
};
