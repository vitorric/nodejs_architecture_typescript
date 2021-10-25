import Company from '@core/entities/Company';

export interface ICompanyRepository {
  exists(cnpj: string): Promise<boolean>;
  create(company: Company): Promise<Company>;
  update(companyId: string, company: Company): Promise<boolean>;
  findOne(params: any): Promise<Company>;
  findById(companyId: string): Promise<Company>;
}
