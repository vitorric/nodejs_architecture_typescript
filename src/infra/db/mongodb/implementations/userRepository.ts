import User from '@core/entities/User';

import { IUserRepository } from '../../IUserRepository';
import schema from '../schemas/userSchema';
import { ObjectIdCast } from '../utils';

export default class UserRepository implements IUserRepository {
  async exists(email: string): Promise<boolean> {
    const user = await schema.findOne({ email }).exec();
    return !!user;
  }

  async create(user: User): Promise<User> {
    return (await schema.create(user)) as User;
  }

  async update(userId: any, user: User): Promise<boolean> {
    await schema.updateOne(
      {
        _id: ObjectIdCast(userId),
      },
      {
        $set: {
          ...user,
        },
      }
    );
    return true;
  }

  async findById(userId: string): Promise<User> {
    const user = (await schema.findOne({ _id: userId }).exec()) as User;
    return user;
  }
}
