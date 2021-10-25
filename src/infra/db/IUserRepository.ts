import User from '@core/entities/User';

export interface IUserRepository {
  exists(email: string): Promise<boolean>;
  create(user: User): Promise<User>;
  update(userId: string, user: User): Promise<boolean>;
  findOne(params: any): Promise<User>;
  findById(userId: string): Promise<User>;
}
