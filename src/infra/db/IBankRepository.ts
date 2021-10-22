import Bank from '@core/entities/Bank';

export interface IBankRepository {
  create(bank: Bank): Promise<Bank>;
  update(bankId: string, bank: Bank): Promise<boolean>;
  findById(bankId: string): Promise<Bank>;
}
