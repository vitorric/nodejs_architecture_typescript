import User from '@core/entities/User';

export interface IUsersRepository {
  exists(email: string): Promise<boolean>;
  create(user: User): Promise<void>;
  findById(id: string): Promise<User>;
}
