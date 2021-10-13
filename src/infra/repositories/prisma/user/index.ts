import User from '@core/entities/User';

import { IUsersRepository } from '../../IUsersRepository';
import { prisma, messagesErrors } from '../client';

export default class PrismaUsersRepository implements IUsersRepository {
  async exists(email: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    return !!user;
  }

  async create(user: User): Promise<void> {
    try {
      await prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: User.Roles[user.role],
        },
      });
    } catch (err) {
      console.log(err.message);
      throw new Error(messagesErrors.bad_params);
    }
  }

  async findById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }
}
