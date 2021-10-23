import BillingRule from '@core/entities/BillingRule';
import { IBillingRuleRepository } from '@infra/db/IBillingRuleRepository';

import schema from '../schemas/billingRuleSchema';
import { ObjectIdCast } from '../utils';

export default class BillingRuleRepository implements IBillingRuleRepository {
  async create(billingRule: BillingRule): Promise<BillingRule> {
    return (await schema.create(billingRule)) as BillingRule;
  }

  async update(billingRuleId: any, billingRule: BillingRule): Promise<boolean> {
    await schema.updateOne(
      {
        _id: ObjectIdCast(billingRuleId),
      },
      {
        $set: {
          ...billingRule,
        },
      }
    );
    return true;
  }

  async findById(billingRuleId: string): Promise<BillingRule> {
    const billingRule = (await schema
      .findOne({ _id: billingRuleId })
      .exec()) as BillingRule;
    return billingRule;
  }
}
