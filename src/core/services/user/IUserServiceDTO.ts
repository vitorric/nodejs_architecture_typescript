import { Roles } from '@core/entities/User';

export type ICreateUserRequestDTO = {
  email: string;
  role: Roles;
  companyId: any;
};
