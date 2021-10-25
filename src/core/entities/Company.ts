import Bank from './Bank';
import Base from './Base';
import User from './User';

export type AccessKey = {
  publicKey: string;
  isValid: boolean;
};

export default class Company extends Base {
  public readonly _id: any;

  public name?: string;

  public cnpj?: string;

  public onboarding?: boolean;

  public accessKey?: AccessKey;

  public status?: boolean;

  public deleted?: boolean;

  public createdAt?: Date;

  public updatedAt?: Date;

  // Relations
  public userId?: any;

  public User?: User;

  public banksId?: [any];

  public Banks?: [
    {
      bank: Bank;
    }
  ];

  constructor(props: Omit<Company, '_id'>) {
    super();
    Object.assign(this, props);
  }
}
