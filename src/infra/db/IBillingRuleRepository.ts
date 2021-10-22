import BillingRule from '@core/entities/BillingRule';

export interface IBillingRuleRepository {
  create(billingRule: BillingRule): Promise<BillingRule>;
  update(billingRuleId: string, billingRule: BillingRule): Promise<boolean>;
  findById(billingRuleId: string): Promise<BillingRule>;
}
