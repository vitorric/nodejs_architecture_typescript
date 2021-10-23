export enum EnumBankFunctions {
  Pix = 'Pix',
  BankSlip = 'BankSlip',
}

export type BankFunctions = {
  name: EnumBankFunctions;
  urlDoc: string;
  urlAsync: string;
  urlSync: string;
};

export default class Bank {
  public readonly _id: any;

  public name?: string;

  public bankFunctions?: [BankFunctions];

  public status?: boolean;

  public deleted?: boolean;

  public createdAt?: Date;

  public updatedAt?: Date;

  constructor(props: Omit<Bank, '_id'>) {
    Object.assign(this, props);
  }
}
