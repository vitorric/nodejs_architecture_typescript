import User from '@core/entities/User';

import { IUsersRepository } from '../../IUsersRepository';
import { prisma } from '../client';

export default class PrismaUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User> {
    const user = new User({
      email,
      name: '',
      password: '',
      role: User.Roles.Admin,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return user;
  }

  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        ...user,
      },
    });
  }
}
