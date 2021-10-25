import Bank from './Bank';
import User from './User';

export type AccessKey = {
  publicKey: string;
  isValid: boolean;
};

export default class Company {
  public readonly _id: any;

  public name?: string;

  public cnpj?: string;

  public onboarding?: boolean;

  public salt?: string;

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
    Object.assign(this, props);
  }
}
