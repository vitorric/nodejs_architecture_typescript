import User from '@core/entities/User';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  create(user: User): Promise<void>;
}
