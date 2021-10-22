export enum Roles {
  Admin = 'Admin',
}

export default class User {
  static readonly Roles = Roles;

  public readonly _id: any;

  public name: string;

  public email: string;

  public password: string;

  public role: string;

  public createdAt?: Date;

  public updatedAt?: Date;

  constructor(props: Omit<User, '_id'>) {
    Object.assign(this, props);
  }
}
