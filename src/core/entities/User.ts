import { v4 as uuid } from 'uuid';

export enum Roles {
  Admin = 'Admin',
}

export default class User {
  static readonly Roles = Roles;

  public readonly id: string;

  public name: string;

  public email: string;

  public password: string;

  public role: string;

  public createdAt?: Date;

  public updatedAt?: Date;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
