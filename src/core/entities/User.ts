import Base from './Base';
import Company from './Company';

export enum Roles {
  Admin = 'Admin',
}

export default class User extends Base {
  static readonly Roles = Roles;

  public readonly _id: any;

  public name?: string;

  public email?: string;

  public password?: string;

  public role?: string;

  public firstAccessDone?: boolean;

  public status?: boolean;

  public deleted?: boolean;

  public createdAt?: Date;

  public updatedAt?: Date;

  // Relations
  public companyId?: any;

  public Company?: Company;

  constructor(props: Omit<User, '_id'>) {
    super();
    Object.assign(this, props);
  }
}
