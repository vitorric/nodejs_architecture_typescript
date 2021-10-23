import { EnumBankFunctions } from './Bank';
import Company from './Company';

export default class BillingRule {
  public readonly _id: any;

  public name?: string;

  public sendEmail?: boolean;

  public applyTo?: EnumBankFunctions;

  public status?: boolean;

  public deleted?: boolean;

  public createdAt?: Date;

  public updatedAt?: Date;

  // Relations
  public companyId: any;

  public Company: Company;

  constructor(props: Omit<BillingRule, '_id'>) {
    Object.assign(this, props);
  }
}
