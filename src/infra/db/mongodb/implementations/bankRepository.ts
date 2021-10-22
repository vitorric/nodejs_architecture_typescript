import Bank from '@core/entities/Bank';
import { IBankRepository } from '@infra/db/IBankRepository';

import schema from '../schemas/bankSchema';
import { ObjectIdCast } from '../utils';

export default class BankRepository implements IBankRepository {
  async create(bank: Bank): Promise<Bank> {
    return (await schema.create(bank)) as Bank;
  }

  async update(bankId: string, bank: Bank): Promise<boolean> {
    schema.updateOne(
      {
        _id: ObjectIdCast(bankId),
      },
      {
        $set: {
          ...bank,
        },
      }
    );
    return true;
  }

  async findById(bankId: string): Promise<Bank> {
    const bank = (await schema.findOne({ _id: bankId }).exec()) as Bank;
    return bank;
  }
}
